const mainMenu = [
	{ number: 1, text: "Place an Order" },
	{ number: 99, text: "Checkout Order" },
	{ number: 98, text: "Check Order History" },
	{ number: 97, text: "Check Current Order" },
	{ number: 0, text: "Cancel Order" },
];

const foodMenu = [
	{ number: 1, food: "Espresso", price: 2.75  },
	{ number: 2, food: "Latte", price: 4.00 },
	{ number: 3, food: "Cappucino", price: 4.36 },
	{ number: 4, food: "Bagel", price: 2.00 },
	{ number: 5, food: "Croissant", price: 2.00 },
    
];

module.exports = {
	mainMenu,
	foodMenu,
};