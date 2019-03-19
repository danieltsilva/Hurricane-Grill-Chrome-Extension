// background.js
var events;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"}, function(response) {
      events = response.events;
      console.log(events);
    });
  });

  chrome.tabs.create({url: 'index.html'}, function(tab){
    chrome.tabs.sendMessage(tab.id, {vaipf: "BLAHBLAHBLAH!"});
  });

  // chrome.identity.getAuthToken({interactive: true}, function(token) {
  //   console.log(token);
  // });
});