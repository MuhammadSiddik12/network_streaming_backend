const Users = require("../models/users");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const findUserByEmail = await Users.findOne({ email });

		if (findUserByEmail) {
			return res
				.status(409)
				.json({ success: false, message: "User already exist" });
		}

		const pattern = new RegExp(
			"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
		);

		if (!pattern.test(email)) {
			return res
				.status(400)
				.json({ success: false, message: "Please provide valid email" });
		}

		const passHash = await bcrypt.hash(password, 12);
		const createUser = await Users.create({
			email,
			name,
			password: passHash,
		});
		if (createUser) {
			return res
				.status(200)
				.json({ success: true, message: "User register successfully" });
		}

		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	} catch (error) {
		console.log("🚀 ~ file: users.js:46 ~ exports.register= ~ error:", error);
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const pattern = new RegExp(
			"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
		);

		if (!pattern.test(email)) {
			return res
				.status(400)
				.json({ success: false, message: "Please provide valid email" });
		}

		const findUserByEmail = await Users.findOne({ email });

		if (!findUserByEmail) {
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		}

		const passCompare = await bcrypt.compare(
			password,
			findUserByEmail.password
		);

		if (passCompare) {
			return res
				.status(200)
				.json({ success: true, message: "User login successfully" });
		}

		return res
			.status(400)
			.json({ success: false, message: "Password is incorrect" });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	}
};
