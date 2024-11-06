const sql = require("mssql")
const dbConfig = require("../dbConfig")
class TvGroup{
    constructor(tvGroupID,groupName,operatorID,adminID,category,tvID){
        this.tvGroupID = tvGroupID;
        this.groupName = groupName;
        this.operatorID = operatorID;
        this.adminID = adminID;
        this.category = category;
        this.tvID = tvID;
    }

    // The methods for implementing TvGroup

    // create tvGroup via tv

    static async createTvGroup(tvGroupID, groupName, operatorID, adminID, category, tvID){
        const connection = await sql.connect();
        const sqlQuery = 'INSERT INTO TvGroup (tvGroupID, groupName, operatorID, category, tvID) VALUES (@tvGroupID, @groupName,@operatorID,@tvID)';
        const request = connection.request();
        request.input('tvGroupID', sql.VarChar(), tvGroupID);
        request.input('groupName', sql.VarChar(), groupName);
        request.input('operatorID',sql.VarChar(), operatorID)
        request.input('tvID', sql.VarChar(),tvID)
        const result = await request.query(sqlQuery);
        // return the newly created tvGroup
        if (result.recordset.length > 0) {
            return new TvGroup(result.recordset[0].tvGroupID, result.recordset[0].groupName, result.recordset[0].operatorID, result.recordset[0].adminID, result.recordset[0].category, result.recordset[0].tvID);
        }
        else{
            return null;
        }
    }

    static async deleteTvGroup(tvGroupID){
        const connection = await sql.connect();
        const sqlQuery = `DELETE FROM TvGroup WHERE tvGroupID = '${tvGroupID}'`;
        const request = connection.request();
        const result = await request.query(sqlQuery);
        // return the number of rows affected
        return result.rowsAffected[0];
    }

    // Fetch targeted categories (referenceType)
    static async fetchCategories(id){
        const connection = await sql.connect(dbConfig);
        // Do a subquery to retrieve the categories 
        const sqlQuery = `
        SELECT categoryType FROM tvGroupCategory 
        WHERE tvGroupID = 
        (SELECT tvGroupID FROM tvGroup);`

        const request = connection.request();
        const result = await request.query(sqlQuery);
        if (result.recordset.length > 0) {
            return result.recordset[0].categoryType;
        }
        else{
            return null;
        }
    }



}

module.exports = TvGroup;

