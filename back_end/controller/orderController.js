const OrderModel = require("../models/orderModel");
const messageModel = require("../models/chatModel");
const formatChat = require("../utils/formatChat");
const { mainMenu, foodMenu } = require("../utils/menu");
const createArray = require("../utils/createArray");
require("dotenv").config();
const botName = process.env.botName

const saveSessionID = async (sessionID) => {
	const checksessionID = await OrderModel.findOne({ sessionID });

	if (!checksessionID) {
		await OrderModel.create({ sessionID });
	}
};

const loadMessage = async (io, sessionID) => {
	const oldMessages = await messageModel.find({ sessionID });

	if(!oldMessages) return;

	oldMessages.forEach((message) => {
		io.to(message.sessionID).emit("user message", message.userMessage);
		io.to(message.sessionID).emit("bot message", message.botMessage);
	});
}

const welcomeMessage = (io, sessionID) => {
	io.to(sessionID).emit(
		"bot message",
		formatChat(botName, "Welcome to faveCafe's! We have a variety of steaming options for you. <br> Enter START to continue.")
	);
};

const MainMenu = (io, sessionID) => {
	let botMessage = formatChat(botName, createArray("mainMenu", mainMenu));
	io.to(sessionID).emit("bot message", botMessage);
	return botMessage;
};

const menuoftheDay = (io, sessionID) => {
	let botMessage = formatChat(
		botName,
		createArray("Here is our menu for today. Enter any of the options to add to your cart", foodMenu)
	);
	io.to(sessionID).emit("bot message", botMessage);
	return botMessage;
};

const checkOutOrder = async (io, sessionID) => {
	const sessionOrder = await OrderModel.findOne({ sessionID });

	let botMessage = "";
	if (sessionOrder.currentOrder.length < 1) {
		botMessage = formatChat(
			botName,
			"No order to place"
		);
		io.to(sessionID).emit("bot message", botMessage);
	} else {
		sessionOrder.placedOrder = [
			...sessionOrder.currentOrder,
			...sessionOrder.placedOrder,
		];
		sessionOrder.currentOrder = [];
		await sessionOrder.save();

		botMessage = formatChat(botName, "Order placed");

		io.to(sessionID).emit("bot message", botMessage);
	}
	io.to(sessionID).emit("bot message", formatChat(botName, mainMenu));

	return botMessage;
};

const orderHistory = async (io, sessionID) => {
	const sessionOrder = await OrderModel.findOne({ sessionID });

	let botMessage = "";

	if (sessionOrder.placedOrder.length < 1) {
		botMessage = formatChat(
			botName,
			"You do not have any order history yet"
		);
		io.to(sessionID).emit("bot message", botMessage);
	} else {
		botMessage = formatChat(
			botName,
			createArray("Here's your order history", sessionOrder.placedOrder)
		);
		io.to(sessionID).emit("bot message", botMessage);
	}
	io.to(sessionID).emit("bot message", formatChat(botName, mainMenu));

	return botMessage;
};

const currentOrder = async (io, sessionID) => {
	const sessionOrder = await OrderModel.findOne({ sessionID });

	let botMessage = "";

	if (sessionOrder.currentOrder.length < 1) {
		botMessage = formatChat(botName, "You do not have any order yet");
		io.to(sessionID).emit("bot message", botMessage);
	} else {
		botMessage = formatChat(
			botName,
			createArray("Your current order", sessionOrder.currentOrder)
		);
		io.to(sessionID).emit("bot message", botMessage);
	}

	io.to(sessionID).emit("bot message", formatChat(botName, mainMenu));

	return botMessage;
};

const cancelOrder = async (io, sessionID) => {
	const sessionOrder = await OrderModel.findOne({ sessionID });

	let botMessage = "";

	if (sessionOrder.currentOrder.length < 1) {
		botMessage = formatChat(botName, "You do not have any order yet");

		io.to(sessionID).emit("bot message", botMessage);
	} else {
		botMessage = formatChat(botName, "Order Cancelled");

		sessionOrder.currentOrder = [];
		await sessionOrder.save();

		io.to(sessionID).emit("bot message", botMessage);
	}
	//TODO: save the resposne to the database
	io.to(sessionID).emit("bot message", formatChat(botName, mainMenu));

	return botMessage;
};

const saveOrder = async (io, sessionID, number) => {
	const sessionOrder = await OrderModel.findOne({ sessionID });

	let botMessage = "";

	if(!sessionOrder) return botMessage = formatChat(botName, "You have not started a session yet");

	if (number === 1) {
		sessionOrder.currentOrder.push(foodMenu[0]);
	}
	if (number === 2) {
		sessionOrder.currentOrder.push(foodMenu[1]);
	}
	if (number === 3) {
		sessionOrder.currentOrder.push(foodMenu[2]);

	}
	if (number === 4) {
		sessionOrder.currentOrder.push(foodMenu[3]);

	}
	if (number === 5) {
		sessionOrder.currentOrder.push(foodMenu[4]);
	}

	await sessionOrder.save();

	botMessage = formatChat(
		botName,
		createArray("Order added", sessionOrder.currentOrder)
	);
	io.to(sessionID).emit("bot message", botMessage);

	io.to(sessionID).emit("bot message", formatChat(botName, mainMenu));

	return botMessage;
};



module.exports = {
    saveSessionID,
    loadMessage,
    welcomeMessage,
    MainMenu,
    menuoftheDay,
    checkOutOrder,
    orderHistory,
    currentOrder,
    cancelOrder,
    saveOrder
}