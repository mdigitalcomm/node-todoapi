const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const user = [{
  _id: userOneId,
  email: 'user1@example.com',
  password: 'useronepass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'user2@example.com',
  password: 'usertwopass'
}];

const todo = [{
  _id: new ObjectID(),
  text: "todo 1"
}, {
  _id: new ObjectID(),
  text: "todo 2",
  completed: true,
  completedAt: 123
}];

const populateTodo = (done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todo);
  }).then(() => done());
};

const populateUser = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(user[0]);
    var userTwo = new User(user[1]);
    return User.insertMany([userOne, userTwo]);
  }).then(() => done());
};


module.exports = {todo, populateTodo, user, populateUser};
