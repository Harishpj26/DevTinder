const mongoose =  require("mongoose");

const connectDb = async() => {
    await mongoose.connect(
        "mongodb+srv://kickstart:YNFSBxBExdnWCKsQ@sampleculster.ekneqoh.mongodb.net/SampleDatabase"
    );
};
module.exports={
    connectDb
};