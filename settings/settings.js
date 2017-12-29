
let _id = -1;

function onHomeyReady( HomeyReady ){
    Homey = HomeyReady;
    console.log("Get Ready...");
    Homey.ready();
    refreshLog();
}

function clear_simpleLOG(){
    Homey.api( 'GET', '/clearlog/');
    _id = -1;
};

function download_simpleLOG(){
    Homey.get('loggingDB', function(err, logging){
        let csv = "date;group;data\r\n";
        for (i in logging){
            csv = csv + logging[i].date + ';"' + cleanForCsv(logging[i].group) + '";"'+ cleanForCsv(logging[i].data) + '"\r\n';      
        }
        download('Simple LOG.csv', csv);
    });
}

function cleanForCsv(value){
    if (typeof value === "string") {
        value = value.replace(/;/g, ':');
    }

    return value;
}

function refreshLog(){
  if (document.getElementById("show_refresh").checked === true){
    show_log()
  }
  setTimeout(refreshLog, 1000);
}

function show_log(force) {
    if (force) {
        _id = -1;
    }
    //console.log("Show some logging...");
    Homey.get('loggingDB', function(err, logging){
        if( err ) {
            document.getElementById("show_refresh").checked = false;
            return console.error('Could not get log', err);
        }
        let log = ""
        let show_date = document.getElementById("show_date").checked;
        let show_time = document.getElementById("show_time").checked;
        let show_td   = document.getElementById("show_td").checked;
        if (logging.length > _id) {
            for (i in logging){
                const logline = '<div class="logline">' + formatDT(logging[i].date, show_date, show_time) + logging[i].data + "</div>";
    
                if (show_td){
                    log = logline + log;
                } else {
                    log = log + logline;
                }            
            }
            document.getElementById('logtextarea').innerHTML = log;
            _id = logging.length;
        }
        
    });
}


function formatDT (dateIn, returnDate, returnTime){
    let date = new Date(dateIn);
    let hour = date.getHours();
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
    
    if (returnDate === true && returnTime === false) {
        return year + "-" + month + "-" + day+ "  ";
    } else if (returnDate === false && returnTime === true){
        return hour + ":" + min + ":" + sec + "  ";
    } else if (returnDate === true && returnTime === true){
        return year + "-" + month + "-" + day+ "  " + hour + ":" + min + ":" + sec + "  ";
    } else {
        return "";
    }
}


function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}