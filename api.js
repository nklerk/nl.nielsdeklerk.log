"use strict";
const Homey = require("homey");

module.exports = [
  {
    description: "Add some logging.",
    method: "PUT",
    path: "/addlog/",
    requires_authorization: false,
    public: true,
    fn: function(data, callback) {
      Homey.app.apiPutAddlog(data);
      return callback(null, "OK");
    }
  },
  {
    description: "Clear logging.",
    method: "GET",
    path: "/clearlog/",
    fn: function(data, callback) {
      Homey.app.apiClearLog();
      return callback(null, "OK");
    }
  },
  {
    description: "Get Logging.",
    method: "GET",
    path: "/",
    fn: function(data, callback) {
      let log = Homey.app.getLog();
      return callback(null, log);
    }
  }
];
