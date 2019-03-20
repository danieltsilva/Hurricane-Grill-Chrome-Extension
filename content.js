// content.js

var MONTHS = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  'Apr': '04',
  'May': '05',
  'Jun': '06',
  'Jul': '07',
  'Aug': '08',
  'Sep': '09',
  'Oct': '10',
  'Nov': '11',
  'Dec': '12',
}

var TIMEZONE_SYDNEY = 'Australia/Sydney';
var TIMEZONE_SAOPAULO = 'America/Sao_Paulo';

var roster = {};
var rosterDate = '';
var rosterEvents = [];

var convertToDateFormat = (stringDate) => {
  let dateSplitted = stringDate.split(" ");
  return dateSplitted[2] + '-' + MONTHS[dateSplitted[1]] + '-' + dateSplitted[0];
};

var convertTableToJson = () => {
    var rows = [];
    $('#_content_ctl11__gridPersonalRoster tr').slice(1).each(function(i, n){
        var $row = $(n);
        dateSplitted = $row.find('td:eq(0)').text().trim().split(" ");
        rows.push(createEventJson(
          MONTHS[dateSplitted[1]] + '-' + dateSplitted[2],
          $row.find('td:eq(1)').text().trim(),
          $row.find('td:eq(2)').text().trim(),
          $row.find('td:eq(3)').text().trim()
        ));
    });

    //TODO Fix double information
    //double info
    rosterEvents = rows;
    rosterDate = convertToDateFormat($('#_content_ctl11__filtersPersonal__lblStartDate').html());

    //double info
    roster[rosterDate] = rosterEvents;

    return rosterDate;
};

var createEventJson = (date, start, end, role) => {
  return JSON.stringify({
    'summary': role,
    'location': 'Hurricane\'s Grill Circular Quay, Level 2 Gateway Sydney, Alfred St, Sydney NSW 2000, Australia',
    'description': role + 'shift.\n\nAutomatically generated event.',
    'start': {
      'dateTime': '2019-' + date + 'T' + start + ':00-07:00',
      'timeZone': TIMEZONE_SYDNEY
    },
    'end': {
      'dateTime': '2019-' + date + 'T' + end + ':00-07:00',
      'timeZone': TIMEZONE_SYDNEY
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'popup', 'minutes': 60}
      ]
    }
  });
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "parse-week" ) {
      let rd = convertTableToJson()
      sendResponse( { "week-parsed" : roster[rd] } );
    }
  }
);

