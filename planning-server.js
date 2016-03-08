var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/plan');
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('planning app on port 3000');
});

var planSchema =  new mongoose.Schema ({
  task: { type: String,  default: '' }
});

var Plan = mongoose.model('Plan', planSchema);

  app.get('/plans', function (req, res) {
    Plan.find(function (err, plans) {
      if (err) res.send(err);
      else res.json(plans);
    });
  });

  app.post('/plan', function (req, res) {
    var newPlan = new Plan({task: req.body.task})

    newPlan.save(function (err) {
      if (err)res.send(err);
      res.status(200).end();
    });

  });

  app.delete('/plan/:id', function (req, res) {
    Plan.remove({
      _id: req.params.id
    }, function (err, plan) {
      if (err)
        res.send(err);
        res.status(200).end();
    });
  });

