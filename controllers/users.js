const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const findUserByEmail = await Users.findOne({ email, isActive: true });

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

		const passHash = await bcrypt.hash(password, parseInt(process.env.SALT));
		const createUser = await Users.create({
			email,
			name,
			password: passHash,
		});
		if (createUser) {
			const createJwtToken = jwt.sign(
				{ _id: createUser._id },
				process.env.SECRET,
				{ expiresIn: "2d", algorithm: "HS512" }
			);
			return res.status(200).json({
				success: true,
				message: "User register successfully",
				token: createJwtToken,
			});
		}
		console.log("check");
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	} catch (error) {
		console.log("🚀 ~ file: users.js:49 ~ exports.register= ~ error:", error);
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
			return res
				.status(400)
				.json({ success: false, message: "Please provide valid email" });
		}

		const findUserByEmail = await Users.findOne({ email, isActive: true });

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
			const createJwtToken = jwt.sign(
				{ _id: findUserByEmail._id },
				process.env.SECRET,
				{ expiresIn: "2d", algorithm: "HS512" }
			);
			return res.status(200).json({
				success: true,
				message: "User login successfully",
				token: createJwtToken,
			});
		}

		return res
			.status(400)
			.json({ success: false, message: "Password is incorrect" });
	} catch (error) {
		console.log("🚀 ~ file: users.js:95 ~ exports.login= ~ error:", error);
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	}
};
