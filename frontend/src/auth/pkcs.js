// pkce.js: Client-side code for handling PKCE OAuth flow

export function generateCodeVerifier() {
    const array = new Uint8Array(128);
    window.crypto.getRandomValues(array);
    return arrayToBase64UrlEncode(array);
}

function arrayToBase64UrlEncode(array) {
    return btoa(String.fromCharCode.apply(null, array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(digest));
    return arrayToBase64UrlEncode(hashArray);
}

// Store code_verifier in sessionStorage (or secure location)
export function storeCodeVerifier(codeVerifier) {
    sessionStorage.setItem("code_verifier", codeVerifier);
}

// Retrieve code_verifier from storage for token exchange
export function getCodeVerifier() {
    return sessionStorage.getItem("code_verifier");
}