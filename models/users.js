const mongoose = require("mongoose");

const Users = mongoose.Schema(
	{
		name: {
			type: String,
			default: "",
		},
		email: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
	},
	{ timestamp: true }
);

module.exports = mongoose.model("users", Users);
