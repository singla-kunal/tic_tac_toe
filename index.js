const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
 
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pe bhi empty krna pdega
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //initialize box with css properties again
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player -${currentPlayer}`;
}
initGame();
function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}
function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") &&
        (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ) {
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";
            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if (answer !== "") {
        gameInfo.innerText = `Winner is - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    //game tied!
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active"); 
    }
}
function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap
        swapTurn();
        //check if game is over or not
        checkGameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});
newGameBtn.addEventListener("click", initGame);