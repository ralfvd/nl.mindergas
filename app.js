"use strict";

const Homey = require('homey');

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

class MindergasApp extends Homey.App {

onInit() {

console.log(" MinderGas starting...");

var mindergasttoken = Homey.ManagerSettings.get('apiToken');
if ( !mindergasttoken ) {
	new Homey.Notification({excerpt:'Mindergas: missing apiToken;  enter your mindergas.nl credentials in app settings'}) // username + password set?
			.register();

}

var uploadreadingAction = new Homey.FlowCardAction('uploadreading')

uploadreadingAction
    .register()
    .registerRunListener(( args, state ) => {
          var mindergastoken = Homey.ManagerSettings.get('apiToken');
 					var maxdelay = Homey.ManagerSettings.get('maximumDelay');
					var midnight = Homey.ManagerSettings.get('afterMidnight');
					var datum = new Date();
					if ( midnight == true ) {
						datum.setDate(datum.getDate() -1 );
					} else {
						datum.setDate(datum.getDate());
					}
				 	var uploaddate=formatDate(datum);
				 	if (mindergastoken == 'undefined')
					{
						new Homey.Notification({excerpt:'Mindergas: missing apiToken;  enter your mindergas.nl credentials in app settings'}) // username + password set?
								.register();
						callback(null,false);
						return;
					}
					else {
						var mindergasreading = args.value;
						console.log('gasverbruik: ' + mindergasreading)
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

						console.log (datum + ' ' + delay);
						setTimeout(function(){
							http.post(options).then(function (result) {
								console.log('mindergas result: ' + result.response.statusCode)
								console.log('mindergas result: ' + result.data.error)
								console.log('mindergas result: ' + result.response.statusMessage)
								console.log('----')
								console.log(result)
								callback(null, true)
								return;
							})
							.catch(error => console.log(error))
						},delay * 1000);
											}
  });

}
}

module.exports = MindergasApp;
