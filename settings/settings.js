//let Homey;
let _myLog;

function onHomeyReady( homeyReady ){
    Homey = homeyReady;
    Homey.ready();
    refreshLog();
}

function clear_simpleLOG(){
    Homey.set('myLog', '');
};

function download_simpleLOG(){
    download('Simple LOG.txt', document.getElementById('logtextarea').value);
};

function refreshLog(){
  if (document.getElementById("show_refresh").checked === true){
    show_log()
  }
  setTimeout(refreshLog, 1000);
}

function show_log() {
  Homey.get('myLog', function(err, logging){
      if( err ) return console.error('Could not get log', err);
      if (document.getElementById("show_date").checked === false){
         logging = logging.replace(/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9][0-9][0-9]  \|\|  /g, "");
      }
      if (document.getElementById("show_time").checked === false){
         logging = logging.replace(/[0-2][0-9]\:[0-9][0-9]\:[0-9][0-9]  \|\|  /g, "");
      }
      if (_myLog !== logging){
        _myLog = logging
        document.getElementById('logtextarea').value = logging;
      }
  });
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