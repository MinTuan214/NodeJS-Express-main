const express = require('express');
const router = express.Router();
const department = require('../../app/controllers/DepartmentController');

router.get('/', department.index);

module.exports = router