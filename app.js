"use strict";

var http = require ('http.min')

function formatDate(date) {
	var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}


function init() {


	Homey.log(" MinderGas starting...");

	Homey.manager('flow').on('action.uploadreading', function (callback, args) {
          var mindergastoken = Homey.manager('settings').get('apiToken');
 					var maxdelay = Homey.manager('settings').get('maximumDelay');
					var midnight = Homey.manager('settings').get('afterMidnight');
					var datum = new Date();
					if ( midnight == true ) {
						datum.setDate(datum.getDate() -1 );
					} else {
						datum.setDate(datum.getDate());
					}
				 	var uploaddate=formatDate(datum);
				 	if (mindergastoken == 'undefined')
					{
						callback(null,false);
						return;
					}
					else {
						var mindergasreading = args.value;
						//var input = '{ "date": "' + uploaddate + '", "reading": ' + mindergasreading + ' }';
						var options = {
			    		uri: 'https://www.mindergas.nl/api/gas_meter_readings',
							//uri: 'https://httpbin.org/post',
							//uri: 'http://192.168.89.22:9000',
			    	  timeout: 5000,
							headers: {
								'Content-Type': 'application/json',
								'AUTH-TOKEN':mindergastoken
							},
							json: {
								date: uploaddate,
								reading: mindergasreading
							}
						}

						// delay for randomized  time to prevent hit on mindergas.nl website

						var delay = Math.floor( Math.random() * maxdelay ) ;
						Homey.log (delay);
						setTimeout(function(){
							http.post(options).then(function (result) {
								//Homey.log('mindergas result: ' + result.response.statusCode)
								callback(null, true)
								return;
							});
						},delay * 1000);
											}
  });

}

module.exports.init = init;
