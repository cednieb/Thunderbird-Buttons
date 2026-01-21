browser.spacesToolbar.addButton('Whatsapp', {
    title: "Whatsapp",
    defaultIcons: "whatsapp.svg",
    url: "https://web.whatsapp.com/"
});

browser.webRequest.onBeforeSendHeaders.addListener(
  function(e) {
    e.requestHeaders.forEach(header => {
      if (header.name.toLowerCase() === "user-agent") {
        header.value = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/147.0";
      }
    });
    return { requestHeaders: e.requestHeaders };
  },
  { urls: ["https://web.whatsapp.com/*"] },
  ["blocking", "requestHeaders"]
);


const URL_TO_OPEN = "https://web.whatsapp.com/";

browser.browserAction.onClicked.addListener(async () => {
  await browser.tabs.create({
    url: URL_TO_OPEN
  });
});

