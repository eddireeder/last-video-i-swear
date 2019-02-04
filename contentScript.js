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

// EITHER:
// Place a backdrop behind video that is slightly dark and doesn't allow clicking
// OR:
// Force the video into fullscreen
// I will attempt the first one, since it allows the user to choose their prefered way of watching a video

// Constantly check for 'ended-mode' class
let interval = setInterval(function() {
  if (document.getElementsByClassName('ended-mode').length > 0) {
    clearInterval(interval);
    chrome.runtime.sendMessage({});
  }
}, 500);