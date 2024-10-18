const mongoose = require('mongoose');

async function dbConnect(path) {
    await mongoose.connect(path);
    console.log("MongoDB connected.");
};

module.exports=dbConnect();