function backupAllFolders() {
    console.log("backup")
}

// Function for the backup button
function backupButtonFunction(selfID) {

    document.querySelector("button.backup-yes-button").setAttribute("id", selfID)

    document.querySelector("div#backup-window").style.display = ""
    document.querySelector("div#backup-window").style.animation = "fadeIn 1s"
    if (window.matchMedia("(min-width: 600px)").matches) {
        document.querySelector("div#backup-tab").style.animation = "dropDown1 0.75s"
    } else {
        document.querySelector("div#backup-tab").style.animation = "dropDown3 1s"
    }
    disableScroll()
}

function closeBackupButtonFunction() {
  document.querySelector("div#backup-window").style.display = "none"
  document.querySelector("button.backup-yes-button").setAttribute("id", "")
  enableScroll()
}

document.querySelector("div#backup-window").style.display = "none" // Hide the backup tab

function runBackupFolders(selfID) {
    
}

function yesBackupButtonFunction(selfID) {
    runBackupFolders(selfID)
    closeBackupButtonFunction()
}