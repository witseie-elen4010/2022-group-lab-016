'use strict'

let SCREEN_CURSOR = 0
const BUTTON_LENGTH = 5

const game_buttons = Array.from(document.getElementsByClassName('button'));

const get_element_function = function (value) {
  const element = String(value);
  return document.getElementById(element);
}

game_buttons.map(button => {
  button.addEventListener('click', (e) => {

    const element = e.target.innerText;

    switch (element) {
      case 'ENTER':
        // allow the user to submit guesses
        break
      case 'DEL':
        // allow the user to delete some elements
        get_element_function(SCREEN_CURSOR).innerText = '\xa0';
         if (SCREEN_CURSOR > 0) {
             SCREEN_CURSOR--;
         } 
        break
      default:
        // enter characters on the screen 
        if (SCREEN_CURSOR <  30) {
          SCREEN_CURSOR++;
          get_element_function(SCREEN_CURSOR).innerText = element;
       }
        break
    }
  })
})