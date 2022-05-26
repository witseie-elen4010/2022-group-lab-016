'use strict'

const game_buttons = Array.from(document.getElementsByClassName('button'));

game_buttons.map(button => {
  button.addEventListener('click', (e) => {

    const element = e.target.innerText;

    switch (element) {
      case 'ENTER':
        // allow the user to submit guesses
        break
      case 'DEL':
        // allow the user to delete some elements
        break
      default:
        // enter characters on the screen 
        break
    }
  })
})