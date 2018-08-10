var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restful_task_api');
app.use(bodyParser.json());

var taskSchema = mongoose.Schema({
    title: String,
    description: {type: String, default: ''},
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var Task = mongoose.model('Task', taskSchema);

app.get('/', function(req, res) {
    Task.find({}, function(err, tasks) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success', data: tasks});
        }
    });
});

app.get('/:id', function(req, res) {
    Task.find({_id: req.params.id}, function(err, task) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success', data: task});
        }
    });
});

app.get('/:title/:description/:completed', function(req, res) {
    Task.create({title: req.params.title, description: req.params.description, completed: req.params.completed}, function(err, task) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success', data: task});
        }
    });
});

app.get('/update/:id/:title/:description/:completed', function(req, res) {
    Task.findByIdAndUpdate(req.params.id, {title: req.params.title, description: req.params.description, completed: req.params.completed}, function(err, task) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success', data: task});
        }
    });
});

app.get('/remove/:id', function(req, res) {
    Task.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.json({message: 'Error', error: err});
        } else {
            res.json({message: 'Success'});
        }
    });
});

app.listen(8000, function() {
    console.log('Server listening on port 8000...');
});