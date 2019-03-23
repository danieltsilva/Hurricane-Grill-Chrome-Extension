var port = chrome.extension.connect({
    name: "HG Extension"
});

port.onMessage.addListener(function(msg) {
    console.log("Message recieved " + msg);
});

$(function() {
  
    $('#root').on("click","#syncroster",function() {
        port.postMessage("sync-roster");
    });

});