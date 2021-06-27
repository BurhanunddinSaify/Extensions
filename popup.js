chrome.storage.sync.get(
  ["total", "limit"],
  function displayingInStartValue(budget) {
    document.getElementById("total").innerText = budget.total;
    document.getElementById("limit").innerText = budget.limit;
  }
);

document
  .getElementById("submitAmount")
  .addEventListener("click", function settingAmount() {
    chrome.storage.sync.get(["total", "limit"], function getAmount(budget) {
      var newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      var amount = document.getElementById("amount").value;
      if (amount) {
        newTotal += parseInt(amount);
      }

      chrome.storage.sync.set({ total: newTotal }, function limitReached() {
        var notifOptions = {
          type: "basic",
          iconUrl: "icon48.png",
          title: "Limit Reached",
          message: "Uh Oh! Looks like you have reached your limit.",
        };

        if (amount && newTotal >= budget.limit) {
          chrome.notifications.create("limitReachedNotif", notifOptions);
        }
      });

      document.getElementById("total").innerText = newTotal;
      document.getElementById("amount").value = "";
    });
  });
