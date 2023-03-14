const mongoose = require("mongoose");
require("dotenv").config()

const MONGO_URL= process.env.MONGO_URL

function connectMongo() {
	// mongoose.set("strictQuery", false);
	mongoose.connect(MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			
		})

    mongoose.connection.on('connected', () => {
            console.log('Connected to MongoDB successfully');
        });
    
     mongoose.connection.on('error', (err) => {
            console.log('Error connecting to MongoDB', err);
        })
    }
    
    
    module.exports = { connectToMongoDB };
		