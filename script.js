var x, y, v, score;

function setup(){
  createCanvas(600, 400);

  x = 200;
  y = -20;
  v = 2;
  score = 0;
}

function draw(){
  background(0);

  text("score = " + score, 30,30);
  fill('white')

  ellipse(x,y,20,20);
  rect(mouseX,375,60,30);

  y = y + v;

  if(y > 400 - 10 && x > mouseX + 10 && x < mouseX + 50){
    y = -20;
    x = random(15, width-15);
    v = v + .5;
    score = score + 1;
  }
}
