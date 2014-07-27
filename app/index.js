'use strict';

var express = require('express');
var morgan = require('morgan');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/checkers', function(req, res){
  res.render('checkers.ejs');
});

app.get('/add/:x/:y/:w/:z', function(req, res){
  req.params.x *= 1;
  req.params.y *=1;
  req.params.w *=1;
  req.params.z *=1;
  console.log(req.params, req.query);
  req.params.fontsize = req.query.fontsize; 
  req.params.borderwidth = req.query.borderwidth;
  req.params.bordercolor = req.query.bordercolor;

  res.render('sum', req.params);
});

app.get('/sumlist/:list', function(req, res){
  req.params.list = req.params.list.split(',');
  req.params.list = req.params.list.map(function(x){
    return x*1;
  });
  var sum = 0;
  for(var i = 0; i <req.params.list.length; i++){
    sum += req.params.list[i];
  }
    req.params.sum = sum;
    req.params.odd = req.query.odd;
    req.params.even= req.query.even;
    
    res.render('sumlist', req.params);

});

app.get('/rolldice/:rolls', function(req, res){
  var roll = [];
  var sum = 0;
  for(var i = 0; i <req.params.rolls; i++){
    var result = Math.floor(Math.random() * 6) + 1;
    sum += result;
    roll.push(result);
      }

  req.params.rolls = roll;
  req.params.sum = sum;


  res.render('rolldice', req.params);
});

var port= process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT', port);
});
