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
document.addEventListener("DOMContentLoaded", ()=> {
    createSquares();
    function createSquares() {
        const gameBoard= document.getElementById("checkerboard_2");

        for (let i=30; i<60; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", i+1);
            gameBoard.appendChild(square);
        }
    }
})