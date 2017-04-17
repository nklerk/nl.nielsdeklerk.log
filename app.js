/* global Homey */
'use strict'

module.exports = {
	init: function () { }
}

// when a flow is saved with a new trigger
Homey.manager('flow').on('action.Input_log', function( callback, args ) {
    Homey.log('Log : ' + args.log);
    // always fire the callback, it's reserved for future argument validation
    var logNew = "";
    var logOld = Homey.manager('settings').get( 'myLog' );
    if (logOld != undefined) { 
        logNew = args.log + "\n" + logOld;
    } else {
        logNew = args.log;
    }
   
    Homey.manager('settings').set( 'myLog', logNew );
    callback( null, true );
});