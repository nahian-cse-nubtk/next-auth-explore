const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_DB_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


export const Connect=(collection)=>{
    return client.db(process.env.DB_NAME).collection(collection)
}
export const usersCollection = Connect("users")