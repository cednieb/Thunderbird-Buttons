async function emptyTrashAndCompact() {
  try {
    let accounts = await browser.accounts.list();

    for (let account of accounts) {
      let trashFolder = account.folders.find(folder => folder.type === "trash");
      if (!trashFolder) {
        console.log(`No Trash folder found in account ${account.name}`);
        continue;
      }

      let messages = await browser.messages.list(trashFolder.id);
      let msgIds = messages.messages.map(m => m.id);

      if (msgIds.length) {
        await browser.messages.delete(msgIds);
        console.log(`Deleted ${msgIds.length} messages from Trash in account ${account.name}`);
      } else {
        console.log(`Trash empty in account ${account.name}`);
      }

      for (let folder of account.folders) {
        if (folder.canCompact) {
          try {
            await browser.folders.compact(folder.id);
            console.log(`Compacted folder ${folder.name} in account ${account.name}`);
          } catch (e) {
            console.error(`Could not compact ${folder.name} in account ${account.name}`, e);
          }
        }
      }
    }
  } catch (e) {
    console.error('Error emptying Trash and compacting:', e);
  }
}

browser.browserAction.onClicked.addListener(emptyTrashAndCompact);
