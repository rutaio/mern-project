const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: 'todos',
  }
);

module.exports = mongoose.model('Todo', todosSchema);
