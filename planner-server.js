var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/planner');
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('planner app on port 3000');
});


var plannerSchema =  new mongoose.Schema ({
    task: { type: String,  default: '' }
});

var Plan = mongoose.model('Plan', plannerSchema);

app.get('/plans', function (req, res) {
    Plan.find(function (err, todos) {
        if (err) res.send(err);
        else res.json(todos);
    });
});

app.post('/plan', function (req, res) {
    var newPlan = new Plan({task: req.body.task})

    newPlan.save(function (err) {
        if (err)res.send(err);
        res.status(200).end();
    });

});

app.delete('/todo/:id', function (req, res) {
    Plan.remove({
        _id: req.params.id
    }, function (err, todo) {
        if (err)
            res.send(err);
        res.status(200).end();
    });
});

