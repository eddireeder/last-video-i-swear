// Give video player a z-index (higher than backdrop)
let elements = document.getElementsByClassName('ytd-watch-flexy');
for (element of elements) {
  if (element.id == 'player') {
    element.style.zIndex = '10001';
  }
}

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