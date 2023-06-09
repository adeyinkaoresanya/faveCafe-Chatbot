const express = require("express");

const path = require("path");
const app = express();
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT= process.env.PORT
const botName = process.env.botName

const db = require("./back_end/db/db");

const storedSession = require("./back_end/middleware/storedSession");

const {
	saveSessionID,
	loadMessage,
	welcomeMessage,
	MainMenu,
	menuoftheDay,
	checkOutOrder,
	orderHistory,
	currentOrder,
	cancelOrder,
	saveOrder, }  = require("./back_end/controller/orderController");


const formatChat = require("./back_end/utils/formatChat");
const chatModel = require("./back_end/models/chatModel");

db.connectToMongoDB();

app.use(storedSession);
io.engine.use(storedSession);

app.use(express.static(path.join(__dirname, "front_end")));


server.listen(PORT, ()=>{
    console.log(`Server is listening at port ${PORT}`)
})


const levels = {};

io.on("connection", async (socket) => {
	
	const session = socket.request.session;
	
	const sessionId = session.id; 
	saveSessionID(sessionId);
	
	socket.join(sessionId);
	
	welcomeMessage(io, sessionId);
	loadMessage(io, sessionId);

	
	levels[sessionId] = 0;
	socket.on("private message", async (msg) => {
		let userMessage = formatChat("You", msg);
		const number = parseInt(msg);
		io.to(sessionId).emit("user message", userMessage);
		let botMessage = "";

		switch (levels[sessionId]) {
			case 0:
				botMessage = await MainMenu(io, sessionId);
				levels[sessionId] = 1;
				break;
			case 1:
				if (number === 1) {
					botMessage = await menuoftheDay(io, sessionId);
					levels[sessionId] = 2;
					return;
				} else if (number === 99) {
					botMessage = await checkOutOrder(io, sessionId);
					levels[sessionId] = 1;
				} else if (number === 98) {
					botMessage = await orderHistory(io, sessionId);
					levels[sessionId] = 1;
				} else if (number === 97) {
					botMessage = await currentOrder(io, sessionId);
				} else if (number === 0) {
					botMessage = await cancelOrder(io, sessionId);
				} else {
					botMessage = await formatChat(
						botName,
						"You entered the wrong code. Select either 1, 99, 98, 97 or 0"
					);
					io.to(sessionId).emit("bot message", botMessage);
				}
                
				levels[sessionId] = 1;
				break;
			case 2:
				if (
					number !== 1 &&
					number !== 2 &&
					number !== 3 &&
					number !== 4 &&
					number !== 5 &&
					number !== 6 &&
					number !== 7 &&
					number !== 8 &&
					number !== 9 &&
					number !== 10
				) {
					botMessage = await formatChat(
						botName,
						"You entered the wrong code. Kindly select a number between 1 and 10"
					);
					io.to(sessionId).emit("bot message", botMessage);
					levels[sessionId] = 2;
					return;
				} else {
					botMessage = await saveOrder(io, sessionId, number);
					levels[sessionId] = 1;
				}
				break;
		}
		const saveMessage = await new chatModel({
			sessionID: sessionId,
			userMessage,
			botMessage,
		});
		await saveMessage.save();
	});
});






