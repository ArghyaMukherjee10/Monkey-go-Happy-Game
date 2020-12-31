var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;
var score = 0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,600);

  monkey = createSprite(80,500,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,500,1000,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
 //monkey.debug=true;
  score=0;
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  survivalTime=0;
}


function draw() {
  background(255);
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text ("Survival Time:"+ survivalTime,300,50);
  
  if(gameState=== PLAY){
    survivalTime+=Math.round(getFrameRate()/61)
    if(keyDown("space")) {
  monkey.velocityY = -12;
    }
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    
     obstacles();
     bananas();
  }else if(gameState===END){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
   obstacleGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    
  }
  
    monkey.collide(ground);
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   
  drawSprites();
}
function obstacles(){
  if(World.frameCount%100===0){
  obstacle = createSprite(500,470,20,20);
  obstacle.addImage("moving",obstacleImage );
  obstacle.scale = 0.15;
  obstacle.velocityX = -(6 + survivalTime/30);
  obstacle.lifetime = 100;
  obstacleGroup.add(obstacle);

  }
}
function bananas(){
if(World.frameCount%80===0){
  banana = createSprite(500,350,20,20);
  banana.addImage("moving",bananaImage );
  banana.scale = 0.1;
  banana.velocityX = -(5 + survivalTime/30);
  banana.lifetime = 110;
  banana.y=Math.round(random(50,340));
  bananaGroup.add(banana);
  
  }
  
}





