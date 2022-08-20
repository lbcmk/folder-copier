var optionsData = {};

// Get a JSON response of options inside preferences/options.json
function getOptions() {
  fetch('/options')
    .then((response) => response.json())
    .then((data) => {
      changeTheme(data)
      changeReloadFolders(data)
      optionsData = data
    }); 
}

// Change an option
function putOptions(option) {
  fetch('/options', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(option)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function for the Settings "cog" button in the navbar/top bar 
function settingsButtonFunction() {
  document.querySelector("div#options-window").style.display = ""
  document.querySelector("div#options-window").style.animation = "fadeIn 1s"
  if (window.matchMedia("(min-width: 600px)").matches) {
    document.querySelector("div#options-tab").style.animation = "dropDown1 0.75s"
  } else {
      document.querySelector("div#options-tab").style.animation = "dropDown2 1s"
  }
  disableScroll()
}

function closeSettingsButtonFunction() {
  document.querySelector("div#options-window").style.display = "none"
  enableScroll()
}

document.querySelector("div#options-window").style.display = "none" // Hide the options tab
getOptions() // Autorun options so it automatically sets everything