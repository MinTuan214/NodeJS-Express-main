const express = require('express');
const router = express.Router();
const department = require('../app/controllers/DepartmentController');

router.post('/store', department.createDepartment);
router.get('/get-department', department.getDepartment);
router.get('/', department.index);

module.exports = router