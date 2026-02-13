const logger = require("../utils/logger");

const Task = require("../models/task.model");

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id,
    });

    logger.info(`Task created by user: ${req.user.id}`);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};




exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    logger.info(`Task updated by user: ${req.user.id}`);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    next(error);
  }
};




exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, 
    });

    logger.info(`Task deleted by user: ${req.user.id}`);

    if (!task)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};




