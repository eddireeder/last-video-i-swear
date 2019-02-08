chrome.runtime.onInstalled.addListener(function() {
  // Only active on youtube watch pages
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostEquals: 'www.youtube.com',
            pathContains: '/watch'
          },
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
    }]);
  });
  // Initialise enabled tabs as empty array
  chrome.storage.sync.set({'enabled': []});
});

// Remove tab if message recieved by content script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.remove(sender.tab.id);
  }
);

// Remove enabled tab if closed
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.storage.sync.get('enabled', function(data) {
    enabledTabs = data.enabled;
    for (let i = 0; i < enabledTabs.length; i++) {
      if (enabledTabs[i] == tabId) {
        enabledTabs.splice(i, 1);
        chrome.storage.sync.set({'enabled': enabledTabs});
      }
    }
  });
});