var data = {}
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
    }
}

function createFolderCard(data) {
    folderCardHolder = document.querySelector("div.folder.cards")

    folderListDiv = document.createElement("div")
    folderListDiv.setAttribute("class", "folder list")

    dir1 = document.createElement("h3")
    dir1.setAttribute("class", "folder text folder1")
    dir1.textContent = data["sourceDir"]

    deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "folder buttons deleteButton")

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
    <h3 class="folder text folder1">test</h3>
    <button class="folder buttons deleteButton"> 
        <img id="delete-button-icon" src="assets/material-icons/delete.svg" alt="delete button" width="20px" height="20px" />
    </button>
    <p class="folder text">copies to</p>
    <button class="folder buttons backupButton"> 
        <img id="backup-button-icon" src="assets/material-icons/backup.svg" alt="backup button" width="20px" height="20px" />
    </button>
    <h3 class="folder text folder2">test2</h3>
</div>
*/

// const getFoldersPromise = new Promise((resolve, reject) => {
//       resolve(getFolders());
// });

// getFoldersPromise
//     .then((data) => {
//         console.log(data)
//         console.log(directoriesData)
//         // for(i=0; i<directoriesData[0].length; i++) {
//         //     createFolderCard(directoriesData[0][i])
//         //     console.log(directoriesData[0][i])
//         // }
//     })
//     .catch((error) => {
//         console.error(error)
//     })
    
getFolders(true)