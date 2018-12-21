const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res) => {
//   console.log(res);
// });

// Todo.findOneAndRemove()
Todo.findByIdAndRemove('5c1c59ceb2a4c7b3f59268c8').then((todo) => {
  console.log(todo);
});
