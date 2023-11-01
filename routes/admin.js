var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
	res.send("Response From Admin");
});

module.exports = router;
