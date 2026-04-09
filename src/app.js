const {MongoClient} = require("mongodb");
const url = "mongodb+srv://kickstart:YNFSBxBExdnWCKsQ@sampleculster.ekneqoh.mongodb.net/";
const client = new MongoClient(url);
const dbName = "SampleDatabase";

async function main() {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('user');
    const data = {
        firstname:"Harish",
        lastname:"KS",
        phonenumber:"937843492348",
        age:"21"
    }
    const insertResult = await collection.insertMany([data]);
    console.log('Inserted documents =>', insertResult);
    const updateResult = await collection.updateOne({ firstname: "Harish" }, { $set: { phonenumber: "737222CB115" } }); 
    console.log('Updated documents =>', updateResult);
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    return "done";
}
main()
    .then(console.log )
    .catch(console.err)
    .finally(()=>client.close());






    