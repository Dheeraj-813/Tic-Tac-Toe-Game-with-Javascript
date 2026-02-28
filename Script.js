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
            // change color of O
            box.style.color = "green";
            turnO = false; // Next time turn O will not allowed.
        } else {
            box.innerText = "X";
            // change color of X
            box.style.color = "red";
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

// Draw message display...
const showDrawMsg = () => {
    msg.innerText = `Game is draw....!`
    msgContainter.classList.remove("hide");
    disabledBoxes()
}


// Working of checkWinner() function...
const checkWinner = () => {
    
        let winnerFound = false;
    
        for (let pattern of winningPatterns) {
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;
    
            if (pos1val != "" && pos2val != "" && pos3val != "") {
                if (pos1val === pos2val && pos2val === pos3val) {
                    showWinnerMsg(pos1val);
                    winnerFound = true;
                    return;
                }
            }
        }
    
        // Only check for draw if no winner is found
            let allBoxFilled = true;
            for (let box of boxes) {
                if (box.innerText === "") {
                    allBoxFilled = false;
                    break;
                }
            }
            if (!winnerFound && allBoxFilled) {
                showDrawMsg();
            }
        
    };


// reset game function calling....
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);