const express = require('express');
const router = express.Router();
const Userdepartment = require('../app/controllers/UserDepartmentController');

router.get('/list', Userdepartment.getUserDepartment);

module.exports = router