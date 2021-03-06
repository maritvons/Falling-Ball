var x, y, vy, score, screen, imageNumber, highscore;

class Fruit {
  constructor(img, x, y, _score) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.score = _score;
    this.vy = 2;
        
    if(score > 10){
      this.vy = score / 4;
    }

  }

  draw() {
    image(this.img, this.x, this.y, 30, 30);
    this.y = this.y + this.vy;
  }
  
  checkCollision() {
    if (this.y > 390) {
      if (this.x > mouseX - 35 && this.x < mouseX + 35) {
        // gevangen! Dit stuk fruit kan weg.
        // bepaal op welke plek in de lijst dit stuk fruit zit
        let idx = fruits.indexOf(this);
        fruits.splice(idx,1);

        // score updaten
        score = score + this.score;
        pling.play();
      }
    }

    if (this.y > 400) {
      screen = 2; 
      song.stop();
      let idx = fruits.indexOf(this);
        fruits.splice(idx,1);
    }
  }
}

var fruit;
var fruits = [];

function setup() {
  createCanvas(600, 400);

  x = 200;
  y = 0;
  vy = 2;
  score = 0;
  screen = 0;
  imageNumber = 1;
  highscore = 0;

  fruit = new Fruit(apple, random(20, 580), -30, 1);
}

function preload() {
  apple = loadImage('Images/appleRed.png');
  appleG = loadImage('Images/appleGreen.png');
  appleY = loadImage('Images/appleYellow.png');
  mand = loadImage('Images/mand.png');
  appelboom = loadImage('Images/appelboom.jpeg');

  song = loadSound('Sounds/music.mp3');
  pling = loadSound('Sounds/pling.mp3');
}

function draw() {
  if (screen == 0) {
    startScreen();
  }
  else if (screen == 1) {
    game();
  }
  else if (screen == 2) {
    endScreen();
  }
}

function startScreen() {
  background(0);
  imageMode(CENTER);
  image(appelboom, 300, 200, 600, 400);

  fill('white');
  textAlign(CENTER);
  textSize(30);
  text('Apple Fall', 300, 175);
  textSize(24);
  text('Welcome to the catching game!', 300, 330)
  text('Click to start', 300, 370);
  reset();
}

function game() {
  background(202, 231, 193);

  image(appelboom, 300, 200, 600, 400);

  textAlign(LEFT)
  textSize(14);
  text("score = " + score, 30, 30);
  fill('white');

  if (frameCount % 100 == 0) {
    // spawn!
    imageNumber = Math.floor(random(1, 4));

    if (imageNumber == 1) {
      fruit = new Fruit(apple, random(20, 580), 0, 1);
    }

    if (imageNumber == 2) {
      fruit = new Fruit(appleG, random(20, 580), 0, 2);
    }

    if (imageNumber == 3) {
      fruit = new Fruit(appleY, random(20, 580), 0, 3);
    }

    fruits.push(fruit);
  }

  fruits.forEach((f) => {
    f.draw();
    f.checkCollision();
  })

  imageMode(CENTER);
  image(mand, mouseX, 382, 70, 45);
}

function endScreen() {
  background('pink')

  if (score > highscore) {
    highscore = score;
  }

  textAlign(CENTER);
  fill(0);
  textSize(24);
  text('GAME OVER', 300, 175);
  textSize(16);
  text("SCORE = " + score, 300, 210);
  textSize(16);
  text('click to play again', 300, 230);
  textSize(18);
  text('HIGHSCORE: ' + highscore, 300, 280);

}

function mousePressed() {
  if (screen == 0) {
    screen = 1;
    song.play();
  }
  else if (screen == 2) {
    screen = 0;
  }
}

function reset() {
  score = 0;
  fruit.y = 0;
  vy = 2;
}