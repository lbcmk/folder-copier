// Function for the delete button
function deleteButtonFunction(selfID) {

    document.querySelector("button.delete-yes-button").setAttribute("id", selfID)

    document.querySelector("div#delete-window").style.display = ""
    document.querySelector("div#delete-window").style.animation = "fadeIn 1s"
    if (window.matchMedia("(min-width: 600px)").matches) {
        document.querySelector("div#delete-tab").style.animation = "dropDown1 0.75s"
    } else {
        document.querySelector("div#delete-tab").style.animation = "dropDown3 1s"
    }
    disableScroll()
}

function closeDeleteButtonFunction() {
  document.querySelector("div#delete-window").style.display = "none"
  document.querySelector("button.delete-yes-button").setAttribute("id", "")
  enableScroll()
}

document.querySelector("div#delete-window").style.display = "none" // Hide the delete tab

function runDeleteFolders(selfID) {
    fetch('/deletefolder', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({"deleteHash": selfID})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
    })
      .catch((error) => {
        console.error('Error:', error);
    });
}

function yesDeleteButtonFunction(selfID) {
    runDeleteFolders(selfID)
    getFolders()
    closeDeleteButtonFunction()
}