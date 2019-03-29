let _id = -1;
let show_refresh;
let show_date;
let show_time;
let show_td;
let show_ft;

function onHomeyReady(HomeyReady) {
  Homey = HomeyReady;
  console.log("Get Ready...");
  Homey.ready();
  loaddisplayParameters();
  refreshLog();
}

function clear_simpleLOG() {
  Homey.api("GET", "/clearlog/");
  _id = -1;
}

function download_simpleLOG() {
  Homey.get("loggingDB", function(err, logging) {
    let csv = "date;group;data\r\n";
    for (i in logging) {
      csv = csv + `${logging[i].date};${cleanForCsv(logging[i].group)};${cleanForCsv(logging[i].data)}\r\n`;
    }
    download("Simple LOG.csv", csv);
  });
}

function show_csv() {
  Homey.get("loggingDB", function(err, logging) {
    download_simpleLOG();
    let csv = `<div class="logline">CSV log file can't be downloaded within the app.</div>`;
    csv = csv + `<div class="logline">Go to the Homey developer site at https://developer.athom.com/tools/app-settings</div>`;
    csv = csv + `<div class="logline">Open the Simple log settings,</div>`;
    csv = csv + `<div class="logline">then use the CSV button.</div>`;
    csv = csv + `<div class="logline">Or copy the log in CSV format below:</div>`;
    csv = csv + `<div class="logline"></div><br>`;
    csv = csv + `<div class="logline"></div><br>`;
    csv = csv + `<div class="logline"></div><br>`;
    csv = csv + `<div class="logline">date;group;data</div>`;
    let log = "";
    for (i in logging) {
      const logline = `<div class="logline">${logging[i].date};${cleanForCsv(logging[i].group)};${cleanForCsv(logging[i].data)}</div>`;
      if (show_td) {
        log = logline + log;
      } else {
        log = log + logline;
      }
    }
    csv = csv + log;
    document.getElementById("logtextarea").innerHTML = csv;
  });
}

function cleanForCsv(value) {
  if (typeof value === "string") {
    value = value.replace(/;/g, ":");
  }

  return value;
}

function loaddisplayParameters() {
  Homey.get("show_refresh", (e, x) => {
    show_refresh = x.checked;
    document.getElementById("show_refresh").checked = x.checked;
  });
  Homey.get("show_date", (e, x) => {
    show_date = x.checked;
    document.getElementById("show_date").checked = x.checked;
  });
  Homey.get("show_time", (e, x) => {
    show_time = x.checked;
    document.getElementById("show_time").checked = x.checked;
  });
  Homey.get("show_td", (e, x) => {
    show_td = x.checked;
    document.getElementById("show_td").checked = x.checked;
  });
  Homey.get("show_ft", (e, x) => {
    show_ft = x.checked;
    document.getElementById("show_ft").checked = x.checked;
    show_size();
  });
}

function savedisplayParameters() {
  show_refresh = document.getElementById("show_refresh").checked;
  console.log("SET show_refresh:");
  console.log(show_refresh);
  Homey.set("show_refresh", { checked: show_refresh });
  show_date = document.getElementById("show_date").checked;
  Homey.set("show_date", { checked: show_date });
  show_time = document.getElementById("show_time").checked;
  Homey.set("show_time", { checked: show_time });
  show_td = document.getElementById("show_td").checked;
  Homey.set("show_td", { checked: show_td });
  show_ft = document.getElementById("show_ft").checked;
  Homey.set("show_ft", { checked: show_ft });
}

function refreshLog() {
  if (document.getElementById("show_refresh").checked === true) {
    show_log();
  }
  setTimeout(refreshLog, 1000);
}

function show_log(force) {
  if (force) {
    _id = -1;
  }
  //console.log("Show some logging...");
  Homey.get("loggingDB", function(err, logging) {
    if (err) {
      document.getElementById("show_refresh").checked = false;
      return console.error("Could not get log", err);
    }
    let log = "";
    savedisplayParameters();
    if (logging.length > _id) {
      for (i in logging) {
        if (logging[i].group) {
          logging[i].group = `[${logging[i].group}]`;
        } else {
          logging[i].group = ``;
        }
        const logline = `<div class="logline"> ${formatDT(logging[i].date, show_date, show_time)} ${logging[i].group}  ${logging[i].data} </div>`;

        if (show_td) {
          log = logline + log;
        } else {
          log = log + logline;
        }
      }
      document.getElementById("logtextarea").innerHTML = log;
      _id = logging.length;
    }
  });
}

function show_size() {
  let lt = document.getElementById("logtextarea");
  savedisplayParameters();
  if (show_ft) {
    lt.style.fontSize = "large";
  } else {
    lt.style.fontSize = "xx-small";
  }
}

function formatDT(dateIn, returnDate, returnTime) {
  let date = new Date(dateIn);
  let hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;
  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  if (returnDate === true && returnTime === false) {
    return year + "-" + month + "-" + day + "  ";
  } else if (returnDate === false && returnTime === true) {
    return hour + ":" + min + ":" + sec + "  ";
  } else if (returnDate === true && returnTime === true) {
    return year + "-" + month + "-" + day + "  " + hour + ":" + min + ":" + sec + "  ";
  } else {
    return "";
  }
}

function download(filename, text) {
  var pom = document.createElement("a");
  pom.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  pom.setAttribute("download", filename);

  if (document.createEvent) {
    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}
