document.addEventListener('mousedown', (event) => {
  // Check for Ctrl key and left mouse button
  if (event.ctrlKey && event.button === 0) {
    const targetElement = event.target.closest('a');

    if (targetElement && targetElement.href && targetElement.href.includes('youtube.com')) {
      console.log('Ctrl + Left Click on YouTube link detected!');
      event.preventDefault();
      event.stopImmediatePropagation();
      chrome.runtime.sendMessage({ action: 'openSkipCut', url: targetElement.href }, function(response) {
        if (chrome.runtime.lastError) {
          console.error("Error sending message: ", chrome.runtime.lastError.message);
        } else {
          console.log("Message sent to background script.");
        }
      });
    } else if (targetElement) {
      console.log('Ctrl + Left Click, but not on a YouTube link or targetElement is null.', targetElement);
    } else {
      console.log('Ctrl + Left Click, but targetElement is null.');
    }
  }
});