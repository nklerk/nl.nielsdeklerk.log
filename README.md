This app makes it possible to add logging to your flows. and chose to log the data to the homescreen in none card.

You can:

- Use the log activity card, and add some text to the log.
- Use the log activity card, and add some text to the log while tagging a group name.
- Clear your log.
- View your log in the app settings.
- the log view will refresh when a new line of text is added to the log.
- within the homey app you can view the log in CSV format.
- within the developer tools you can download the log in CSV format. -> https://developer.athom.com/tools/app-settings

# API

The folowing API endpoints can be used:

- Grab log data:
  GET /api/app/nl.nielsdeklerk.log/

- Add log data:
  PUT /api/app/nl.nielsdeklerk.log/addlog/
  Content-Type: application/json
  {"log": "Test 1,2,3", "group": "TEST"}

- Clear log
  GET /api/app/nl.nielsdeklerk.log/clearlog
