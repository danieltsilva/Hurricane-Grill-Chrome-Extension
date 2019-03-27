// background.js

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected ...");

  var roster = [];
  var newTabId = 0;
  
  port.onMessage.addListener(function(msg) {

    if(msg === 'sync-roster'){  // Import Roster to Google Calendar

      // Send a message to the active tab
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "parse-week"}, function(response) {
          roster = response["week-parsed"];
        });
      });
      
      // Create a new tab
      chrome.tabs.create({url: 'index.html'}, function(tab){
        newTabId = tab.id;
      });

      // Sending messages from background / event page
      chrome.tabs.onUpdated.addListener(function(newTabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            chrome.tabs.sendMessage(newTabId, { "roster": roster });
        }
      });

    };
  });

  





});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  var roster = [];
  var newTabId = 0;

  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "parse-week"}, function(response) {
      roster = response["week-parsed"];
      chrome.extension.getBackgroundPage().console.log("Creating my roster!");
      chrome.extension.getBackgroundPage().console.log(roster); //AQUI TENHO MEU roster
    });
  });

  // Create a new tab
  chrome.tabs.create({url: 'index.html'}, function(tab){
    newTabId = tab.id;
    chrome.extension.getBackgroundPage().console.log("Inside the CreateTab function");
    chrome.extension.getBackgroundPage().console.log(roster); //AQUI JA NAO TENHO MEU ROSTER
  });

  // Sending messages from background / event page
  chrome.tabs.onUpdated.addListener(function(newTabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.extension.getBackgroundPage().console.log("Inside the onUpdated Listener");
        chrome.extension.getBackgroundPage().console.log(roster); //AQUI QUE EU PRECISO DO MEU ROSTER, MAS SÓ DÁ UNDEFINED
        chrome.tabs.sendMessage(newTabId, { "roster": roster });
    }
  });

});