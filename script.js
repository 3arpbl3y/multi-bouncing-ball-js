"use strict";

const canvas = document.querySelector("canvas");

//width and height of viewport
const width = window.innerWidth;
const height = window.innerHeight;

// width and h of canvas = br viewport

canvas.width = width;
canvas.height = height;

//getContext

const ctx = canvas.getContext("2d");

class Ball {
  constructor(x, y, velx, vely, size, color) {
    this.x = x; //horizontal position of the ball
    this.y = y; //vertical
    this.velx = velx; //velocity x of the ball to x
    this.vely = vely; //same y
    this.size = size; //radius of the ball
    this.color = color;
  }

  //draw function

  drawBall() {
    ctx.beginPath();
    ctx.fillStyle = this.color; //full with color

    //draw circle
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  //update f
  updateBall() {
    //x and y position
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velx = -this.velx;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.vely = -this.vely;
    }

    //velocity to coordinates
    this.x += this.velx;
    this.y += this.vely;
  }
}

//random number gen
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//balls in array

const balls = [];

while (balls.length < 25) {
  let size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-5, 5),
    random(-5, 5),
    size,
    `rgb(${random(0, 255)}, ${random(0, 255)},${random(0, 255)})`
  );
  balls.push(ball);
}

//loop fn

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall();
    balls[i].updateBall();
  }
  requestAnimationFrame(loop);
}

//call loop
loop();
