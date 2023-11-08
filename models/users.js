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
		isActive: {
			type: Boolean,
			default: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamp: true }
);

module.exports = mongoose.model("users", Users);
