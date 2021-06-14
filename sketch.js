var tower, towerImg;
var door, doorImg, doorG;
var climber, climberImg, climberG;
var ghost, ghostImg, ghostG;
var invBlock, invBlockG;
var gameState = "play";
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(300,400);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.5;
  
  
  
  
  doorG = new Group();
  climberG = new Group();
  invBlockG = new Group();
}

function draw(){
  background(0);
  
  if(gameState === "play"){
    
  if(tower.y > 600){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY = -4;
    
    
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if(climberG.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invBlockG.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end";
  }
  
  
  
  spawnDoors();
  drawSprites();
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,300);
  }
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(Math.round(random(100,500)),-50);
    door.addImage("doors",doorImg);
    door.velocityY = 2;
    doorG.add(door);
    door.lifetime = 600;
    
    climber = createSprite(door.x,10);
    climber.addImage("climber",climberImg);
    climber.velocityY = 2;
    climberG.add(climber);
    climber.lifetime = 600;
    
    invBlock = createSprite(door.x,15,climber.width,2);
    invBlock.velocityY = 2;
    invBlockG.add(invBlock);
    invBlock.lifetime = 600;
    invBlock.visible = false;
    
    
    ghost.depth = door.depth;
    ghost.depth += 1;
  }
}