'use strict'

let SCREEN_CURSOR = 0;
const BUTTON_LENGTH = 5;
const NUMBER_OF_BUTTONS = 30;
let SUBMIT = false;
let DELETE = false;
const BUTTONS = [];
const wordBase = ['BRIAN', 'BRAIN', 'HINGE', 'ABUSE', 'ABOUT', 'ADOPT', 'ACUTE', 'ADMIT'];
const correctWord = wordBase[Math.floor(Math.random() * wordBase.length)];
const game_buttons = Array.from(document.getElementsByClassName('button'));
const GUESSES = 6;
let guesses_left = GUESSES;
let game_over = false;

//toastr
toastr.options = {
  "closeButton": true,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-bottom-full-width",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "9000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

const get_element_function = function (value) {
  const element = String(value);
  return document.getElementById(element);
}
// review the answer submited by the user
 const review_answer = function () {
  let n = 0;
  let correct_word = correctWord;
  let guess_word = '';
  for (let i = (SCREEN_CURSOR - (BUTTON_LENGTH - 1)); i <= SCREEN_CURSOR; i++) {
    const element = get_element_function(i).innerText;
    guess_word += element; 
    for (let k = 0; k < correct_word.length; k++) {
      if (correct_word[k] === element && n === k) {
      
        get_element_function(i).style.backgroundColor = 'rgba(106, 170, 100, 255)';
        BUTTONS[n].style.backgroundColor = 'rgba(106, 170, 100, 255)';
        correct_word = correct_word.slice(0, k) +' '+ correct_word.slice(k + 1 , correct_word.length);

        break;
      } else if (correct_word[k] === element) {

        get_element_function(i).style.backgroundColor = 'rgba(201, 180, 88, 255)';
        BUTTONS[n].style.backgroundColor = 'rgba(201, 180, 88, 255)';
        correct_word = correct_word.slice(0, k) +' '+ correct_word.slice(k + 1 , correct_word.length);
        break;
      } else {

        get_element_function(i).style.backgroundColor = 'rgba(120, 124, 126, 255)'
        BUTTONS[n].style.backgroundColor = 'rgba(120, 124, 126, 255)';
      }
    }
    n++;
  }
  // Winning or losing game
  if (guess_word === correctWord) {
    toastr.success("You guessed Correctly! Game Over!");
    game_over = true;
    return;
  } else{
    guesses_left--;
    if (guesses_left === 0){
      toastr.error("You're out of guesses! Game Over!");
      game_over = true;
      return
    }
  }
  
  
}


let prompt_user = function(){
  const pop_up = document.createElement('div');
  pop_up.setAttribute('id','popMessage');
  const pop = document.getElementById('pop');
  const text = 'Not enough letters'
  pop_up.innerText = text;
  pop.appendChild(pop_up);
  setTimeout(function(){
      pop.removeChild(pop.firstChild)
  }, 1000)
}

let monitorKeyPressed = function(element, button){


  switch (element) {
    case 'ENTER':
      // allow the user to submit guesses
      if ((SCREEN_CURSOR) % BUTTON_LENGTH === 0 && SCREEN_CURSOR !== 0){
        review_answer()
        BUTTONS.splice(0, BUTTONS.length)
        SUBMIT = true;
        SCREEN_CURSOR++;
        break;
      }
      // if the buttons are not enough, prompt user
      prompt_user() 
      break;
    case 'DEL':
      // allow the user to delete some elements
      get_element_function(SCREEN_CURSOR).innerText = '\xa0';

       if ((SCREEN_CURSOR - 1) % BUTTON_LENGTH !== 0) {
           SCREEN_CURSOR--;
       } else{
        BUTTONS.pop() 
        DELETE = true
       }
      break
    default:
      // enter characters on the screen 
      if ((SCREEN_CURSOR % BUTTON_LENGTH !== 0 || SUBMIT === true || SCREEN_CURSOR === 0) && SCREEN_CURSOR < NUMBER_OF_BUTTONS) {
        if(!(DELETE || SUBMIT)) SCREEN_CURSOR++;
        get_element_function(SCREEN_CURSOR).innerText = element;
        BUTTONS.push(button)
        SUBMIT = false;
        DELETE = false;
     }

      break
  }
}

game_buttons.map(button => {
  button.addEventListener('click', (e) => {

   const element = e.target.innerText;
   monitorKeyPressed(element, button);

  })
})

let getButton = function (element) {
  if (element === 'Backspace') element = 'DEL';

  element = element.toUpperCase();

  game_buttons.forEach( function(button){
     const keyboard_element = button.name.toUpperCase();
     if(element === keyboard_element){
        monitorKeyPressed(element, button);
     }

  })
}
document.addEventListener('keydown', function (event) {
  getButton(event.key);
});



