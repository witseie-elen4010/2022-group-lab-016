

document.addEventListener('DOMContentLoaded', () => {
  const numberOfGridEntries = 30
  createSquares()
  function createSquares () {
    const gameBoard = document.getElementById('checkerboard')

    for (let i = 0; i < numberOfGridEntries; i++) {
      const square = document.createElement('div')
      square.classList.add('square')
      square.setAttribute('id', i + 1)
      gameBoard.appendChild(square)
    }
  }
})

