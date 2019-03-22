'use strict';  

var API_KEY = 'AIzaSyDsjIwrvc61c2Ckm6rHPSBNRoRBim_yw44';
var CALENDAR_ID_PRIMARY = 'eugostodequeijadinhadequeijo@gmail.com';
var CALENDAR_ID_WORK = '832fm0rrd8pr869c4e7vnhlh8c@group.calendar.google.com';

var TIMEZONE_SYDNEY = 'Australia/Sydney';
var TIMEZONE_SAOPAULO = 'America/Sao_Paulo';

//TODO
// Fazer a porra da funcao de conversao do tempo pro Google
var event = {
  'summary': 'TESTE',
  'location': 'Hurricane\'s Grill Circular Quay, Level 2 Gateway Sydney, Alfred St, Sydney NSW 2000, Australia',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start':  {'dateTime': "2019-03-23T16:00:00-07:00", 'timeZone': "Australia/Sydney"},
  'end':    {'dateTime': "2019-03-23T22:00:00-07:00", 'timeZone': "Australia/Sydney"},
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'popup', 'minutes': 60}
    ]
  }
};


var loadRoster = roster => {

  $('#placeholder').hide();
  
  var shifts = $('#shifts');

  $.each(roster, function(i,shift){
    console.log(i);
    console.log(shift.role);
    var shiftCard = '<div column><div class="ui card"><div class="content"><i class="right floated big address book icon"></i><div class="header">' +
                    shift.role +
                    '</div></div><div class="content"><h4 class="ui sub header">' +
                    shift.date.text +
                    '</h4><div class="ui small feed"><div class="event"><div class="content"><div class="summary"><p>From ' +
                    shift.time.start +
                    '</p></div></div></div><div class="event"><div class="content"><div class="summary"><p>To ' +
                    shift.time.end +
                    '</p></div></div></div></div></div><div class="extra content"><button id="btn" class="ui button">Add Google Calendar</button></div></div></div>';
        
    shifts.append(shiftCard).trigger('create');
  });

};

$(function() {

  $("#btn").click(function(){
    console.log('click no botao');

    var endpoint = 'https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(CALENDAR_ID_WORK) + '/events/?key=' + API_KEY;
    
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      console.log(token);
      $.ajax({
          type: "POST",
          url: endpoint,
          dataType: 'json',
          async: true,
          headers: {
            'Authorization':  'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(event),
          success: function (data){
            console.log(data);
          },
          error: function(){
            console.log('DEU RUIM!');
          }
      });
    });
    console.log('saiu.');
  });

});

// Listener to receive the roster from background script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.roster ) {
      roster = request.roster;
      console.log('Received from background:')
      console.log(roster);
      loadRoster(roster);
    };
  }
);