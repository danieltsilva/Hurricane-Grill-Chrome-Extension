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

var convertTableToJson = () => {
  var roster = {};

  $('#_content_ctl11__gridPersonalRoster tr').slice(1).each(function(i, n){

    var $row = $(n);
    dateSplitted = $row.find('td:eq(0)').text().trim().split(" ");

    var shift = {};
    shift.date = {
      text: $row.find('td:eq(0)').text().trim(),
      month: MONTHS[dateSplitted[1]],
      day: dateSplitted[2]
    };
    shift.time = {
      start: $row.find('td:eq(1)').text().trim(),
      end: $row.find('td:eq(2)').text().trim()
    };
    shift.role = $row.find('td:eq(3)').text().trim();
    
    roster[i] = shift;
  });

  return roster;
};

// Listener to trigger the roster parsing
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "parse-week" ) {
      let roster = convertTableToJson();
      console.log(roster);
      sendResponse( { "week-parsed" : roster } );
    }
  }
);

