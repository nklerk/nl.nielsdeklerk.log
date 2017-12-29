# Simple LOG

This app makes it possible to add some logging to your flow's.
It is simple in every way. it's simple to use and it's simple in terms of code. The donation button below contains more code then the app itself.


## Version 2.0.0
* API Support, Now you can simply log from anywhere. 
    send a HTTP PUT
    with format: {"log": "Test 1,2,3", "group": "TEST"}
    to: http://<IP>/app/nl.nielsdeklerk.log/addlog
* log now stored as objects (Date/time, Group, Log data) (group is for future usage.)
* Appv2 support, who doesn't love to view log file's on a mobile device.
* download log as CSV, ";" seperated.
* Added action card to Remove log data older then # day's.

## Version 1.0.0
* Now using SDKv2.
* Added Date to logging.
* Added Time to logging.
* Ability to show or hide Date.
* Ability to show or hide Time.
* Ability to disable Autorefresh.

## Version 0.0.5
* Fixed a Typo.

## Version 0.0.4

* Repaired the clear button.
* Added a download button.
* Added action card to clear log data.


## Features

* Use the log activity card, and add some text to the log.
* Clear your log.
* View your log in the app settings.
* the log view will refresh when a new line of text is added to the log.