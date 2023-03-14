require("dotenv").config();

const session = require("express-session");



const sessionMaxAge = process.env.SESSION_MAX_AGE

const storedSession = session({
	secret: process.env.SESSION_SECRET,
	resave: false, 
	saveUninitialized: true,
	cookie: { secure: false, sessionMaxAge },
});

module.exports = storedSession;