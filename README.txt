This app makes it possible to add logging to your Flows.

With simple log You can:
- Add logging to your Flows
- tag your logging data with a group tag for tidy filtering.
- Add logging data while simultaniously showing the message on the Homey App's Timeline.
- Clear all logging.
- View your logged data within the app settings.
- See log events apear in realtime.
- View the log in CSV format.
- You can download the log in CSV format. -> https://developer.athom.com/tools/app-settings
- Use the API to retreive, add and clean logging.


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