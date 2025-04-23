const Todo = require('../models/todoModel');

// GET - works on postman :)
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST - works on postman :)
exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(201).json({ message: 'Todo created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT - works on postman :)
exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(201).json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE - works on postman :)
exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(201).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
