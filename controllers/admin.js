const admin = require("../models/admin");

exports.registerAdmin = (req, res) => {
	try {
		const { email, password, name } = req.body;
		const findAdminExist = admin.findOne({ email });

		if (findAdminExist) {
			return res
				.status(400)
				.json({ success: false, message: "Email already exist" });
		}

		const createAdmin = admin.create({
			name,
			email: email.trim(),
			password,
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
