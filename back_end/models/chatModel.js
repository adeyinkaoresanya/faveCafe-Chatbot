const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema(
	{
		sessionID: {
			type: String,
			
		},

		userChat: {
			username: String,
			text: String,
			time: String,
		},

		botChat: {
			username: String,
			text: String,
			time: String,
		},

    },

	    { timestamps: true }
    );

module.exports = mongoose.model("chats", chatSchema); 
