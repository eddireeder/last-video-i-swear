let closeCurrentTabButton = document.getElementById("close-current-tab");

closeCurrentTabButton.onclick = function(element) {
  // Execute content script
  chrome.tabs.executeScript({
    file: 'contentScript.js'
  });
}