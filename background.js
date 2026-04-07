chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "OPEN_GENERATOR") {
    chrome.storage.local.set({ tweetData: message.data }, () => {
      chrome.tabs.create({ url: chrome.runtime.getURL("generator.html") });
    });
  }
});