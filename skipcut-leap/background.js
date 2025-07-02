
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openInSkipCut",
    title: "Open in SkipCut",
    contexts: ["link"],
    targetUrlPatterns: ["*://*.youtube.com/*"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openInSkipCut" && info.linkUrl) {
    const skipCutUrl = info.linkUrl.replace("youtube.com", "skipcut.com");
    chrome.tabs.create({ url: skipCutUrl });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received in background script:", request);
  if (request.action === "openSkipCut" && request.url) {
    const skipCutUrl = request.url.replace("youtube.com", "skipcut.com");
    console.log("Opening SkipCut URL:", skipCutUrl);
    chrome.tabs.create({ url: skipCutUrl }, function() {
      if (chrome.runtime.lastError) {
        console.error("Error creating tab: ", chrome.runtime.lastError.message);
      }
    });
  }
});
