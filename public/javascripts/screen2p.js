document.addEventListener("DOMContentLoaded", ()=> {
    createSquares();
    function createSquares() {
        const gameBoard= document.getElementById("checkerboard");

        for (let i=0; i<30; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", i+1);
            gameBoard.appendChild(square);  
        }
    }
})

function addBoard(username){
    let count = Number(sessionStorage.getItem('count'))
    const list = document.getElementById('boardList')
    //item to add to the list
    let newBoard = document.createElement('li')
    newBoard.setAttribute('class', 'mx-5 pt-0')
    //list items
    let paragraph = document.createElement('p')
    paragraph.setAttribute('class', 'text-white d-flex flex-row justify-content-center align-text-center')
    let text = document.createTextNode(username)
    paragraph.appendChild(text)
    let board_container = document.createElement('div')
    board_container.setAttribute('id', 'board-container')
    let checker = document.createElement('div')
    checker.setAttribute('class', 'pb-2')
    checker.setAttribute('id',`checkerboard_${count}`)
    checker.setAttribute('style', 'display: grid; grid-template-columns: repeat(5, 1fr); grid-gap: 5px; padding: 10px; box-sizing: border-box; float:right ;')
    //append all the list elements
    newBoard.appendChild(paragraph)
    newBoard.appendChild(board_container)
    newBoard.appendChild(checker)
    //append new list element to the list
    list.appendChild(newBoard)


    const gameBoard= document.getElementById(`checkerboard_${count}`);
    n = localStorage.getItem('n');
    for (let i=30; i<60; i++){
        let square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id",'board' + n);
        gameBoard.appendChild(square);
        n++;
    }
    sessionStorage.setItem('count', ++count);
    localStorage.setItem('n', n);
  }
