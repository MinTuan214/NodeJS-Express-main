const express = require('express');
const router = express.Router();
const auth = require('../../app/controllers/UserInforController');

router.get('/user-info', auth.getUserInfo);
router.get('/user-id', auth.getIduser);

module.exports = router;
