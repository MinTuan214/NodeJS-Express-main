const express = require('express');
const router = express.Router();
const department = require('../../app/controllers/DepartmentController');

router.post('/', department.createDepartment);
router.get('/:id', department.getOneDepartment);
router.put('/:id', department.updateDepartment);
router.delete('/:id', department.deleteDepartment);
router.get('/', department.getDepartment);

module.exports = router