var data = {}
var oldDirectoriesData = []
var directoriesData = []

function runAddFolders() {
    fetch('/addfolder', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
    })
      .catch((error) => {
        console.error('Error:', error);
    });
}

async function getFolders(writeCard = false) {
    const response = await fetch('/folders', {method: 'GET'})
    .catch((error) => {
        console.error('Error:', error);
    });

    directoriesData = await response.json()

    if(writeCard == true) {
        for(i=0; i<directoriesData.length; i++) {
            createFolderCard(directoriesData[i])
        }
        return directoriesData
    } 
    // Auto reload folder cards
    else {
        folderCards = document.getElementsByClassName("folder list")
        folderCardIds = []
        for(i=0; i<folderCards.length; i++) {
            folderCardIds.push(folderCards[i].id)
        }
        j = []
        for(i=0; i<directoriesData.length; i++) {
            if(document.getElementById(directoriesData[i]["hash"]) != null) {
                j.push(i - j.length)
            }
        }
        for(i=0; i<j.length; i++) {
            folderCardIds.splice(folderCardIds.indexOf(directoriesData[j[i]]["hash"]), 1);
            directoriesData.splice(j[i], 1)
        }
        for(i=0; i<directoriesData.length; i++) {
            createFolderCard(directoriesData[i])
        }
        for(i=0; i<folderCardIds.length; i++) {
            document.getElementById(folderCardIds[i]).parentElement.removeChild(document.getElementById(folderCardIds[i]))
        }
    }
}

function createFolderCard(data) {
    folderCardHolder = document.querySelector("div.folder.cards")

    folderListDiv = document.createElement("div")
    folderListDiv.setAttribute("class", "folder list")
    folderListDiv.setAttribute("id", data["hash"])

    dir1 = document.createElement("h3")
    dir1.setAttribute("class", "folder text folder1")
    dir1.textContent = data["sourceDir"]

    deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "folder buttons deleteButton")
    deleteButton.setAttribute("onmousedown", "deleteButtonFunction(this.parentNode.id)")

    deleteButtonImg = document.createElement("img")
    deleteButtonImg.setAttribute("id", "delete-button-icon")
    deleteButtonImg.setAttribute("src", "assets/material-icons/delete.svg")
    deleteButtonImg.setAttribute("alt", "delete button")
    deleteButtonImg.setAttribute("width", "20px")
    deleteButtonImg.setAttribute("height", "20px")

    deleteButton.appendChild(deleteButtonImg)

    copiesToText = document.createElement("p")
    copiesToText.setAttribute("class", "folder text")
    copiesToText.textContent = "copies to"

    backupButton = document.createElement("button")
    backupButton.setAttribute("class", "folder buttons backupButton")

    backupButtonImg = document.createElement("img")
    backupButtonImg.setAttribute("id", "backup-button-icon")
    backupButtonImg.setAttribute("src", "assets/material-icons/backup.svg")
    backupButtonImg.setAttribute("alt", "backup button")
    backupButtonImg.setAttribute("width", "20px")
    backupButtonImg.setAttribute("height", "20px")

    backupButton.appendChild(backupButtonImg)

    dir2 = document.createElement("h3")
    dir2.setAttribute("class", "folder text folder2")
    dir2.textContent = data["destinationDir"]
    
    folderListDiv.appendChild(dir1)
    folderListDiv.appendChild(deleteButton)
    folderListDiv.appendChild(copiesToText)
    folderListDiv.appendChild(backupButton)
    folderListDiv.appendChild(dir2)

    folderCardHolder.appendChild(folderListDiv)
}

/*
<div class="folder list">
    <h3 class="folder text folder1">data["sourceDir"]</h3>
    <button class="folder buttons deleteButton"> 
        <img id="delete-button-icon" src="assets/material-icons/delete.svg" alt="delete button" width="20px" height="20px" />
    </button>
    <p class="folder text">copies to</p>
    <button class="folder buttons backupButton"> 
        <img id="backup-button-icon" src="assets/material-icons/backup.svg" alt="backup button" width="20px" height="20px" />
    </button>
    <h3 class="folder text folder2">data["destinationDir"]</h3>
</div>
*/

getFolders(true)


// Check for the autoreload switch in options

var reloadFoldersInterval = setInterval(function() {getFolders()}, 1000)
const reloadFoldersToggle = document.querySelector('.reloadFolders-switch input[type="checkbox"]');
reloadFoldersToggle.checked = true;

function changeReloadFolders(data) {
    if(data["reloadFolders"] == "True"){
        reloadFoldersInterval = setInterval(function() {getFolders()}, 1000)
        reloadFoldersToggle.checked = true
    }
    else if(data["reloadFolders"] == "False") {
        clearInterval(reloadFoldersInterval)
        reloadFoldersToggle.checked = false
    }
}

function reloadFolders(input) {
    if (input.target.checked) {
        reloadFoldersInterval = setInterval(function() {getFolders()}, 1000)
        putOptions({"reloadFolders": "True"})
    }
    else {
        clearInterval(reloadFoldersInterval)
        putOptions({"reloadFolders": "False"})
    }
}

reloadFoldersToggle.addEventListener('change', reloadFolders, false);