function handleClick() {
  browser.deleteAllButtonApi.deleteAllButton();
};

browser.browserAction.onClicked.addListener(handleClick);
