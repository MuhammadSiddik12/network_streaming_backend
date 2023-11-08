var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin");
const { check } = require("express-validator");
const requestChecker = require("../utils/requestChecker");

router.get("/", function (req, res) {
	res.send("Response From Admin");
});

router.post(
	"/registerAdmin",
	[
		check("email").notEmpty().withMessage("Please provide email"),
		check("password").notEmpty().withMessage("Please provide password"),
	],
	requestChecker,
	adminController.registerAdmin
);

router.post(
	"/adminLogin",
	[
		check("email").notEmpty().withMessage("Please provide email"),
		check("password").notEmpty().withMessage("Please provide password"),
	],
	requestChecker,
	adminController.adminLogin
);

module.exports = router;
