const express = require('express');
const router = express.Router();
const department = require('../app/controllers/DepartmentController');

router.post('/store', department.createDepartment);
router.get('/', department.getDepartment);

module.exports = router