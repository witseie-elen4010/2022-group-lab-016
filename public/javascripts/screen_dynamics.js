'use strict'

let SCREEN_CURSOR = 0
const BUTTON_LENGTH = 5
let SUBMIT = false
let DELETE = false

const game_buttons = Array.from(document.getElementsByClassName('button'))

const get_element_function = function (value) {
  const element = String(value)
  return document.getElementById(element)
}


game_buttons.map(button => {
  button.addEventListener('click', (e) => {
    const element = e.target.innerText

    switch (element) {
      case 'ENTER':
          if (SCREEN_CURSOR % BUTTON_LENGTH === 0 && SCREEN_CURSOR !== 0) {
              SUBMIT = true
              SCREEN_CURSOR++
         }
        break
      case 'DEL':
          get_element_function(SCREEN_CURSOR).innerText = '\xa0'
          if ((SCREEN_CURSOR - 1) % BUTTON_LENGTH !== 0) {
             SCREEN_CURSOR--
          } else DELETE = true
        break
      default:
        if (SCREEN_CURSOR % BUTTON_LENGTH !== 0 || SUBMIT === true || SCREEN_CURSOR === 0) {
           if (!(DELETE || SUBMIT)) SCREEN_CURSOR++
           get_element_function(SCREEN_CURSOR).innerText = element
           SUBMIT = false
           DELETE = false
        }
        break
    }
  })
})
