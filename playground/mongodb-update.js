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

  db.collection('Project').findOneAndUpdate({_id: new ObjectID("5c1454cc74d4e31c77005333")
    }, {
      $set: {
        name: 'Updated name - Mey'
      },
      $inc: {
        number: 1
      }
    }, {
      returnOriginal: false
    }).then(result => {
      console.log(result);
    });
});
