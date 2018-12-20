var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

// var newUser = new User({
//   email: 'slkfj    wa'
// })
//
// newUser.save().then(doc => {
//   console.log('Saved user', doc);
// }, e => {
//   console.log('Unable to save user.', e)
// });

module.exports = {User};
