const express = require('express');
const router = express.Router();
const { sendContactMail } = require('../controllers/contact.controller');

router.post('/contact', sendContactMail);

module.exports = router;
