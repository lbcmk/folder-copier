function backupAllFolders() {
    console.log("backup")
}

// Function for the backup button
function backupButtonFunction(selfID) {

    runBackupFolders(selfID, "folders")

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
  document.querySelector("div#folders").innerText = ""
  enableScroll()
}

document.querySelector("div#backup-window").style.display = "none" // Hide the backup tab

function runBackupFolders(selfID, format = "folders") {
    fetch('/backupfolder', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"folder": selfID, "format": format})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if(format == "folders") {
            folderTextBox = document.querySelector("div#folders")
            folderTextBox.innerText = ""
            
            function addTextToFoldersTextBox(data, titleId, titleText, shownPrefix) {
                if(data.length > 0) {
                    newFoldersText = document.createElement("h3")
                    newFoldersText.setAttribute("id", titleId)
                    newFoldersText.innerText = titleText
                    folderTextBox.append(newFoldersText)
                }
                for(i=0; i < data.length; i++) {
                    fileText = document.createElement("p")
                    fileText.setAttribute("id", "fileText")
                    fileText.innerText = `${shownPrefix} ` + data[i]
                    folderTextBox.append(fileText)
                }
            }

            addTextToFoldersTextBox(data["dir1"]["new_folders"], "greenText", "New Folders:", "+") // New Folders
            addTextToFoldersTextBox(data["dir1"]["new_files"], "greenText", "New Files:", "+") // New Files
            addTextToFoldersTextBox(data["edited_files"], "redText", "Changed Files:", "\u2022") // Changed Files
            addTextToFoldersTextBox(data["dir2"]["new_folders"], "redText", "Removed Folders:", "-") // Removed Folders
            addTextToFoldersTextBox(data["dir2"]["new_files"], "redText", "Removed Files:", "-") // Removed Files
        }
    })
      .catch((error) => {
        console.error('Error:', error);
    });
}

function yesBackupButtonFunction(selfID) {
    runBackupFolders(selfID, "backup")
    closeBackupButtonFunction()
}