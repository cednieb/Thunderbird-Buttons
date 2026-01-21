var { ExtensionCommon } = ChromeUtils.importESModule("resource://gre/modules/ExtensionCommon.sys.mjs");
var { MailUtils } = ChromeUtils.importESModule("resource:///modules/MailUtils.sys.mjs");

var deleteAllButtonApi = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    return {
      deleteAllButtonApi: {
        async deleteAllButton() {
          let mailWindow = Services.wm.getMostRecentWindow("mail:3pane");
          if (!mailWindow) {
            console.error("Mail window not found");
            return;
          }

          // Step 1: Delete all messages currently viewed
          mailWindow.goDoCommand('cmd_selectAll');
          mailWindow.goDoCommand('cmd_delete');

          // Step 2: Find the unified Trash folder
          let accounts = mailWindow.MailServices.accounts.accounts;
          let localFoldersAccount = null;
          for (let account of accounts) {
            // "none" means Local Folders
            if (account.incomingServer && account.incomingServer.type === "none") {
              localFoldersAccount = account;
              break;
            }
          }

          // Get Ci from global Components
          const Ci = Components.interfaces;

          let trashFolder = null;
          if (localFoldersAccount) {
            trashFolder = localFoldersAccount.incomingServer.rootFolder.getFolderWithFlags(Ci.nsMsgFolderFlags.Trash);
          }
          // Fallback: use Trash of first account
          if (!trashFolder && accounts.length > 0) {
            trashFolder = accounts[0].incomingServer.rootFolder.getFolderWithFlags(Ci.nsMsgFolderFlags.Trash);
          }

          if (trashFolder) {
            // Step 3: Display the Trash folder
            mailWindow.gFolderTreeView.selectFolder(trashFolder);
            // Step 4: Delete all messages in Trash (equivalent to empty)
            mailWindow.goDoCommand('cmd_selectAll');
            mailWindow.goDoCommand('cmd_delete');
            console.log("Emptied unified Trash folder (via select & delete).");
          } else {
            console.log("Unified Trash folder not found.");
          }
        }
      }
    };
  }
};
