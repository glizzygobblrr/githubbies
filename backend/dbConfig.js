require('dotenv').config();

module.exports = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB.SERVER,
  database: process.env.DB_DATABASE,
  port: 1433, 
  connectionTimeout: 60000, 
  options: {
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};
