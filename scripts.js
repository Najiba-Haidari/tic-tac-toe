const container = document.getElementById("container");
const box = document.getElementsByClassName("box");
const startBtn = document.getElementById("start-btn");
const status = document.getElementById("status");
const title = document.getElementById("title")

let boxArray = Array.from(box);
console.log(boxArray)

container.addEventListener("click", xPlays);
startBtn.addEventListener("click", startGame);

function xPlays(event){
console.log("x plays")
if (event.target.matches(".box")){
    // console.log("box clicked")
    const x = event.target.getAttribute("data-state-x")
    if (event.target.textContent === "X" || event.target.textContent === "O"){
        return;
    }else{
        event.target.textContent = x;
        computerPlays();
    }
}
}

function computerPlays(){
    console.log("computer plays now")
    //array of empty content for .box
    const emptyBoxes = boxArray.filter(box => box.textContent === "");
    console.log("Empty boxes: " ,emptyBoxes)
    if (emptyBoxes.length > 0){
        let randomIndex = Math.floor(Math.random()* emptyBoxes.length);
        const o = emptyBoxes[randomIndex].getAttribute("data-state-o");
        emptyBoxes[randomIndex].textContent = o;
        emptyBoxes[randomIndex].style.backgroundColor= "orange"
    }
}

function startGame(event){
    container.classList.remove("hidden");
    title.remove()
    startBtn.remove()
    status.textContent = "Game started";
            computerPlays();

}

// function gameStatus(){
//     console.log(boxArray[0].textContent)
// }
// gameStatus();

// function resetBoard(){

// }