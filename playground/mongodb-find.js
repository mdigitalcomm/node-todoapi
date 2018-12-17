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

  db.collection('Project').find().count().then((count) => {
    console.log(`Projects count: ${count}`);
  }, err => {
    console.log('Unable to fetch Project', err);
  })
});

//   db.collection('Project').insertOne({
//     name: "Project",
//     date: new Date()
//   }, (err, result) => {
//     if (err) {
//       return console.log('Failed to insert Project.', err);
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
//   });
//
//   client.close();
// });

// MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
//   if (err) {
//     return console.log('Unable to connect to MongoDB server');
//   }
//   console.log('Connected to MongoDB server.');
//   const db = client.db('TodoApp');
//
//   // db.collection('Todos').insertOne({
//   //   text: 'Todo something',
//   //   completed: true
//   // }, (err, result) => {
//   //   if (err) {
//   //     return console.log('Unable to insert Todo.', err);
//   //   }
//   //
//   //   console.log(JSON.stringify(result.ops, undefined, 2));
//   // })
//
//   db.collection('Baby').insertOne({
//     name: 'Mey Faizulla',
//     age: 1,
//     location: 'Charlotte'
//   }, (err, result) => {
//     if (err) {
//       return console.log('Unable to insert Users.', err);
//     }
//
//     console.log(JSON.stringify(result.ops, undefined, 2));
//   });
//
//   client.close();
// });
