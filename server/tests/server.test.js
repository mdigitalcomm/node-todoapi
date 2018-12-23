const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todo = [{
  _id: new ObjectID(),
  text: "todo 1"
}, {
  _id: new ObjectID(),
  text: "todo 2",
  completed: true,
  completedAt: 123
}];

beforeEach(done => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todo);
  }).then(() => done());
});

describe('POST /todo', () => {
  it('should create a new todo', (done) => {
    var text = 'test todo';

    request(app)
      .post('/todo')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todo) => {
          expect(todo.length).toBe(1);
          expect(todo[0].text).toBe(text);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todo')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      })
      Todo.find().then((todo) => {
        expect(todo.length).toBe(2);
        done();
      }).catch(e => done(e));
  });
});

describe('GET /todo', () => {
  it('should get all todo', (done) => {
    request(app)
      .get('/todo')
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todo/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todo/${todo[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todo[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID();
    request(app)
      .get(`/todo/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid Ids', (done) => {
    request(app)
      .get(`/todo/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todo/:id', () => {
  var id = todo[0]._id.toHexString();
  it('should delete todo doc', (done) => {
    request(app)
      .delete(`/todo/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todo[0].text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(id)
          .then(todo => {
            expect(todo).toBeFalsy();
            done();
          }).catch(e => done(e));

      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID();
    request(app)
      .delete(`/todo/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid Ids', (done) => {
    request(app)
      .delete('/todo/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todo/:id', () => {
  it('should update the todo', (done) => {
    var id = todo[0]._id.toHexString();
    var test = {
      completed: true,
      text: "test text"
    };
    request(app)
      .patch(`/todo/${id}`)
      .send(test)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(test.text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      }).end(done);

  });

  it('should clear completedAt when todo is not completed', (done) => {
    var id = todo[1]._id.toHexString();
    var test = {
      completed: false,
      text: "test 2"
    };
    request(app)
      .patch(`/todo/${id}`)
      .send(test)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(test.text);
        expect(res.body.todo.completed).toBeFalsy();
      }).end(done);
  });
});
