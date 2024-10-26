const sql = require('mssql'); 
const dbConfig = require('../dbConfig'); 

const findByEmail = async (email) => {
    try {
        const request = new sql.Request();
        request.input('email', sql.VarChar, email); 
        const result = await request.query('SELECT * FROM accounts WHERE email = @email');
        return result.recordset[0];
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};

module.exports = { findByEmail }; // Ensure you're exporting as an object
