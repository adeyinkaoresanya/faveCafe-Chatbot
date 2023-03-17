const createArray = (msg, list) => {
	let arrayMsg = "";

	if (msg == "mainMenu") {
		arrayMsg = list
			.map((item) => {
				return `${item.number}. ${item.text}`;
			})
			.join(`<br>`);
		arrayMsg = `Select any of the options to continue: <br>` + arrayMsg;
		return arrayMsg;
	}

	arrayMsg = list
		.map((item, index) => {
			return `${index + 1}. ${item.food} - $${item.price} `;
		})
		.join(`<br>`);

	arrayMsg = `${msg}: <br>` + arrayMsg;
	return arrayMsg;
};

module.exports = createArray;