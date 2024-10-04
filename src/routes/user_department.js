const express = require('express');
const router = express.Router();
const Userdepartment = require('../app/controllers/User_departmentController');

router.get('/', Userdepartment.getUserDepartment);

module.exports = router