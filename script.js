var x, y, v, score, screen, apple, imageNumber;

function setup(){
  createCanvas(600, 400);

  apple = loadImage('Images/appleRed.png');
  appleG = loadImage('Images/appleGreen.png');
  appleY = loadImage('Images/appleYellow.png');

  x = 200;
  y = -30;
  v = 2;
  score = 0;
  screen = 0;
  imageNumber = 1;
}

function draw() {
	if(screen == 0){
    startScreen();
  }
  else if(screen == 1){
    game();
  }
  else if(screen == 2){
  	endScreen();
  }
}

function startScreen(){
  background(200, 162, 200);
  textAlign(CENTER);
  text('Click to start', 300, 200);
  reset();
}

function game(){
  background(202, 231, 193);

  textAlign(LEFT)
  text("score = " + score, 30, 30);
  fill('white')

  if(imageNumber == 1){
    image(apple,x,y,30,30);
  }

  if(imageNumber == 2){
    image(appleG,x,y,30,30);
  }
  
  if(imageNumber == 3){
    image(appleY,x,y,30,30);
  }

  rectMode(CENTER);
  rect(mouseX,390,60,40);

  y = y + v;

  if(y > 390 && x > mouseX - 35 && x < mouseX + 35){
    y = -30;
    x = random(20, 580);
    imageNumber = Math.floor(random(1,4));
    v = v + .5;
    score = score + 1;
  }

  if(y > 400){
    screen = 2;
  }
}

function endScreen(){
		background('pink')

		textAlign(CENTER);
    text('GAME OVER', 300, 200);
  	text("SCORE = " + score, 300, 220);
		text('click to play again', 300, 240);
}

function mousePressed(){
  if(screen == 0){
    screen = 1;
  }
  else if(screen == 2){
    screen = 0;
  }
}

function reset(){  

	  score = 0;
  	v = 2;
  	y = -30;
}