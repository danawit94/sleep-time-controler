let activeTab = null;
let startTime = Date.now();

let usageData = {
  totalTime: 0,
  sites: {}
};

function saveData() {
  chrome.storage.local.set({ usageData });
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  let now = Date.now();

  if (activeTab) {
    let timeSpent = (now - startTime) / 1000;

    chrome.tabs.get(activeTab, (tab) => {
      if (tab && tab.url) {
        let domain = new URL(tab.url).hostname;

        if (!usageData.sites[domain]) {
          usageData.sites[domain] = 0;
        }

        usageData.sites[domain] += timeSpent;
        usageData.totalTime += timeSpent;
      }

      saveData();
    });
  }

  activeTab = activeInfo.tabId;
  startTime = now;
});

chrome.tabs.onUpdated.addListener(() => {
  startTime = Date.now();
});