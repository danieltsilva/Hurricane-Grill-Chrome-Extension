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
      //var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(convertTableToJson());
    }
  }
);