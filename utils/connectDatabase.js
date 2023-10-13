const mongoose = require("mongoose");

mongoose
	.connect(process.env.URI)
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log(err);
	});
