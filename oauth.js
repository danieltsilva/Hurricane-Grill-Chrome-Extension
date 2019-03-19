// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var API_KEY = 'AIzaSyDsjIwrvc61c2Ckm6rHPSBNRoRBim_yw44';
var CALENDAR_ID_PRIMARY = 'eugostodequeijadinhadequeijo@gmail.com';
var CALENDAR_ID_WORK = '832fm0rrd8pr869c4e7vnhlh8c@group.calendar.google.com';

var TIMEZONE_SYDNEY = 'Australia/Sydney';
var TIMEZONE_SAOPAULO = 'America/Sao_Paulo';

var event = {
  'summary': 'Google I/O 2015',
  'location': 'Hurricane\'s Grill Circular Quay, Level 2 Gateway Sydney, Alfred St, Sydney NSW 2000, Australia',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2019-03-16T09:00:00-07:00',
    'timeZone': TIMEZONE_SYDNEY
  },
  'end': {
    'dateTime': '2019-03-28T17:00:00-07:00',
    'timeZone': TIMEZONE_SYDNEY
  },
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'popup', 'minutes': 60}
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

  document.getElementById('sampleBtn').addEventListener('click', function() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
        method: 'POST',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event),
        'contentType': 'json'
      };
      fetch(
          'https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(CALENDAR_ID_WORK) + '/events/?key=' + API_KEY,
          init)
          .then((response) => response.json())
          .then(function(data) {
            console.log(data)
          });
    });
  });

  document.getElementById('fetchBtn').addEventListener('click', function() {

  });

};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
  }
);