'use strict'

let SCREEN_CURSOR = 0
const BUTTON_LENGTH = 5

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

        break
      case 'DEL':
          get_element_function(SCREEN_CURSOR).innerText = '\xa0'
          SCREEN_CURSOR--
        break
      default:
          SCREEN_CURSOR++
          get_element_function(SCREEN_CURSOR).innerText = element
        break
    }
  })
})
