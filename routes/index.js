var express = require('express');
var router = express.Router();
var insights = require('../services/insightsRequests.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  	
  	var thisThing = insights.makeRequest()
  	console.log(thisThing);
  	next()

}, 	function(req, res, next) {
  
  res.send('cool');
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        console.log(docs);
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

module.exports = router;
