// content.js
var convertTableToJson = function() {
    var rows = [];
    $('#_content_ctl11__gridPersonalRoster tr').each(function(i, n){
        var $row = $(n);
        rows.push({
            date: 		$row.find('td:eq(0)').text().trim(),
            start_time:	$row.find('td:eq(1)').text().trim(),
            end_time:	$row.find('td:eq(2)').text().trim(),
            role:		$row.find('td:eq(3)').text().trim(),
            department:	$row.find('td:eq(4)').text().trim(),
            status:		$row.find('td:eq(5)').text().trim()
        });
    });
    return JSON.stringify(rows);
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      console.log(convertTableToJson());
    }
  }
);


// Refer to the JavaScript quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/js
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.
var CLIENT_ID = '905944902965-k379qddub6neurqf0r2dalq786rpjc6u.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDsjIwrvc61c2Ckm6rHPSBNRoRBim_yw44';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2018-12-01T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};

// var request = gapi.client.calendar.events.insert({
//   'calendarId': 'primary',
//   'resource': event
// });

// request.execute(function(event) {
//   appendPre('Event created: ' + event.htmlLink);
// });
