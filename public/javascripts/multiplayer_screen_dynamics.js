
let OPPONENT_SCREEN_START = 31
let OPPONENT_SCREEN_END = 60 

let updateOpponentScreen = function(opponentGuess){
    let n = 0;
    for( let i = OPPONENT_SCREEN_START; i <= OPPONENT_SCREEN_END; i++){
      if(opponentGuess[n] === '1'){
        get_element_function('board' + (i - 1)).style.animation =  'mymove 1s 1 linear forwards ' + String(1.5*(n + 1)) + 's'
      }
      else if (opponentGuess[n] === '2'){
        get_element_function('board' + (i - 1)).style.animation =  'mymove2 1s 1 linear forwards ' + String(1.5*(n + 1)) + 's'
      }
      else{
        get_element_function('board' + (i - 1)).style.animation =  'mymove3 1s 1 linear forwards ' + String(1.5*(n + 1)) + 's'
      }
      if((i % BUTTON_LENGTH) === 0) break;
      n++;
    }
    OPPONENT_SCREEN_END += 5;
    OPPONENT_SCREEN_START += 5;
}