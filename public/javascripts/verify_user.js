const form = document.getElementById('userinfo-form')
form.addEventListener('submit', login)

async function login(event) {
  event.preventDefault()
  const username = document.getElementById('username').value
  //const password = document.getElementById('password').value

  const result = await fetch('/verify_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username
      //password
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {
    // everythign went fine
    console.log('Got the token: ', result.data)
    localStorage.setItem('token', result.data)
    window.location.replace("reset_password");
  } else {
    alert(result.error)
  }
}