/* global Homey */
'use strict'

module.exports = {
	init: function () { }
}

/*Homey.manager('flow').on('action.Input_log', function( callback, args ){
    Homey.log('Log: ' + args);
    callback( null, true ); // we've fired successfully
});*/

// when a flow is saved with a new trigger
Homey.manager('flow').on('action.Input_log', function( callback, args ) {
    Homey.log('Log : ' + args.log);
    // always fire the callback, it's reserved for future argument validation
    var value = "";
    var mylog = Homey.manager('settings').get( 'myLog' );
    if (mylog != undefined) { 
        value = args.log + "\n" + mylog;
    } else {
        value = args.log;
    }
   
    Homey.manager('settings').set( 'myLog', value /* Must be 'JSON.stringify'-able */ );
    Homey.log(value); // myValue
    callback( null, true );
});