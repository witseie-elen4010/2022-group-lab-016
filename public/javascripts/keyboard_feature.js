'use strict'

let SCREEN_CURSOR = 0;
const BUTTON_LENGTH = 5;
const NUMBER_OF_BUTTONS = 30;
let SUBMIT = false;
let DELETE = false;
const BUTTONS = [];
const GUESSES = 6;
let guesses_left = GUESSES;
let game_over = false;
let myscreenColor = [];
let wins = false;
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

const wordBase = ['BRIAN', 'BRAIN', 'HINGE', 'ABUSE', 'ABOUT', 'ADOPT', 'ACUTE', 'ADMIT'];
const correctWord = wordBase[Math.floor(Math.random() * wordBase.length)];
const game_buttons = Array.from(document.getElementsByClassName('button'));

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
        get_element_function(i).style.animation =  'mymove 1s 1 linear forwards ' + String(n) + 's'
        BUTTONS[n].style.backgroundColor = 'rgba(106, 170, 100, 255)';
        correct_word = correct_word.slice(0, k) +' '+ correct_word.slice(k + 1 , correct_word.length);
        myscreenColor[n] ='1';
        break;
      } else if (correct_word[k] === element) {
        get_element_function(i).style.animation = 'mymove2 1s 1 linear forwards ' + String(n) + 's'
        BUTTONS[n].style.backgroundColor = 'rgba(201, 180, 88, 255)';
        correct_word = correct_word.slice(0, k) +' '+ correct_word.slice(k + 1 , correct_word.length);
        myscreenColor[n] ='2';
        break;
      } else {
        get_element_function(i).style.animation = 'mymove3 1s 1 linear forwards ' + String(n) + 's'
        BUTTONS[n].style.backgroundColor = 'rgba(120, 124, 126, 255)';
        myscreenColor[n] ='3';
      }
    }
    n++;
  }
  // if it is multiplayer mode, submit the word to the other user. else submit to nothing
      sendMessage(myscreenColor.join(''));
  // Winning or losing game
  if (guess_word === correctWord) {
    toastr.success("You guessed Correctly! Game Over!");
    update_score(guesses_left);
    wins = true;
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
  const text = 'Not enough letters';
  pop_up.innerText = text;
  pop.appendChild(pop_up);
  setTimeout(function(){
      pop.removeChild(pop.firstChild);
  }, 1000)
}

let monitorKeyPressed = function(element, button){
  switch (element) {
    case 'ENTER':
      // allow the user to submit guesses
      if ((SCREEN_CURSOR) % BUTTON_LENGTH === 0 && SCREEN_CURSOR !== 0){
        review_answer();
        BUTTONS.splice(0, BUTTONS.length);
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
        BUTTONS.pop();
        DELETE = true;
       }
      break
    default:
      // enter characters on the screen 
      if ((SCREEN_CURSOR % BUTTON_LENGTH !== 0 || SUBMIT === true || SCREEN_CURSOR === 0) && SCREEN_CURSOR < NUMBER_OF_BUTTONS) {
        if(!(DELETE || SUBMIT)) SCREEN_CURSOR++;
        get_element_function(SCREEN_CURSOR).innerText = element;
        BUTTONS.push(button);
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

let print_score= function(){
  const guess_1 = document.getElementById('guess-1');
  const guess_2 = document.getElementById('guess-2');
  const guess_3 = document.getElementById('guess-3');
  const guess_4 = document.getElementById('guess-4');
  const guess_5 = document.getElementById('guess-5');
  const guess_6 = document.getElementById('guess-6');

  guess_1.innerHTML = Number(localStorage.getItem('bar-1'));
  guess_2.innerHTML = Number(localStorage.getItem('bar-2'));
  guess_3.innerHTML = Number(localStorage.getItem('bar-3'));
  guess_4.innerHTML = Number(localStorage.getItem('bar-4'));
  guess_5.innerHTML = Number(localStorage.getItem('bar-5'));
  guess_6.innerHTML = Number(localStorage.getItem('bar-6'));
}

let update_score= function(element){

 if(element==6){
  var scored = Number(localStorage.getItem('bar-1'));
  localStorage.setItem('bar-1',++scored);
 }else if(element==5){
  var scored = Number(localStorage.getItem('bar-2'));
   localStorage.setItem('bar-2',++scored);  
 }else if(element==4){
  var scored = Number(localStorage.getItem('bar-3'));
   localStorage.setItem('bar-3',++scored);  
 }else if(element==3){
  var scored = Number(localStorage.getItem('bar-4'));
   localStorage.setItem('bar-4',++scored);  
 }else if(element==2){
  var scored = Number(localStorage.getItem('bar-5'));
   localStorage.setItem('bar-5',++scored); 
 }else if(element==1){
  var scored = Number(localStorage.getItem('bar-6'));
   localStorage.setItem('bar-6',++scored); 
 }
}

let guess_distro = function(){
  const arr = [];
  for (let i = 0; i < 6; i++){
   arr[i] = Number(localStorage.getItem(`bar-${i+1}`));
  }
   console.log(arr);
  let max = Math.max(...arr);
  for (let i = 0; i < GUESSES; i++) {
    let len = (arr[i]/max)*100;
   // console.log(len);
    if (len > 7){
      if (len == 100){
        document.getElementById(`bar-${i+1}`).style.width = `${len}%`;
        document.getElementById(`bar-${i+1}`).style.backgroundColor = 'green';
      }else{
       document.getElementById(`bar-${i+1}`).style.width = `${len}%`;
      }
    }else{
     document.getElementById(`bar-${i+1}`).style.width = '7%'
    }
  }
  return;
}
const statistics = function(element){
  const winner = document.getElementById('win');
  const played = document.getElementById('played');
  const curr_streak = document.getElementById('streak');
  const max = document.getElementById('max');
  const reset = 0;
  var win = Number(localStorage.getItem('wins'));
  var streak = Number(localStorage.getItem('streak'));
  var loss = Number(localStorage.getItem('loss'));
  //console.log(win,streak,loss);
  if(element){
    localStorage.setItem('wins',++win);
    localStorage.setItem('streak',++streak);
  }else{
    localStorage.setItem('streak',reset)
    localStorage.setItem('loss',++loss);
    }
  if (Number(localStorage.getItem('max'))<streak){
    localStorage.setItem('max',streak);
  }
//  console.log(win,streak,loss);
  let total = win + loss;
 // console.log(total);
  played.innerHTML = `${total}`;
  winner.innerHTML = `${(win/total)*100}`;
  curr_streak.innerHTML = `${streak}`;
  max.innerHTML = localStorage.getItem('max');

}

const stats_init= function(){
  const winner = document.getElementById('win');
  const played = document.getElementById('played');
  const curr_streak = document.getElementById('streak');
  const max = document.getElementById('max');
  played.innerHTML = `${Number(localStorage.getItem('loss'))+Number(localStorage.getItem('wins'))}`;
  winner.innerHTML = `${(Number(localStorage.getItem('wins'))/(Number(localStorage.getItem('loss'))+Number(localStorage.getItem('wins'))))*100}`;
  curr_streak.innerHTML = localStorage.getItem('max');
  max.innerHTML = localStorage.getItem('max');
  return;
}

document.addEventListener('keyup',(e)=>{
  if (game_over) {
    statistics(wins);
    print_score();
    guess_distro();
    return;
  }
})

document.addEventListener('DOMContentLoaded', () => {
  stats_init();
  print_score();
  guess_distro();
})