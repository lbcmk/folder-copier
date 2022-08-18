var optionsData = {};

function getOptions() {
  fetch('/options')
    .then((response) => response.json())
    .then((data) => {
      changeTheme(data)
      optionsData = data
    }); 
}

function putOptions() {
  fetch('/options', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}