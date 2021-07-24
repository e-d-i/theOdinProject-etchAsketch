"use strict";

const body = document.querySelector("body");
document.body.ondragstart = () => { return false };

const input = document.querySelector("input");
const outputs = document.querySelectorAll("output");
let slider = document.getElementById("gridSize");
const divContainer = document.querySelector(".container");
const btnsContainer = document.querySelector(".buttons");
const btnBlack = document.createElement("button");
const btnGreyScale = document.createElement("button");
const btnRgb = document.createElement("button");
const btnErase = document.createElement("button");
const btnShake = document.createElement("button");

let isDrawing = false;
window.addEventListener("mousedown", () => {
    isDrawing = true;
});
window.addEventListener("mouseup", () => {
    isDrawing = false;
});

function createGrid(col, rows) {
  for (let i = 0; i < (col * rows); i++) {
      const div = document.createElement("div");
      divContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
      divContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      divContainer.appendChild(div).classList.add("box");
  }
  paintBlack();
  paintGreyScale();
  paintRgb();
  erase();
  clearCanvas();
}

function modifyGridSize() {
  const boxes = divContainer.querySelectorAll(".box");
  boxes.forEach(box => box.remove());
  createGrid(slider.value, slider.value);
}

function paintBlack() { 
  const boxes = divContainer.querySelectorAll(".box");
  btnBlack.textContent = "Black";
  btnBlack.addEventListener("click", function () {
    boxes.forEach(box => box.addEventListener("mousemove", function () {
      if (isDrawing) {this.style.background = "#000"};
    }))
  })
  btnsContainer.appendChild(btnBlack).classList.add("btn", "blackBtn");
}
paintBlack();

function paintGreyScale() { 
  const boxes = divContainer.querySelectorAll(".box");
  btnGreyScale.textContent = "Grey";
  btnGreyScale.addEventListener("click", function () {
    boxes.forEach(box => box.addEventListener("mousemove", function () {
      let randNum = Math.floor(Math.random() * 256);
      let grayScale = `rgb(${randNum},${randNum},${randNum})`;
      if (isDrawing) {this.style.background = grayScale};
    }))
  })
  btnsContainer.appendChild(btnGreyScale).classList.add("btn", "greyBtn");
}
paintGreyScale();

function paintRgb() { 
  const boxes = divContainer.querySelectorAll(".box");
  btnRgb.textContent = "Rainbow";
  btnRgb.addEventListener("click", function () {
    boxes.forEach(box => box.addEventListener("mousemove", function () {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      const rgb = `rgb(${r},${g},${b})`;
      if (isDrawing) {this.style.background = rgb};
    }))
  })
  btnsContainer.appendChild(btnRgb).classList.add("btn", "rainbowBtn");
}
paintRgb();

function erase() { 
  const boxes = divContainer.querySelectorAll(".box");
  btnErase.textContent = "Erase";
  btnErase.addEventListener("click", function () {
    boxes.forEach(box => box.addEventListener("mousemove", function () {
      if (isDrawing) {this.style.background = "#FFF"};
    }))
  })
  btnsContainer.appendChild(btnErase).classList.add("btn", "eraseBtn");
}
erase();

function clearCanvas() { 
  const boxes = divContainer.querySelectorAll(".box");
  btnShake.textContent = "Shake it!";
  btnShake.addEventListener("click", function () {
    boxes.forEach(box => box.style.backgroundColor = "#FFF");
  })
  btnsContainer.appendChild(btnShake).classList.add("btn", "clearCanvasBtn", "shake");
}
clearCanvas();

btnShake.addEventListener("click", clearCanvas);

input.addEventListener("input", () => {
  for (let output of outputs) {
    output.innerText = input.value;
  }
})

slider.addEventListener("mouseup", modifyGridSize);

createGrid(50,50);