/* global Homey */
'use strict'

module.exports = {
	init: function () { }
}

Homey.manager('flow').on('action.Input_log', function( callback, args ) {
    Homey.log('Log : ' + args.log);
    var logNew = '';
    var logOld = Homey.manager('settings').get( 'myLog' );
    if (logOld != undefined) { logNew = args.log + "\n" + logOld; } 
    else { logNew = args.log; };
   
    Homey.manager('settings').set( 'myLog', logNew );
    callback( null, true );
});

Homey.manager('flow').on('action.Clear_log', function( callback, args ) {
    Homey.manager('settings').set( 'myLog', '' );
    Homey.log ('-------------------------------------------------');
    Homey.log (' Action.Clear_log     The log data is cleared.');
    Homey.log ('-------------------------------------------------');
    callback( null, true );
});