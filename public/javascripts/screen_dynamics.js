'use strict'

let SCREEN_CURSOR = 0
const BUTTON_LENGTH = 5
let SUBMIT = false
let DELETE = false
const correctWord = 'BRIAN'
const BUTTONS = []

const game_buttons = Array.from(document.getElementsByClassName('button'))

const get_element_function = function (value) {
  const element = String(value)
  return document.getElementById(element)
}

const review_answer = function () {
    let n = 0
    const startReviewPos = SCREEN_CURSOR - (BUTTON_LENGTH - 1)

    for (let i = startReviewPos; i <= SCREEN_CURSOR; i++) {
      const element = get_element_function(i).innerText
  
      for (let k = 0; k < correctWord.length; k++) {
        if (correctWord[k] === element && n === k) {
          get_element_function(i).style.backgroundColor = 'rgba(106, 170, 100, 255)'
          BUTTONS[n].style.backgroundColor = 'rgba(106, 170, 100, 255)'
          break
        } else if (correctWord[k] === element) {
          get_element_function(i).style.backgroundColor = 'rgba(201, 180, 88, 255)'
          BUTTONS[n].style.backgroundColor = 'rgba(201, 180, 88, 255)'
          break
        } else {
          get_element_function(i).style.backgroundColor = 'rgba(120, 124, 126, 255)'
          BUTTONS[n].style.backgroundColor = 'rgba(120, 124, 126, 255)'
        }
      }
      n++
    }
  }

game_buttons.map(button => {
  button.addEventListener('click', (e) => {
    const element = e.target.innerText

    switch (element) {
      case 'ENTER':
          if (SCREEN_CURSOR % BUTTON_LENGTH === 0 && SCREEN_CURSOR !== 0) {
            review_answer()  
            BUTTONS.splice(0, BUTTONS.length)
            SUBMIT = true
            SCREEN_CURSOR++
         }
        break
      case 'DEL':
          get_element_function(SCREEN_CURSOR).innerText = '\xa0'
          BUTTONS.pop()
          if ((SCREEN_CURSOR - 1) % BUTTON_LENGTH !== 0) {
             SCREEN_CURSOR--
          } else DELETE = true
        break
      default:
        if (SCREEN_CURSOR % BUTTON_LENGTH !== 0 || SUBMIT === true || SCREEN_CURSOR === 0) {
           if (!(DELETE || SUBMIT)) SCREEN_CURSOR++
           get_element_function(SCREEN_CURSOR).innerText = element
           BUTTONS.push(button)
           SUBMIT = false
           DELETE = false
        }
        break
    }
  })
})
