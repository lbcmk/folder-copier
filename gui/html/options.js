var optionsData = {};

function getOptions() {
  fetch('/options')
    .then((response) => response.json())
    .then((data) => {
      changeTheme(data)
      optionsData = data
    }); 
}

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

document.querySelector("div#options-window").style.display = "none"
getOptions()