'use strict';

console.log('I am loaded!!');

let canvasEl = document.getElementById('myCanvas');

// create the context object that we can use to draw things
let ctx = canvasEl.getContext('2d');

ctx.fillStyle = "blue";
ctx.fillRect(0, 50, 100, 100);

ctx.fillStyle = "red";
ctx.fillRect(100, 50, 100, 100);

ctx.beginPath();
ctx.arc(150, 100, 50, 0, 2 * Math.PI);
ctx.stroke();