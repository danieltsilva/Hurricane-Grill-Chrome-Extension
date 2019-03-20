// background.js
var roster = [];
var newTabId = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab, roster) {

  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs, roster) {
    var activeTab = tabs[0];      
    chrome.tabs.sendMessage(activeTab.id, {"message": "parse-week"}, function(response, roster) {
      roster = response["week-parsed"];
    });
  });

  // Create a new tab
  chrome.tabs.create({url: 'index.html'}, function(tab){
    newTabId = tab.id;
    chrome.extension.getBackgroundPage().console.log(newTabId);
  });

  // Sending messages from background / event page
  chrome.tabs.onUpdated.addListener(function(newTabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.query({ active: true }, function(tabs) {
            const msg = "Hello from background ?";
            chrome.tabs.sendMessage(tabs[0].id, { "message": msg });
        })
    }
  });

});