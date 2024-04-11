const container = document.getElementById("container");
const box = document.getElementsByClassName("box");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn")
const status = document.getElementById("status");
const title = document.getElementById("title")

let boxArray = Array.from(box);
// let playRounds = 8;
console.log(boxArray)
// const emptyBoxes = boxArray.filter(box => box.textContent === "");

container.addEventListener("click", xPlays);
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetBoard)

//function of X player or player 1
function xPlays(event) {
    console.log("x plays")
    if (event.target.matches(".box")) {
        // console.log("box clicked")
        let winner = checkWinner()
        const x = event.target.getAttribute("data-state-x")
        if (event.target.textContent === "X" || event.target.textContent === "O") {
            return;
        } else {
            event.target.textContent = x;
            // playRounds--;
            if (winner !== "X") {
                computerPlays();
            }
            // checkWinner()
            gameStatus();
        }
    }
}

//function for computer plays
function computerPlays() {
    console.log("computer plays now")
    //array of empty content for .box
    const emptyBoxes = boxArray.filter(box => box.textContent === "");
    console.log("Empty boxes: ", emptyBoxes)
    let winner = checkWinner()
    if (winner === "X") {
        return;
    }
    setTimeout(() => {
        // let winner = checkWinner()
        if (emptyBoxes.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
            const o = emptyBoxes[randomIndex].getAttribute("data-state-o");
            emptyBoxes[randomIndex].textContent = o;
            emptyBoxes[randomIndex].style.backgroundColor = "orange";
            gameStatus()
            // playRounds--;
        }
    }, 1000);

}

//function to get the boxes displayed to play
function startGame(event) {
    container.classList.remove("hidden");
    resetBtn.classList.remove("hidden")
    title.remove()
    startBtn.remove()
    status.textContent = "Game started";
    //if you want the computer plays first uncomment below function
    // computerPlays();
}

//function to check who is the winner based the game's logics
function checkWinner() {
    if (

        boxArray[0].textContent === "O" && boxArray[3].textContent === "O" && boxArray[6].textContent === "O" ||
        boxArray[0].textContent === "O" && boxArray[1].textContent === "O" && boxArray[2].textContent === "O" ||
        boxArray[1].textContent === "O" && boxArray[4].textContent === "O" && boxArray[7].textContent === "O" ||
        boxArray[2].textContent === "O" && boxArray[5].textContent === "O" && boxArray[8].textContent === "O" ||
        boxArray[3].textContent === "O" && boxArray[4].textContent === "O" && boxArray[5].textContent === "O" ||
        boxArray[6].textContent === "O" && boxArray[7].textContent === "O" && boxArray[8].textContent === "O" ||
        boxArray[2].textContent === "O" && boxArray[4].textContent === "O" && boxArray[6].textContent === "O" ||
        boxArray[0].textContent === "O" && boxArray[4].textContent === "O" && boxArray[8].textContent === "O"
    ) {
        return "O";
    } else if (
        boxArray[0].textContent === "X" && boxArray[1].textContent === "X" && boxArray[2].textContent === "X" ||
        boxArray[1].textContent === "X" && boxArray[4].textContent === "X" && boxArray[7].textContent === "X" ||
        boxArray[2].textContent === "X" && boxArray[5].textContent === "X" && boxArray[8].textContent === "X" ||
        boxArray[3].textContent === "X" && boxArray[4].textContent === "X" && boxArray[5].textContent === "X" ||
        boxArray[6].textContent === "X" && boxArray[7].textContent === "X" && boxArray[8].textContent === "X" ||
        boxArray[2].textContent === "X" && boxArray[4].textContent === "X" && boxArray[6].textContent === "X" ||
        boxArray[0].textContent === "X" && boxArray[4].textContent === "X" && boxArray[8].textContent === "X"
    ) {
        return "X";
    } else {
        return ""
    }
}

function gameStatus() {
    let currentWinner = checkWinner()
    const emptyBoxes = boxArray.filter(box => box.textContent === "");
    console.log("Empty boxes: ", emptyBoxes)
    // status.textContent = "";
    //if the winner is Computer it will show the message of You LOST the game
    if (currentWinner === "O") {
        status.textContent = "You LOST the Game";
        disableBoxes(emptyBoxes);
        // emptyBoxes.forEach(box => {
        //     box.classList.add("disabled");
        // });
        // resetBtn.addEventListener("click", resetBoard)
        return;
        // if winner is X player it will show the message as You WON the game
    } else if (currentWinner === "X") {
        status.textContent = "You WON the Game";
        disableBoxes(emptyBoxes);
        // resetBtn.addEventListener("click", resetBoard)
        return;

    }
    else if (currentWinner === "") {
        // if there is no winner and no empty box, it is a tie status will be shown
        if (emptyBoxes.length == 0) {
            status.textContent = "It's a tie";
            disableBoxes(emptyBoxes);
            // resetBtn.addEventListener("click", resetBoard)
            return;
        }
    }
    return;
}

// }

//reset the board to the initial and empty boxes
function resetBoard() {
    boxArray.forEach(item => {
        console.log(item)
        item.textContent = "";
        item.style.removeProperty("background-color");
        item.classList.remove("disabled")
    });
    status.textContent = ""
    gameStatus()
}

//make a function to disable empty boxes after a player wins the game;
function disableBoxes(boxes) {
    boxes.forEach(box => {
        box.classList.add("disabled");
    });
}
//other way to disable empty boxes
// function disabledBoxes() {
//     const foundEmptyBoxes = boxArray.filter(box => box.textContent === "");
//     console.log(foundEmptyBoxes)
//     if (foundEmptyBoxes > 0) {
//         foundEmptyBoxes.classList.add("disabled")
//     }
//     // return;
// }
