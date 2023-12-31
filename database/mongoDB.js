
const dotenv = require('dotenv');
dotenv.config();

const mongodb = require('mongodb');


async function getdb(){
    
    const client = await mongodb.MongoClient(process.env.mongodbURL);
    const db = await client.db(process.env.dbname);
    if (!db) throw new Error("Couldn't connect to database")
    
    return db

}



dp = {
  
}


module.exports=dp