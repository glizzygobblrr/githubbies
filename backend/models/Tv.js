const sql = require("mssql")
class Tv {   
 constructor(tvID,tvLocation,tvSize,tvGroupID,status) {
  this.tvID = tvID
  this.tvLocation = tvLocation = 50
  this.tvSize = tvSize,
  this.tvGroupID = tvGroupID,
  this.status = status
 }

 // Add a new tv 

 static async addTv(tv){
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `INSERT INTO tv (tvLocation, tvSize, tvGroupID, status) VALUES (@tvLocation,@tvSize,@tvGroupID,@status)`    
    const request = connection.request();
    request.input('tvLocation', sql.VarChar(), tv.tvLocation);
    request.input('tvSize', sql.TinyInt, tv.tvSize);
    request.input('tvGroupID', sql.VarChar(), tv.tvGroupID);
    request.input('status', sql.VarChar(), tv.status);
    const result = await request.query(sqlQuery);
    if(result.rowsAffected[0] > 0){
        const row = result.recordset[0];
        return (
            new Tv(
                row.tvID,
                row.tvLocation,
                row.tvSize,
                row.tvGroupID,
                row.status
            )
         )
    }
 }

 // delete a tv
 static async deleteTv(tvID){
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `DELETE FROM tv WHERE tvID = ${tvID}`
    const request = connection.request();
    const result = await request.query(sqlQuery);
    if(result.rowsAffected[0] > 0){
        const row = result.recordset[0];
        return (
            new Tv(
                row.tvID,
                row.tvLocation,
                row.tvSize,
                row.tvGroupID,
                row.status
            )
         )
    }

 }

 // Retrieve all the tv's in the same tvGroup location 
 static async filterTvByLocation(){
    const connection = await sql.connect(dbConfig);
    const sqlQuery = `SELECT tv.*, tvgrpcat.categoryValue FROM Tv tv 
                      INNER JOIN TvGroup tvgrp ON tv.tvGroupID = tvgrp.tvGroupID
                      INNER JOIN TvGroupCategory tvgrpcat ON tvgrp.tvGroupID = tvgrpcat.tvGroupID
                      WHERE tvgrpcat.categoryType = 'Location'`
    
    const request = connection.request();

    // Extract the location of each tv in the tvGroup 
    const result = await request.query(sqlQuery);
    if (result.recordset.length > 0) {
        let location 
        if (result.recordset[0].categoryValue != null) {
            location = result.recordset[0].categoryValue
        } else {
            location = null;
        }

        const tvs = result.recordset.map((row) => {
            new Tv(
                row.tvID,
                row.tvLocation,
                row.tvSize,
                row.tvGroupID,
                row.status
            )
        })

        return{
            tvGroupLocation: location,
            tvs: tvs
        }

    }
    else {
        return null;
    }
    
 }
}