
var monkey , monkey_running
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var points;
var backgroundSprite,background_Image;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  background_Image=loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(600,600);
  
  backgroundSprite=createSprite(300,300,600,600);
  backgroundSprite.addImage(background_Image);
  monkey=createSprite(70,500,5,5);
  monkey.addAnimation("monkeyRun",monkey_running);
  monkey.scale=0.16;
  ground=createSprite(300,570,1200,20);
  backgroundSprite.velocityX=-4;
  score=0;
  points=0;
  console.log(points);
  fruitsGroup=new Group();
  obstacleGroup=new Group();
 // monkey.debug=true;
  monkey.setCollider("rectangle",0,0,500,614);
  monkey.collide(ground);
  ground.visible=false;
  //console.log(monkey.width);
}


function draw() {
  background("lightblue");
  
  textSize(23);
  fill("white");
 
    
  
 
  if(gameState===PLAY){
       drawSprites();
  text("Survival Time: "+ score,100,150);
  text("Food Collected:"+points,400,150);
    backgroundSprite.velocityX=-4;

    if(backgroundSprite.x===100){
        backgroundSprite.x=300;
    }
    if(keyDown("space")&& monkey.y>490){
      monkey.velocityY=-23;
    }
    monkey.velocityY=monkey.velocityY+0.8;
    monkey.collide(ground);
    
    score = score+ Math.round(getFrameRate()/60);
    
    if(fruitsGroup.isTouching(monkey)){
      points=points+1;
      console.log(points);
      fruitsGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
    switch(points){
      case 5:monkey.scale=0.18;
               break; 
      case 10:monkey.scale=0.20;
               break;          
      case 15:monkey.scale=0.22;
               break;
      case 20:monkey.scale=0.24;
               break;          
       default:break; 
        
    }
    
    
 
    
    spawnObstacles();
    spawnFruits();
  } 
  
  if(gameState==END){
    
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    fruitsGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    fruitsGroup.setLifetimeEach(-1);
    backgroundSprite.velocityX=0;
    textSize(33);
    fill("white");
    text("GAME OVER:(",200,150);
    text("Survival Time: "+ score,190,300);
    text("Food Collected:"+points,200,250);
    text("Press R to Restart",200,400);
    
    if(keyDown("r")&& gameState===END){
      restart();
      
    }
    
    
  }
  
  
  
}

function spawnObstacles(){
  
  if(frameCount%250==0){
  
  obstacle=createSprite(650,525,20,20);
  obstacle.velocityX=-4;
  //obstacle.addAnimation(obstaceImage);
  obstacle.addImage( obstaceImage);
  obstacle.scale=0.2; 
  obstacle.lifetime = 180;
  obstacle.setCollider("circle",-10,0,200); 
  // obstacle.debug=true; 
  
   obstacleGroup.add(obstacle) ;
  }
}

function spawnFruits(){
  
  rand=Math.round(random(300,410));
  if(frameCount%180==0){
  
  Fruit=createSprite(610,410,20,20);
    Fruit.y=rand;
  Fruit.velocityX=-4;
  //obstacle.addAnimation(obstaceImage);
  Fruit.addImage( bananaImage);
  Fruit.scale=0.15; 
  Fruit.lifetime = 180;
  fruitsGroup.add(Fruit);
     Fruit.depth = monkey.depth;
    monkey.depth = monkey.depth + 1

  }
  
}

function restart(){
  score=0;
  points=0;
  gameState=PLAY;
  fruitsGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  
  
  
}
  
  


