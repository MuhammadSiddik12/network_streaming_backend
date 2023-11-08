const jwt = require("jsonwebtoken");
const admin = require("../models/admin");
const bcrypt = require("bcrypt");

exports.registerAdmin = async (req, res) => {
	try {
		const { email, password, name } = req.body;
		const findAdminExist = await admin.findOne({ email });

		if (findAdminExist) {
			return res
				.status(400)
				.json({ success: false, message: "Email already exist" });
		}

		const createPass = await bcrypt.hash(password.trim(), 12);

		const createAdmin = await admin.create({
			name,
			email: email.trim(),
			password: createPass,
		});

		if (createAdmin) {
			return res
				.status(200)
				.json({ success: true, message: "Admin created successfully" });
		}

		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	}
};

exports.adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const findAdminExist = await admin.findOne({ email });

		if (findAdminExist == null) {
			return res
				.status(400)
				.json({ success: false, message: "Email not found" });
		}

		const checkPass = await bcrypt.compare(
			password.trim(),
			findAdminExist.password
		);

		if (checkPass) {
			const createJwt = jwt.sign(
				{ adminId: findAdminExist._id },
				process.env.ADMIN_SECRET
			);
			return res.status(200).json({
				success: true,
				message: "Admin login successfully",
				token: createJwt,
			});
		}

		return res
			.status(500)
			.json({ success: false, message: "Password is incorrect" });
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	}
};
