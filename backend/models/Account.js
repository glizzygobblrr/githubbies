const sql = require('mssql'); 
const dbConfig = require('../dbConfig'); 

class Account{
    constructor(accID,name,contactNo,password,email) {
        this.accID = accID;
        this.name = name;
        this.contactNo = contactNo;
        this.password = password;
        this.email = email;
    }

    // MEthods for  creating user and retrieving user

    static async getAccountByEmail(email){
        console.log('Fetching account for email:', email); 
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Account WHERE email = @email`
        const request = connection.request();
        request.input("email",email.trim());
        const result = await request.query(sqlQuery);
        console.log('Query result:', result);
        if (result.recordset.length > 0){
            // Return the user , a user 
            const row = result.recordset[0];
            return new Account(
                row.accID,
                row.name,
                row.contactNo,
                row.password,
                row.email
            );
        }
        
        else {
            return null;
        }
    }

    static async registerAccount (account){
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `INSERT INTO Account VALUES (@accID,@name,@contactNo,@password,@email)`;
        const request = connection.request();
        request.input("accID",account.accID);
        request.input("name",account.name);
        request.input("contactNo",account.contactNo);
        request.input("password",sql.VarChar,account.password);
        request.input("email",sql.VarChar,account.email);
        const result = await request.query(sqlQuery);
        return result.rowsAffected;
    }

    // Extract the role from the Account to store in JWT payload
    static async retrieveRoleFromAccID(accID){
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT roleType FROM Role WHERE Role.accID = @accID`
        const request = connection.request();
        request.input("accID",sql.VarChar,accID);
        const result = await request.query(sqlQuery);
        console.log(result);
        if (result.recordset.length > 0){
            const roleType = result.recordset[0].roleType;
            return roleType;
        }
        else{
            return null;
        }
    } 
}

module.exports =  Account; // you're exporting as an object
