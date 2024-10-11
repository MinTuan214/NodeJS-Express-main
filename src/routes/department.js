const express = require('express');
const router = express.Router();
const department = require('../app/controllers/DepartmentController');

router.post('/departments', department.createDepartment);
router.get('/departments', department.getDepartment);
router.get('/departments/:id', department.getOneDepartment);
router.put('/departments/:id', department.updateDepartment);
router.delete('/departments/:id', department.deleteDepartment);

router.get('/', department.index);

module.exports = router