const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const dbConfig = require('./dbConfig');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.post('/login', authController.loginUser);

// signup user 

app.post('/signup',authController.registerUser);

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
