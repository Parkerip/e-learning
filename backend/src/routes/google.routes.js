const router = require("express").Router();
const { googleLogin } = require("../controllers/google.controller");

router.post("/google", googleLogin);

module.exports = router;
