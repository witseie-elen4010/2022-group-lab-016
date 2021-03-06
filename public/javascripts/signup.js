const form = document.getElementById('reg-form')
form.addEventListener('submit', registerUser)

async function registerUser(event) {
  event.preventDefault()

  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const result = await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

      username,
      password
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {
    // everythign went fine
    alert('Success')
    window.location.href = "/";

  } else {
    alert(result.error)
  }
}

function onSignIn(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
  console.log(error);
}