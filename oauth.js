// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var API_KEY = 'AIzaSyDsjIwrvc61c2Ckm6rHPSBNRoRBim_yw44';
var CALENDAR_ID_PRIMARY = 'eugostodequeijadinhadequeijo@gmail.com';
var CALENDAR_ID_WORK = '832fm0rrd8pr869c4e7vnhlh8c@group.calendar.google.com';

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

var makeQuerystring = params =>
  Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    })
    .join("&");

window.onload = function() {
  document.querySelector('button').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(token);
      console.log(makeQuerystring(event));
      console.log('I say a little pray for yooouuuu!')

      let init = {
        method: 'POST',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
          'https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(CALENDAR_ID_WORK) + '/events/quickAdd?' + 'text=Textandiu' + '&key=' + API_KEY,
          init)
          .then((response) => response.json())
          .then(function(data) {
            console.log(data)
          });
    });
  });
};