var mongoose = require('mongoose');

 var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
}, 'todo');

// var newTodo = new Todo({
//   text: true
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, e => {
//   console.log('Unable to save todo.', e)
// });

module.exports = {Todo};
