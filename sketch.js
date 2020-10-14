var PLAY = 0;
var END = 1;
var gameState;
var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score
var ground, ground2, groundIMAGE;
var score, Stime, S;
var invisibleground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_stop = loadAnimation("sprite_5.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundIMAGE = loadImage("ground.png");
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}

function setup() {
  createCanvas(400,400);
  
  ground = createSprite(300,350,400,100);
  ground.addImage(groundIMAGE);
  ground2 = createSprite(700,350,400,100);
  ground2.addImage(groundIMAGE);
  
  invisibleground = createSprite(200,300,400,10);
  invisibleground.visible = false;
  
  monkey_running.frameDelay = 3;
  monkey = createSprite(50,250,10,10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("stop", monkey_stop);
  monkey.scale = 0.1;
  
  Stime = 0;
  score = 0;
  
  gameState = PLAY;
}

function draw() {
  background("lightblue");
  if(gameState === PLAY){
    food();
    obstacles();    
    Stime = Math.round(frameCount/50);
    ground2.velocityX = -5;
    if(ground2.x < 100){
      ground2.x = 700;
    }
    ground.velocityX = -5;
    if(ground.x < -300){
      ground.x = 300;
    }
    if(keyDown("space") && monkey.y > 263){
      monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState = END; 
  }
  if(gameState === END){
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.changeAnimation("stop",monkey_stop)
    obstacleGroup.setVelocityEach(0,0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityEach(0,0);
    foodGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    ground2.velocityX = 0;
    textSize(50);
    fill("blue");
    text("GAME OVER",45,125);
  }
  monkey.collide(invisibleground);
  textSize(20);
  fill("brown");
  text("Score : " + score, 10, 60);
  text("Survival Time : " + Stime, 10, 30);
  obstacleGroup.setColliderEach("rectangle",0,0,400,400);
  drawSprites();
}

function food(){
  if (frameCount % 100 === 0) {
    banana = createSprite(400,120,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -5;
    banana.lifetime = 85;
    foodGroup.add(banana);
  }
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 1;
  }
}

function obstacles(){
  if (frameCount % 200 === 0) {
    obstacle = createSprite(400,270,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = 85;
    obstacleGroup.add(obstacle);
  }
}


