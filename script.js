var x, y, v, score;

function setup(){
  createCanvas(600, 400);

  x = 200;
  y = -20;
  v = 2;
}

function draw(){
  background(0);

  ellipse(x,y,15,15);

  y = y + v;

  if(y > 420){
    y = -20;
  }
}