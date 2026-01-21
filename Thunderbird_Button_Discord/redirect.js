browser.spacesToolbar.addButton('Discord', {
    title: "Discord",
    defaultIcons: "discord.svg",
    url: "https://discord.com/channels/@me"
});



const URL_TO_OPEN = "https://discord.com/channels/@me";

browser.browserAction.onClicked.addListener(async () => {
  await browser.tabs.create({
    url: URL_TO_OPEN
  });
});
