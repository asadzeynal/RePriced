const express = require('express');
const auth = require('../middleware/auth');
const tempUser = require('../controllers/tempUser');

const router = express.Router();

router.get('/tempUsers/me', auth, tempUser.getTempUser);

module.exports = router;
