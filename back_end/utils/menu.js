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
	{ number: 6, food: "Cup Cake", price: 2.50 },
    { number: 7, food: "Doughnut", price: 1.25 },
	{ number: 8, food: "Chicken Pie", price: 3.50 },
	{ number: 9, food: "Hot Dog", price: 3.00 },
	{ number: 10, food: "Hamburger", price: 6.00 },
    
];

module.exports = {
	mainMenu,
	foodMenu,
};