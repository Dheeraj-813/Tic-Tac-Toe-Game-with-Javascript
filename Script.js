// Accessing all element of game.........
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainter = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Let decide the turn first......

let turnO = true //turn of O or turn of X

// Now for this game check the Winning pattern.......

const winningPatterns = [[0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6],
                    ];

// Working for reset Button as well as New game button........

const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainter.classList.add("hide");
}

// For each individual box we have to add some action using event listener...............

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
        // for turn of O
        if(turnO){
            box.innerText = "O";
            turnO = false; // Next time turn O will not allowed.
        } else {
            box.innerText = "X";
            turnO = true; // Next time turn O will allowed.
        }
        box.disabled = true;

        checkWinner(); // To check winner of the game.
    });
});

//disbled all boxes after winner is declared....
const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

//Enable all boxes after new game....
const enabledBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

// Winner message display...
const showWinnerMsg = (winner) => {
    msg.innerText = `Congratulation, ${winner} is the Winner....!`
    msgContainter.classList.remove("hide");
    disabledBoxes();
};

// Working of checkWinner() function...
const checkWinner = () => {
    for(let pattern of winningPatterns){
        let pos1val = boxes[pattern[0]].innerText;// check individual position inside 2D array with its value.
        let pos2val = boxes[pattern[1]].innerText;// check individual position inside 2D array with its value.
        let pos3val = boxes[pattern[2]].innerText;// check individual position inside 2D array with its value.
        if(pos1val != "" && pos2val != "" && pos3val != ""){ // To check for blank boxes.
            if(pos1val === pos2val && pos2val === pos3val){// To check all boxes should have same value.
                console.log(`${pos1val} is the winner of game.....!`);
                showWinnerMsg(pos1val);
            }
        }
    }
};

// reset game function calling....
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);