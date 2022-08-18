const { Task } = require('../model');
class TasksController{
    static async getAllTasks(req,res) {
        res.status(200).send({
            tasks: await Task.find().exec()
        });
    }
}   
module.exports = TasksController;