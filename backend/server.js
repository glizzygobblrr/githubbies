const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const fileController = require('./controllers/fileController');
const dbConfig = require('./dbConfig');
const awsConfig = require('./awsConfig');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); //handle the file-size limit

//accounts
app.post('/login', authController.loginUser);
app.get('/retrieveRole/:accID',authController.retrieveRole)
app.post('/signup',authController.registerUser);

//s3
app.post('/upload', fileController.uploadFile);
app.delete('/delete', fileController.deleteFile);
app.get('/list-files', fileController.listFiles);
app.get('/file-url/:key', fileController.getFileUrl);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1);
    }

    console.log(`Server listening on port ${PORT}`);
});

process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    await sql.close();
    console.log("Database connection closed");
    process.exit(0);
});

