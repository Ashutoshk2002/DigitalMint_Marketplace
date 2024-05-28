const express = require("express");
const { signin, signup } = require("../controller/user.controller");
const router = express.Router();

router.post("/signup", signup);

router.post("/singnin", signin);

module.exports = router;
