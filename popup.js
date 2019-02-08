function setReady() {
  let message = document.getElementsByClassName("message")[0];
  let button = document.getElementsByClassName("start-button")[0];
  message.innerHTML = "Last video? Simply press the button to leave.";
  button.innerHTML = "Take me away";
  button.classList.add('enabled');
}

function setEnabled() {
  let message = document.getElementsByClassName("message")[0];
  let button = document.getElementsByClassName("start-button")[0];
  message.innerHTML = "Enjoy your last video!";
  button.innerHTML = ":)";
  button.classList.remove('enabled');
}

// Check whether tab is enabled
chrome.storage.sync.get('enabled', function(data) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log(data);
    console.log(tabs);
    if (data.enabled.includes(tabs[0].id)) {
      setEnabled();
    } else {
      setReady();
    }
  });
});

let button = document.getElementsByClassName("start-button")[0];
button.onclick = function(element) {
  // Check whether tab is not enabled
  chrome.storage.sync.get('enabled', function(data) {
    enabledTabs = data.enabled;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (!enabledTabs.includes(tabs[0].id)) {
        // Store tab as enabled
        enabledTabs.push(tabs[0].id);
        chrome.storage.sync.set({'enabled': enabledTabs});
        // Set popup as enabled
        setEnabled();
        // Execute content script
        chrome.tabs.executeScript({
          file: 'contentScript.js'
        });
      }
    });
  });
}