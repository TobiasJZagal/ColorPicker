"use strict";
let ctx;
let img;
let canvas;
let x;
let y;
let imageData;
let width = 500;
let zoomCtx;
let zoomData;

init();

// 🎁 Here you go! 🎁
function showColorInfo(rgb) {
  document.querySelector("#r").textContent = rgb.r;
  document.querySelector("#g").textContent = rgb.g;
  document.querySelector("#b").textContent = rgb.b;

  const hex =
    "#" +
    rgb.r.toString(16).padStart(2, "0") +
    rgb.g.toString(16).padStart(2, "0") +
    rgb.b.toString(16).padStart(2, "0");

  document.querySelector("#hex").textContent = hex;

  document.querySelector("#colorbox").style.backgroundColor = hex;
}

function init() {
  console.log("init");
  //ctx = document.querySelector("#imagesCanvas").getContext("2d");
  ctx = document.querySelector("#imageCanvas").getContext("2d");
  canvas = document.querySelector("#imageCanvas");
  zoomCtx = document.querySelector("#zoomCanvas");
  img = new Image();
  img.src = "cat.jpg";

  img.addEventListener("load", drawPicture);
}

function drawPicture() {
  console.log("drawPicture");
  ctx.drawImage(img, 0, 0);
  getData();
  getZoomData();
}

function getData() {
  imageData = ctx.getImageData(0, 0, 500, 600);
  console.log(imageData);
}

function getZoomData() {
  zoomData = zoomCtx.getImageData(10, 10);
  console.log(zoomData);
}

function showZoomData() {}

function mouseMoved(event) {
  console.log("mouseMoved");

  x = event.offsetX;
  y = event.offsetY;

  let rgb = colorPick(x, y);
  showColorInfo(rgb);

  ctx.putImageData(imageData, 0, 0);
  ctx.strokeStyle = "rgb(05, 250, 10)";
  ctx.strokeRect(x - 5, y - 5, 10, 10);

  console.log("X:" + x);
  console.log("Y:" + y);
}

function colorPick(x, y) {
  const pixelIndex = 4 * (x + y * width);
  const r = imageData.data[pixelIndex];
  const g = imageData.data[pixelIndex + 1];
  const b = imageData.data[pixelIndex + 2];
  return { r, g, b };
}

canvas.addEventListener("mousemove", mouseMoved);
