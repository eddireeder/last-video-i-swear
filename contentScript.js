// Currently not needed
function timeToSeconds(time) {
  let timeSplit = time.split(':');
  let hours, minutes, seconds;
  if (timeSplit.length == 2) {
    hours = 0;
    minutes = parseInt(timeSplit[0]);
    seconds = parseInt(timeSplit[1]);
  } else {
    hours = parseInt(timeSplit[0]);
    minutes = parseInt(timeSplit[1]);
    seconds = parseInt(timeSplit[2]);
  }
  return (seconds + minutes*60 + hours*60*60);
}

// Currently not needed
function computeSecondsRemaining() {
  let timeCurrent = document.getElementsByClassName('ytp-time-current')[0].textContent;
  let timeDuration = document.getElementsByClassName('ytp-time-duration')[0].textContent;
  return (timeToSeconds(timeDuration) - timeToSeconds(timeCurrent));
}

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