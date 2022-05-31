'use strict'

let SCREEN_CURSOR = 0;
const BUTTON_LENGTH = 5;
let SUBMIT = false;
let DELETE = false;
const game_buttons = Array.from(document.getElementsByClassName('button'));

const get_element_function = function (value) {
  const element = String(value);
  return document.getElementById(element);
}

let monitorKeyPressed = function(element){

  switch (element) {
    case 'ENTER':
      // allow the user to submit guesses
      if ((SCREEN_CURSOR) % 5 === 0 && SCREEN_CURSOR !== 0){
        SUBMIT = true;
        SCREEN_CURSOR++;
      }
      break
    case 'DEL':
      // allow the user to delete some elements
      get_element_function(SCREEN_CURSOR).innerText = '\xa0';
       if ((SCREEN_CURSOR - 1) % 5 !== 0) {
           SCREEN_CURSOR--;
       } else DELETE = true
      break
    default:
      // enter characters on the screen 
      if ((SCREEN_CURSOR % 5 !== 0 || SUBMIT === true || SCREEN_CURSOR === 0) && SCREEN_CURSOR < 30) {
        if(!(DELETE || SUBMIT)) SCREEN_CURSOR++;
        get_element_function(SCREEN_CURSOR).innerText = element;
        SUBMIT = false;
        DELETE = false;
     }
      break
  }
}

game_buttons.map(button => {
  button.addEventListener('click', (e) => {
   const element = e.target.innerText;
   monitorKeyPressed(element);
  })
})

let getButton = function(element){
  if(element === 'Backspace') element = 'DEL';

  element = element.toUpperCase();
  game_buttons.forEach( function(button){
     const keyboard_element = button.name.toUpperCase();
     if(element === keyboard_element){
        monitorKeyPressed(element);
     }
  })
}
document.addEventListener('keydown', function(event){
  getButton(event.key);
})
