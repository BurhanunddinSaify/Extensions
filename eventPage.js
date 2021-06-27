var contextMenu = {
  id: "SpendMoney",
  title: "Spend Money",
  contexts: ["selection"],
};
chrome.contextMenus.create(contextMenu);

chrome.contextMenus.onClicked.addListener(function addMoneyContextMenu(
  clickData
) {
  if (clickData.menuItemId == "SpendMoney" && clickData.selectionText) {
    chrome.storage.sync.get(["total", "limit"], function AddTotal(budget) {
      var newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }
      newTotal += parseInt(clickData.selectionText);
      chrome.storage.sync.set({ total: newTotal });
    });
  }
});

chrome.storage.onChanged.addListener(function changeBadge(change, storageName) {
  chrome.browserAction.setBadgeText({ text: change.total.newValue.toString() });
});
