const express = require('express');

const router = express.Router();
const TasksController = require('../controllers/tasks.controller');

router.route('/')
    .get(TasksController.getAllTasks);

module.exports = router;
