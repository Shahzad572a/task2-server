const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text, user: req.user.id });
  await todo.save();
  res.json(todo);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { text, completed },
    { new: true }
  );

  if (!todo) return res.status(404).json({ msg: 'Todo not found' });
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
  if (!todo) return res.status(404).json({ msg: 'Todo not found' });
  res.json({ msg: 'Todo deleted' });
};
