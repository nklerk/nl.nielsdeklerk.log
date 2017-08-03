'use strict';

const Homey = require('homey');
const actionInputLog = new Homey.FlowCardAction('Input_log');
const actionClearLog = new Homey.FlowCardAction('Clear_log');

class simpleLog extends Homey.App {
	onInit() {
		this.log('init simpleLog')
	}
}
module.exports = simpleLog;

actionInputLog.register().on('run', ( args, state, callback ) => {
    let logNew = getDateTime() + args.log;
    console.log('Logging: ' + logNew);
    const logOld = Homey.ManagerSettings.get('myLog');
    if (logOld != undefined) { 
        logNew = logNew+"\n"+logOld;
    }
    Homey.ManagerSettings.set('myLog', logNew );
    callback( null, true );
});

actionClearLog.register().on('run', ( args, state, callback ) => {
    Homey.ManagerSettings.set('myLog', '' );
    console.log (' Action.Clear_log: The log data is cleared.');
    callback( null, true );
}); 


function getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "-" + month + "-" + year + "  ||  " + hour + ":" + min + ":" + sec + "  ||  ";
}