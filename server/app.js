const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');

const app = express();
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var data = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.get("/", function(req, res) {
    res.send({status: "ok"});
});

app.get("/api/TodoItems", function(req, res) {
    res.send(data);
});

app.get("/api/TodoItems/:number", function(req, res) {
    res.send(data[req.params.number - 1]);
});

app.post('/api/TodoItems', function(req, res) {
    res.status(201);
    for(var i = 0; i < data.length; i ++) {
        if(data[i].todoItemId == req.body.todoItemId) {
            data[i] = req.body;
            res.send(req.body);
        };
    };
    data.push(req.body);
    res.send(req.body);
});

app.delete("/api/TodoItems/:number", function(req, res) {
    for(var i = 0; i < data.length; i++) {
        if(data[i].todoItemId == req.params.number) {
            res.send(data[req.params.number]);
            data.splice(i, 1);
        };
    };
});

module.exports = app;
