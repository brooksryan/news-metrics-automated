var rp = require('request-promise');

// TESTING REQUEST-PROMISE
module.exports = {

resultSearch: function (object){



},

requestRecursion: function(array,recursionFunction){

	array.forEach(recursionFunction);

},

makeRequest: function (arrayItem,index,array) {


	
	var options = {
    uri: '',
    qs: {
        access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx' 
    },
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'Request-Promise',
        'X-Query-Key': 'i3HxWdF6aiYkII1NKTAoflixrja2POHA'
    },
    json: true // Automatically parses the JSON string in the response 
	};


	options.uri = arrayItem.url;
	request = rp(options)
  	.then(function(parsedBody){ 
  		console.log(arrayItem.name);
    	var theseResults = parsedBody;
    	theseResults['current'] != undefined ? console.log(theseResults['current'])
    	: theseResults['results'] != undefined ? console.log(theseResults['results'])
    	: theseResults['facets'] != undefined ? console.log(theseResults['facets'])
    	: console.log('something went wrong', theseResults)

	}); 

}

}
//for each query in the array, hit the api and return the answer

// var queryArray = ['https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20uniquecount%28recipient_email%29%20as%20%27Opens%20out%20of%201965%20total%20recipients%27%20FROM%20Transaction%20since%201%20days%20ago%20COMPARE%20WITH%201%20week%20ago%20WHERE%20name%20%3D%20%27Controller%2Ftracking%2Fimage%27%20WHERE%20recipient_company%20%21%3D%27elementum%27%20%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20AND%20recipient_company%20%21%3D%20%27pub_elect%27'
// ,'https://insights-api.newrelic.com/v1/accounts/747677/query?nrql=SELECT%20uniquecount%28recipient_email%29%20as%20%27Unique%20Opens%20out%20of%201965%20total%20recipients%27%20FROM%20Transaction%20since%201%20week%20ago%20COMPARE%20WITH%201%20week%20ago%20WHERE%20name%20%3D%20%27Controller%2Ftracking%2Fimage%27%20WHERE%20recipient_company%20%21%3D%27elementum%27%20%20and%20recipient_email%20NOT%20LIKE%20%27%25boltoninternational%25%27%20AND%20recipient_company%20%21%3D%20%27pub_auto%27%20AND%20recipient_company%20%21%3D%20%27pub_elect%27'
// ],


