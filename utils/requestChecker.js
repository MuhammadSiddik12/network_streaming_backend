const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ ...errors });
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong" });
	}
};
