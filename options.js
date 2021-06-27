chrome.storage.sync.get("limit", function showingLimitInOptions(budget) {
  document.getElementById("limit").value = budget.limit;
});

document
  .getElementById("setLimit")
  .addEventListener("click", function setLimit() {
    var limit = document.getElementById("limit").value;
    if (limit) {
      chrome.storage.sync.set({ limit: limit }, function closing() {
        close();
      });
    }
  });

document
  .getElementById("reset")
  .addEventListener("click", function resetAmount() {
    chrome.storage.sync.set({ total: 0 }, function resetNotification() {
      var resetNotifOptions = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Alert!",
        message: "Your total spending has been reset to 0",
      };
      chrome.notifications.create("resetNotification", resetNotifOptions);
    });
  });
