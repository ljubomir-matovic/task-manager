const express = require('express');

const router = express.Router();
const TasksController = require('../controllers/tasks.controller');

router.route('/')
    .get(TasksController.getAllTasks)
    .post(TasksController.createTask);

router.route('/:id')
    .get(TasksController.getTask)
    .patch(TasksController.updateTask)
    .delete(TasksController.deleteTask);

module.exports = router;
