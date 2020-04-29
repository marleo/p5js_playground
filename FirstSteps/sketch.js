let snake;
let res = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  background(0);

  w = floor(width / res);
  h = floor(height / res);

  snake = new Snake();
  foodLocation();
}

function draw() {
  scale(res)
  background(0);

  if(snake.eat(food)){
    foodLocation();
  }

  snake.update();
  snake.show();

  if(snake.endGame()){
    background(255, 0, 0)
    print("END GAME");
    noLoop();
  }

  fill(255,0,0);
  rect(food.x, food.y, 1, 1)
}


function foodLocation(){
  let x = floor(random(w));
  let y = floor(random(h));

  food = createVector(x, y);
}

function mouseClicked(){
  console.log(height - height / 4)
  if(mouseX < width/2 && mouseY < height - height/5 && mouseY > height/5){
    console.log("left")
    snake.setDir(-1, 0);
  } else if(mouseX > width/2 && mouseY < height - height/5 && mouseY > height/5) {
    console.log("Right")
    snake.setDir(1, 0);
  } else if(mouseY < height/5){
    console.log("Up")
    snake.setDir(0, -1);
  } else if(mouseY > height - height/5){
    console.log("Down")
    snake.setDir(0, 1);
  }
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    snake.setDir(-1, 0);
  } else if(keyCode === RIGHT_ARROW){
    snake.setDir(1, 0);
  } else if(keyCode === DOWN_ARROW){
    snake.setDir(0, 1);
  } else if(keyCode === UP_ARROW){
    snake.setDir(0, -1);
  } else if(key == " "){
    snake = new Snake();
    background(0);
    foodLocation();
    loop();
  }
}
