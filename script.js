let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

// تعيين اللون الافتراضي لمربع الدور الأول "X"
document.querySelector(".bg").style.backgroundColor = "#08D9D6";

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            e.style.backgroundColor = ""; // إزالة لون التحويم عند الاختيار
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    });

    e.addEventListener("mouseover", () => {
        if (!isGameOver && e.innerHTML === "") {
            if (turn === "X") {
                e.style.backgroundColor = "#08D9D6"; // الأزرق للتحويم عند دور "X"
            } else {
                e.style.backgroundColor = "#FF2E63"; // الأحمر للتحويم عند دور "O"
            }
        }
    });

    e.addEventListener("mouseout", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.style.backgroundColor = ""; // إزالة لون التحويم عند مغادرة المربع
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
        document.querySelector(".bg").style.backgroundColor = "#FF2E63"; // تغيير اللون إلى الأحمر
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
        document.querySelector(".bg").style.backgroundColor = "#08D9D6"; // تغيير اللون إلى الأزرق
    }
}

function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#play-again").style.display = "inline";

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

function cheakDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "تعادل";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector(".bg").style.backgroundColor = "#08D9D6"; // تعيين اللون إلى الأزرق عند إعادة اللعب
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});
