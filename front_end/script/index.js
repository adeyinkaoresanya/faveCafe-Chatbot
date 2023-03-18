const socket = io();
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-body");

socket.on("bot message", (message) => {
	
	console.log(message.text.length);
	console.log(Array.isArray(message.text));

	
	if (Array.isArray(message.text)) {
		let msg = message.text
			.map((item) => `${item.number}. ${item.text}`)
			.join(`<br>`);
		msg = "Select any of the options to continue: <br>" + msg;
		message.text = msg;
	} else {
		message.text = message.text;
	}
	outputMessage("faveCafe", message);

	
	chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on("user message", (message) => {
	
	outputMessage("You", message);

	
	chatMessages.scrollTop = chatMessages.scrollHeight;
});


chatForm.addEventListener("submit", (e) => {
	e.preventDefault();

	
	let msg = e.target.elements.msg.value;

	msg = msg.trim();

	if (!msg) {
		return false;
	}

	
	socket.emit("private message", msg);

	
	e.target.elements.msg.value = "";
	e.target.elements.msg.focus();
});


const outputMessage = (sender, message) => {
	const div = document.createElement("div");
	div.classList.add("chat-messages");
	if (sender === "faveCafe") {
		div.classList.add("bot");
	} else {
		div.classList.add("user");
	}

	div.innerHTML = `
  <p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">${message.text}</p>`;
	document.querySelector(".chat-body").appendChild(div);
};