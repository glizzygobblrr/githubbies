const sql = require('mssql'); 
const dbConfig = require('../dbConfig'); 

class Account{
    constructor(accID,name,contactNo,password,email) {
        this.accID = accID;
        this.name = name;
        this.contactNO = contactNo;
        this.password = password;
        this.email = email;
    }

    // MEthods for  creating user and retrieving user

    static async getAccountByEmail(email){
        const connection = await sql.connect();
        const sqlQuery = `SELECT * FROM Account WHERE email = @email`
        const request = connection.request();
        request.input("email",email);
        const result = await request.query(sqlQuery);
        if (result.recordset.length > 0){
            // Return the user , a user 
            return result.recordset[0].map(
                (row) => new Account
                    (
                        row.accID,
                        row.name,
                        row.contactNo,
                        row.password,
                        row.email,
                    )
            )
        }
        
        else {
            return null;
        }
    }

    static async registerAccount (accID,name,email,contactNo,password,email){
        const connection = await sql.connect();
        const sqlQuery = `INSERT INTO Account VALUES (@accID,@name,@email,@contactNo,@password,@email)`;
        const request = connection.request();
        request.input(accID,name,email,contactNo,password,email);
        const result = await request.query(sqlQuery);
        return result.rowsAffected;
    }s
    
}

module.exports = { getAccountEmail, registerAccount }; // Ensure you're exporting as an object
