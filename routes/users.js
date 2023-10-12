var express = require("express");
const { register, login } = require("../controllers/users");
var router = express.Router();
const { check } = require("express-validator");
const requestChecker = require("../utils/requestChecker");

router.get("/", function (req, res, next) {
	res.send("respond from Home");
});

router.post(
	"/register",
	[
		check("email").notEmpty().withMessage("Please provide email"),
		check("password").notEmpty().withMessage("Please provide password"),
	],
	requestChecker,
	register
);

router.post(
	"/login",
	[
		check("email").notEmpty().withMessage("Please provide email"),
		check("password").notEmpty().withMessage("Please provide password"),
	],
	requestChecker,
	login
);

module.exports = router;
