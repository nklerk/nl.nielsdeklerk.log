'use strict'
const Homey = require('homey');

module.exports = [{
    description:	'Add some logging.',
    method: 		'PUT',
    path:			'/addlog/',
    requires_authorization: false,
    public:            true,
    fn: function(data, callback){
        Homey.app.apiPutAddlog(data);
        callback(null, "OK");
        return;
    }
},{
    description:	'Clear logging.',
    method: 		'GET',
    path:			'/clearlog/',
    fn: function(data, callback){
        Homey.app.apiClearLog();
        callback(null, "OK");
        return;
    }
}]