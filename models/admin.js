const mongoose = require("mongoose");

const Admin = mongoose.Schema(
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

	},
	{ timestamp: true }
);

module.exports = mongoose.model("admin", Admin);
