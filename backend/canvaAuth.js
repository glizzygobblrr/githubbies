const crypto = require('crypto');
const axios = require('axios');

// Generate the code_verifier for OAuth
const generateCodeVerifier = () => {
    const codeVerifier = crypto.randomBytes(96).toString('base64url');  // Base64URL encoding
    return codeVerifier;
};

// Generate the code_challenge from code_verifier
const generateCodeChallenge = (codeVerifier) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(codeVerifier).digest('base64'); // SHA-256 hash
    const codeChallenge = hash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); // Base64URL encoding
    return codeChallenge;
};

// OAuth - Initiate the Canva Auth process
const initiateAuth = (req, res, next) => {
    const CLIENT_ID = process.env.CANVA_CLIENT_ID;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const SCOPE = 'asset:read asset:write brandtemplate:content:read brandtemplate:meta:read design:content:write design:content:read design:meta:read profile:read';

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    // Set the cookie for code_verifier
    res.cookie('code_verifier', codeVerifier, { httpOnly: true });

    const authorizationUrl = `https://www.canva.com/api/oauth/authorize?code_challenge=${codeChallenge}&code_challenge_method=s256&scope=${encodeURIComponent(SCOPE)}&response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

    res.redirect(authorizationUrl); // Redirect the user to Canva's OAuth authorization page
};


const callback = async (req, res) => {
    const authorizationCode = req.query.code;
    const codeVerifier =  req.cookies.code_verifier;

    console.log("Authorization Code:", authorizationCode);
    console.log("Code Verifier from Session:", codeVerifier);

    if (!authorizationCode || !codeVerifier) {
        return res.status(400).send('Authorization code or code verifier is missing.');
    }

    const tokenUrl = "https://api.canva.com/rest/v1/oauth/token";
    const CLIENT_ID = process.env.CANVA_CLIENT_ID;
    const CLIENT_SECRET = process.env.CANVA_CLIENT_SECRET;

    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    try {
        const response = await axios.post(tokenUrl, new URLSearchParams({
            grant_type: 'authorization_code',
            code_verifier: codeVerifier,
            code: authorizationCode,
            redirect_uri: process.env.REDIRECT_URI,
        }).toString(), {
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });

        const data = response.data;
        console.log('Access Token Response:', data);

        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        req.session.accessToken = accessToken;
        req.session.refreshToken = refreshToken;

        res.json({ access_token: accessToken, refresh_token: refreshToken });
    } catch (err) {
        console.error('Error exchanging code for token:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { initiateAuth, callback };
