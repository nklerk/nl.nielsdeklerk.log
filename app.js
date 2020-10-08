"use strict";
const Homey = require("homey");
const DBLIMIT = 2000;
let loggingDB = [];

// Array check.
function isArray(a) {
  return !!a && a.constructor === Array;
}

// The heart of this app. adding a log entry
function addLogToDB(data, group) {
  checkSurplusEntries();
  loggingDB.push({ data, group, date: new Date() });
  Homey.ManagerSettings.set("loggingDB", loggingDB);
}

// Adding a log entry to Timeline.
function addLogToTimeline(data) {
  Homey.ManagerNotifications.registerNotification({ excerpt: data }, (e, n) => {});
}

//Limit amount of log entries to 2000.
function checkSurplusEntries() {
  if (loggingDB.length > DBLIMIT) {
    let tomuch = loggingDB.length - DBLIMIT;
    loggingDB.splice(0, tomuch);
  }
}

//App Class...
class simpleLog extends Homey.App {
  onInit() {
    loggingDB = Homey.ManagerSettings.get("loggingDB");
    if (!isArray(loggingDB)) {
      loggingDB = [];
    }
    addLogToDB('App "Simple LOG" started.', "Simple LOG");
  }
  apiPutAddlog(data) {
    console.log("API: PUT...");
    console.log(data);
    if (data && data.body && data.body.log) {
      addLogToDB(data.body.log, data.body.group);
    }
  }
  apiClearLog() {
    loggingDB = [];
    addLogToDB("Cleared all logging data", "Simple LOG");
  }
  getLog() {
    return loggingDB;
  }
}
module.exports = simpleLog;

// FLOW Action Card, Input_log
let actionInputLog = new Homey.FlowCardAction("Input_log");
actionInputLog.register().registerRunListener((args, state) => {
  addLogToDB(args.log);
  return true;
});

// FLOW Action Card, Input_logtimeline
let actionInputLogTimeline = new Homey.FlowCardAction("Input_logtimeline");
actionInputLogTimeline.register().registerRunListener((args, state) => {
  addLogToDB(args.log);
  addLogToTimeline(args.log);
  return true;
});

// FLOW Action Card, Input_timeline
let actionInputTimeline = new Homey.FlowCardAction("Input_timeline");
actionInputTimeline.register().registerRunListener((args, state) => {
  addLogToTimeline(args.log);
  return true;
});

// FLOW Action Card, Input_group_log
let actionInputGroupLog = new Homey.FlowCardAction("Input_group_log");
actionInputGroupLog.register().registerRunListener((args, state) => {
  addLogToDB(args.log, args.group);
  return true;
});

// FLOW Action Card, Input_group_logtimeline
let actionInputGroupLogTimeline = new Homey.FlowCardAction("Input_group_logtimeline");
actionInputGroupLogTimeline.register().registerRunListener((args, state) => {
  addLogToDB(args.log, args.group);
  addLogToTimeline(`[${args.group}] ${args.log}`);
  return true;
});

// FLOW Action Card, Clear_log_Older
let actionClearlogOlder = new Homey.FlowCardAction("Clear_log_Older");
actionClearlogOlder.register().registerRunListener((args, state) => {
  console.log("Removing log data older then " + args.days + " Day(s).");
  let newloggingDB = [];
  for (let i in loggingDB) {
    if ((new Date() - new Date(loggingDB[i].date)) / 86400000 <= args.days) {
      newloggingDB.push(loggingDB[i]);
    }
  }
  loggingDB = newloggingDB;
  Homey.ManagerSettings.set("loggingDB", loggingDB);
  return true;
});

// FLOW Action Card, Clear_log
let actionClearlog = new Homey.FlowCardAction("Clear_log");
actionClearlog.register().registerRunListener((args, state) => {
  loggingDB = [];
  addLogToDB("Cleared all logging data", "Simple LOG");
  return true;
});
