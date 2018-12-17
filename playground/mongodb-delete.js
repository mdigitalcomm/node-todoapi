// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const dbName = 'myproject';
const client = new MongoClient(url);


client.connect((err) => {
  if (err) {
    return console.log('Failed to connect.', err);
  }

  console.log('Connected successfully!');

  const db = client.db(dbName);

  // deleteMany
  // db.collection('Project').deleteMany({name: 'Project B'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Project').deleteOne({name: 'Project C'}).then((result) => {
  //   console.log(result);
  // });
  // findOneAndDelete
  db.collection('Project').findOneAndDelete({name: 'Project C'}).then(result => {
    console.log(result);
  });
});
