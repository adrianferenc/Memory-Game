let array1, array2, guess1, guess2, turns, found, gridLength, n, colorArray;

let slider = document.getElementById("myRange");

n = 2 * slider.value;
document.getElementById("boxSize").innerHTML = `${n} x ${n}`;

slider.oninput = function () {
  n = 2 * this.value;
  document.getElementById("boxSize").innerHTML = `${n} x ${n}`;
};

let start = document.getElementById("start");
start.addEventListener("click", createGrid);

function initialize() {
  array1 = [];
  array2 = [];
  turns = 0;
  found = 0;
  gridLength = "";
}

initialize();

function createGrid() {
  while (array1.length < n ** 2) {
    let element = 1 + Math.round(Math.random() * (n ** 2 / 2 - 1));
    if (!array2.includes(element)) {
      if (array1.includes(element)) {
        array2.push(element);
      }
      array1.push(element);
    }
  }
  colorArray = [];
  for (let i = 0; i <= n ** 2 / 2; i++) {
    colorArray.push(
      `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)})`
    );
  }
  for (let i = 0; i < n ** 2; i++) {
    let button = document.createElement("div");
    button.id = `box-${i}`;
    button.className = "memory";
    button.addEventListener("click", select);
    document.querySelector("#game").appendChild(button);
  }
  let boxes = document.getElementsByClassName("memory");
  if (document.getElementById("easy").checked) {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].textContent = array1[i];
    }
    setTimeout(function () {
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = "";
      }
    }, 3000);
  }
  if (document.getElementById("hard").checked) {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.border = "0pt solid white";
    }
  }
  for (let i = 0; i < n; i++) {
    gridLength += "auto ";
  }

  document.querySelector("#game").style.gridTemplate =
    gridLength + "/" + gridLength;
  document.querySelector("#game").style.height = `${n * 52}px`;
  document.querySelector("#game").style.width = `${n * 52}px`;
  document.getElementById("pregame").remove();
}

function idToNum(id) {
  return id.split("-")[1];
}

function numToId(id) {
  return `box-${id}`;
}

function select(e) {
  id = e.target.id;
  if (guess2) {
    document.getElementById(guess1).classList.remove("selected");
    document.getElementById(guess2).classList.remove("selected");
    document.getElementById(guess1).textContent = "";
    document.getElementById(guess2).textContent = "";
    document.getElementById(guess1).style.backgroundColor = "white";
    document.getElementById(guess2).style.backgroundColor = "white";
    document.getElementById(guess1).addEventListener("click", select);
    document.getElementById(guess2).addEventListener("click", select);
    document.getElementById(id).classList.add("selected");
    document.getElementById(id).removeEventListener("click", select);
    document.getElementById(id).textContent = array1[idToNum(id)];
    document.getElementById(id).style.backgroundColor =
      colorArray[array1[idToNum(id)]];
    guess1 = id;
    guess2 = null;
  } else if (guess1) {
    turns++;
    document.getElementById(id).classList.add("selected");
    document.getElementById(id).style.backgroundColor =
      colorArray[array1[idToNum(id)]];
    document.getElementById(id).textContent = array1[idToNum(id)];
    document.getElementById(id).removeEventListener("click", select);
    guess2 = id;
    if (
      document.getElementById(guess2).textContent ===
      document.getElementById(guess1).textContent
    ) {
      found += 2;
      guess1 = null;
      guess2 = null;
    }
  } else {
    document.getElementById(id).classList.add("selected");
    document.getElementById(id).textContent = array1[idToNum(id)];
    document.getElementById(id).style.backgroundColor =
      colorArray[array1[idToNum(id)]];
    document.getElementById(id).removeEventListener("click", select);
    guess1 = id;
  }

  if (found === n ** 2) {
    const gameOver = document.createElement("h1");
    gameOver.textContent = `Game over. It took you ${turns} turns.`;
    document.getElementById("board").appendChild(gameOver);
    const reset = document.createElement("button");
    reset.addEventListener("click", (e)=> window.location.reload());
    reset.textContent="Play Again"
    document.getElementById("board").appendChild(reset);
  }
}
