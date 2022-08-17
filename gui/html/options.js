const data = {username: 'example'};

function getOptions() {
  fetch('/options')
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function putOptions() {
  fetch('/options', {
    method: 'PUT', // or 'PUT'
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