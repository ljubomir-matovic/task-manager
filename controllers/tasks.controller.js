const { Task } = require('../model');
const HttpStatus = require('../utils/httpStatusCodes');
const Logger = require('../utils/logger');
class TasksController{
    static logger = new Logger(TasksController.name);
    static async getAllTasks(req,res) {
        res.status(HttpStatus.OK).send({
            tasks: await Task.find().exec()
        });
    }
    static async getTask(req, res) {
        let id = req.params.id;
        try {
            let task = await Task.findById({ _id: id }).exec();
            if (task == null)
                return res.status(HttpStatus.NOT_FOUND).send('Not found');
            res.status(HttpStatus.OK).send({
                task
            });
        }
        catch (e) {
            res.status(HttpStatus.NOT_FOUND).send('Not found');
        }
    }
    static async createTask(req, res) {
        let { name } = req.body;
        if (!name)
            return res.status(HttpStatus.BAD_REQUEST).send('Bad request');
        Task.create({ name });
        res.status(HttpStatus.CREATED).send();
    }

    static async updateTask(req, res) {
        let id = req.params.id;
        let { name, completed } = req.body;
        if (!name || completed===undefined || completed===null)
            return res.status(HttpStatus.BAD_REQUEST).send('Bad request');
        try {
            await Task.updateOne({ _id: id }, { name, completed }).exec();
            res.status(HttpStatus.OK).send({
                task: await Task.findById(id).exec()
            });
        }
        catch (err) {
            res.status(HttpStatus.NOT_FOUND).send('Not found');
        }
    }
    static async deleteTask(req, res) {
        let id = req.params.id;
        try {
            let task=await Task.findOneAndDelete({ _id: id }).exec();
            if (!task)
                return res.status(HttpStatus.NOT_FOUND).send(`No task with id ${task._id}`)
            res.status(HttpStatus.NO_CONTENT).send();
        }
        catch (err) {
            res.status(HttpStatus.NOT_FOUND).send('Not found');
        }
    }
}   
module.exports = TasksController;