browser.spacesToolbar.addButton('Google', {
    title: "Google",
    defaultIcons: "google.svg",
    url: "https://google.com"
});



const URL_TO_OPEN = "https://google.com";

browser.browserAction.onClicked.addListener(async () => {
  await browser.tabs.create({
    url: URL_TO_OPEN
  });
});
