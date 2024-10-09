const express = require('express');
const router = express.Router();
const department = require('../app/controllers/DepartmentController');

router.post('/add', department.createDepartment);
router.get('/list', department.getDepartment);
router.get('/', department.index);

module.exports = router