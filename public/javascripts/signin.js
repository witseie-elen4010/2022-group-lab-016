const form = document.getElementById('signin-form')
form.addEventListener('submit', login)

async function login(event) {
  event.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  const result = await fetch('/', {
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
    console.log('Got the token: ', result.data)
    localStorage.setItem('token', result.data)
    window.location.href = "/screen";
    //check if remeber me checkbox is checked
    const cb = document.getElementById('remember-me')
    if(cb.checked === true){
      //create cookies
    }
  } else {
    alert(result.error)
  }
}

if (window.history && history.pushState) {
  addEventListener('load', function () {
    history.pushState(null, null, null);
    addEventListener('popstate', function () {
      history.pushState(null, null, null);
    });
  });
}

function onSignIn(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
  console.log(error);
}
