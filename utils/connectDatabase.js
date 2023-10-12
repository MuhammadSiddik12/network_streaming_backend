const mongoose = require("mongoose");

mongoose
	.connect(
		"mongodb+srv://MuhammadSiddik:Siddik1234@cluster0.ylizv0y.mongodb.net/stream_screen"
	)
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => {
		console.log(err);
	});
