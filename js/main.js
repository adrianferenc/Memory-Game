let slider = document.getElementById("myRange");

let n = 2 * slider.value;
document.getElementById("boxSize").innerHTML = n;

slider.oninput = function () {
  n = 2 * this.value;
  document.getElementById("boxSize").innerHTML = n;
};

console.log("works??");

let array1 = [];
let array2 = [];

let guess1;
let guess2;
let turns = 0;
let found = 0;

//Create squares:
let start = document.getElementById("start");
start.addEventListener("click", createGrid);

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
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      let button = document.createElement("button");
      button.innerHTML = `${array1[6 * (i - 1) + (j - 1)]}`;
      button.id = `${i},${j}`;
      button.className = "memory";
      button.addEventListener("click", select);
      document.body.appendChild(button);
    }
    document.body.appendChild(document.createElement("br"));
  }
  let boxes = document.getElementsByClassName("memory");
  if (document.getElementById("easy").checked) {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.color = "black";
    }
    setTimeout(function () {
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.color = "white";
      }
    }, 3000);
  }
  if (document.getElementById("hard").checked) {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.border = 0;
    }
  }
  document.getElementById("pregame").remove();
}

function select(e) {
  id = e.target.id;
  if (guess2) {
    document.getElementById(guess1).classList.remove("selected");
    document.getElementById(guess2).classList.remove("selected");
    document.getElementById(guess1).addEventListener("click", select);
    document.getElementById(guess2).addEventListener("click", select);
    document.getElementById(id).classList.add("selected");
    document.getElementById(id).removeEventListener("click", select);
    guess1 = id;
    guess2 = null;
  } else if (guess1) {
    turns++;
    document.getElementById(id).classList.add("selected");
    document.getElementById(id).removeEventListener("click", select);
    guess2 = id;
    if (
      document.getElementById(guess2).innerHTML ===
      document.getElementById(guess1).innerHTML
    ) {
      found += 2;
      guess1 = null;
      guess2 = null;
    }
  } else {
    document.getElementById(id).classList.add("selected");
    document.getElementById(id).removeEventListener("click", select);
    guess1 = id;
  }

  if (found === n ** 2) {
    console.log("game over");
    //write GAME OVER. IT TOOK YOU ___ turns
  }
}
