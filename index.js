const selectBox = document.querySelector(".select-box");
const selectXbtn = document.querySelector(".playerX");
const selectObtn = document.querySelector(".playerO");
let players = document.querySelector(".players")
let resultBox = document.querySelector(".coverPage")
let result = document.querySelector(".result");
let resetBtn = document.querySelector(".btn button");


let turn;

const gameboard = document.querySelector(".game-board");

selectXbtn.addEventListener("click", () => {
    selectBox.classList.add("hide");
    gameboard.classList.remove("hide");
    turn = "X";
})

selectObtn.addEventListener("click", () => {
    selectBox.classList.add("hide");
    gameboard.classList.remove("hide");
    players.setAttribute("class", "players active");
    turn = "O"
})

let changeTurnAudio = new Audio("ting.mp3");
let gameOverAudio = new Audio("gameover.mp3");
let gameover = false;

let count = 0;

const changeTurn = () => {
    if (players.classList.contains("active")) {
        players.classList.remove("active");
    } else {
        players.classList.add("active");
    }

    return turn === "X" ? "O" : "X"
}


const checkWin = () => {
    let boxText = document.querySelectorAll(".box-text");
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    win.forEach((e) => {
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) && (boxText[e[0]].innerText !== "")) {
            boxText[e[0]].parentElement.style.backgroundColor = "green";
            boxText[e[1]].parentElement.style.backgroundColor = "green";
            boxText[e[2]].parentElement.style.backgroundColor = "green";
            result.innerText = boxText[e[0]].innerText;
            setTimeout(() => {
                resultBox.classList.remove("hide");
            }, 600)
            gameOverAudio.play();
            gameover = true;

        }
    })
}


const containerDivElement = document.querySelectorAll(".box");


containerDivElement.forEach((box) => {

 box.addEventListener("mouseenter", (e) => {
        if (e.target.querySelector(".box-text").innerText === "") {
            e.target.style.backgroundColor = "rgb(219, 190, 248)";
        }

    })

    box.addEventListener("mouseleave", (e) => {
        if (e.target.querySelector(".box-text").innerText === "") {
            e.target.style.backgroundColor = "transparent";
        }

    })

    box.addEventListener("click", (e) => {
        if (!gameover) {
            e.target.style.backgroundColor = "transparent";
            e.target.style.cursor = "not-allowed";
            e.target.querySelector(".box-text").innerText = turn;
            changeTurnAudio.play();
            turn = changeTurn();
            checkWin();
            count++;
        }

        if (count === 9 && gameover === false) {
            document.querySelector(".won-text").innerHTML = "Match Draw!"
            setTimeout(() => {
                resultBox.classList.remove("hide");
            }, 600);
        }

    }, { once: true })
})


resetBtn.addEventListener("click", () => {
    window.location.reload()
})
