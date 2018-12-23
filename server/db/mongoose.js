var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
  console.log('Connected to Database');
}).catch(err => {
  console.log("Not connected to Database", err);
});

module.exports = { mongoose };

process.env.NODE_ENV === 'production'
