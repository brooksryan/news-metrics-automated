// Requirements
var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var handlebars      = require('handlebars');

// request-promise
var rp              = require('request-promise');

// MONGO HOOKUP // 
var mongoose        = require ('mongoose');
var mongo           = require('mongodb');

// nodemailer require and set up
var nodemailer = require('nodemailer');
var mailerFunctions = require('./services/sendEmail.js')

//var requestService  = require('/services/insightsRequests.js') 

// Mongoose Instantiation
mongoose.connect('mongodb://localhost/nodetest1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('made it to the db!')
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//Testing nodemailer
mailerFunctions.sendNewMail();

//testing insights stuff and stuff

//array of queries
var queryArray = [
    {  
      name: 'Yesterdays Opens',
      url:  'https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20uniquecount%28recipient_email%29%20as%20%27Opens%20out%20of%201965%20total%20recipients%27%20FROM%20Transaction%20since%201%20days%20ago%20COMPARE%20WITH%201%20week%20ago%20WHERE%20name%20%3D%20%27Controller%2Ftracking%2Fimage%27%20WHERE%20recipient_company%20%21%3D%27elementum%27%20%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20AND%20recipient_company%20%21%3D%20%27pub_elect%27'
    }
    ,{
      name: 'This Weeks Opens',
      url:  'https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20uniquecount%28recipient_email%29%20as%20%27Unique%20Opens%20out%20of%201965%20total%20recipients%27%20FROM%20Transaction%20since%201%20week%20ago%20COMPARE%20WITH%201%20week%20ago%20WHERE%20name%20%3D%20%27Controller%2Ftracking%2Fimage%27%20WHERE%20recipient_company%20%21%3D%27elementum%27%20%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20AND%20recipient_company%20%21%3D%20%27pub_elect%27'
    },
    {
      name: 'Yesterdays Active Users',
      url:  'https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20uniquecount%28recipient_email%29%20as%20Users%2C%20count%28recipient_email%29%20as%20Clicks%2C%20count%28recipient_email%29%2FuniqueCount%28recipient_email%29%20as%20%27Clicks%20per%20User%27%2C%20uniqueCount%28recipient_email%29%2F19%2e65%20as%20%27%25%20of%20Recipients%20Clicking%27%20FROM%20Transaction%20since%201%20day%20ago%20WHERE%20name%20%3D%20%27Controller%2Frd%2Finc_then_redirect%27%20WHERE%20recipient_company%20%21%3D%27elementum%27%20%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20AND%20recipient_company%20%21%3D%20%27pub_elect%27'
    },
    {
      name: 'Past Weeks Active Users',
      url:  'https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20uniquecount%28recipient_email%29%20as%20Users%2C%20count%28recipient_email%29%20as%20Clicks%2C%20count%28recipient_email%29%2FuniqueCount%28recipient_email%29%20as%20%27Clicks%20per%20User%27%2C%20uniqueCount%28recipient_email%29%2F19%2e65%20as%20%27%25%20of%20Recipients%20Clicking%27%20FROM%20Transaction%20since%201%20week%20ago%20WHERE%20name%20%3D%20%27Controller%2Frd%2Finc_then_redirect%27%20WHERE%20recipient_company%20%21%3D%27elementum%27%20%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20AND%20recipient_company%20%21%3D%20%27pub_elect%27'
    },
    {
      name: 'Past Weeks Active Users',
      url:  'https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20uniquecount%28recipient_email%29%20as%20Users%2C%20count%28recipient_email%29%20as%20Clicks%2C%20count%28recipient_email%29%2FuniqueCount%28recipient_email%29%20as%20%27Clicks%20per%20User%27%2C%20uniqueCount%28recipient_email%29%2F19%2e65%20as%20%27%25%20of%20Recipients%20Clicking%27%20FROM%20Transaction%20since%201%20week%20ago%20WHERE%20name%20%3D%20%27Controller%2Frd%2Finc_then_redirect%27%20WHERE%20recipient_company%20%21%3D%27elementum%27%20%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20AND%20recipient_company%20%21%3D%20%27pub_elect%27'
    },
    {
      name: 'Month To Date Company Stats',
      url:  'https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20uniquecount%28recipient_email%29%20as%20User%2C%20count%28recipient_email%29%20as%20Clicks%2C%20count%28recipient_email%29%2FuniqueCount%28recipient_email%29%20as%20%27Clicks%20per%20User%27%20FROM%20Transaction%20since%201%20month%20ago%20WHERE%20name%20%3D%20%27Controller%2Frd%2Finc_then_redirect%27%20WHERE%20recipient_company%20%21%3D%27elementum%27%20%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20where%20recipient_company%20%21%3D%20%27brookstestco%27%20facet%20recipient_company%20limit%201000'
    },
    {
      name: 'Yesterdays Most Active Users',
      url:  'https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20%28uniquecount%28article_title%29%29%20as%20Clicks%20from%20Transaction%20facet%20recipient_email%20since%201%20day%20ago%20WHERE%20name%20LIKE%20%27Controller%2Frd%2Finc_then_redirect%27%20limit%2015%20where%20recipient_company%20%21%3D%20%27elementum%27%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20and%20recipient_company%20%21%3D%20%27brookstestco%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20AND%20recipient_company%20%21%3D%20%27pub_elect%27%20AND%20recipient_email%20NOT%20LIKE%20%27%25flextronics%25%27'
    },
    {
      name: 'Unique Users By Date',
      url:  'https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20%28uniquecount%28article_title%29%29%20as%20Clicks%20from%20Transaction%20facet%20recipient_email%20since%201%20month%20ago%20WHERE%20name%20LIKE%20%27Controller%2Frd%2Finc_then_redirect%27%20limit%2015%20where%20recipient_company%20%21%3D%20%27elementum%27%20%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20and%20recipient_company%20%21%3D%20%27brookstestco%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20AND%20recipient_company%20%21%3D%20%27pub_elect%27%20AND%20recipient_email%20NOT%20LIKE%20%27%25flextronics%25%27'
    },
];

var insights = require('./services/insightsRequests.js');
var thisThing = insights.makeRequest;

insights.requestRecursion(queryArray,thisThing)


module.exports = app;
