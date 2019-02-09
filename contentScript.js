function addStyleString(string) {
  let node = document.createElement('style');
  node.innerHTML = string;
  document.body.appendChild(node);
}

// Give video player a z-index (higher than backdrop)
addStyleString('ytd-player { position: relative }');
addStyleString('ytd-player { z-index: 10001 }');

// Add backdrop to page
let backdrop = document.createElement('DIV');
backdrop.style.position = 'fixed';
backdrop.style.zIndex = '10000';
backdrop.style.width = '100%';
backdrop.style.height = '100%';
backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
document.body.appendChild(backdrop);

// Constantly check for 'ended-mode' class
let interval = setInterval(function() {
  if (document.getElementsByClassName('ended-mode').length > 0) {
    clearInterval(interval);
    chrome.runtime.sendMessage({});
  }
}, 500);