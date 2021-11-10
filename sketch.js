var flappybird,flappybirdImg,backgroundImg
var ground;
var pipe2Img,pipe;
var pipe3Img;
var gameOver,gameoverImg
var restart,restartImg
var jumpSound
var startButton
var gameState="start";
function preload(){
  flappybirdImg = loadImage("images/flappyBird.png");
  backgroundImg = loadImage("images/background.jfif");
  pipe2Img=loadImage("images/pipe2.png")
  pipe3Img=loadImage("images/pipe2inverted.png")
  gameoverImg=loadImage("images/gameOver.png")
  restartImg=loadImage("images/restart.png")
  jumpSound=loadSound("jump.mp3")

}
function setup(){
  createCanvas(1000,700);
  ground = createSprite(500,350,1000,700);
  ground.addImage(backgroundImg);
  ground.scale=4.5;
  flappybird = createSprite(300,350,5,5);
  flappybird.addImage(flappybirdImg);
  flappybird.scale=0.1
  flappybird.velocityY=5
  ground.velocityX=-2;
  pipeGroup1= new Group();
  pipeGroup2= new Group();
  gameOver = createSprite(500,350,30,30);
  gameOver.addImage(gameoverImg);
  restart = createSprite(500,400,10,10)
  restart.addImage(restartImg) 

}
function draw(){
  background(255);
  if(gameState==="start"){
    ground.velocityX=0;
    flappybird.velocityY=0;
    gameOver.visible=false;
    restart.visible=false;
    textSize(30)
    text("Flappy Bird",500,350)

  }

  if(gameState==="play"){
    if(keyDown("space")){
      flappybird.velocityY=-5
      jumpSound.play();
      
    }
    if(ground.x<450){
      ground.x= 500
      
    }
    flappybird.velocityY=flappybird.velocityY+0.8
    spawnPipe();
    gameOver.visible=false;
    restart.visible=false;

    if(flappybird.isTouching(pipeGroup1) || flappybird.isTouching(pipeGroup2)){
      gameState="end";
    }
  }else if(gameState=== "end"){
      flappybird.velocityY=0;
      ground.velocityX=0;
      
      gameOver.visible=true;
      restart.visible=true;
  
      pipeGroup1.setLifetimeEach(-1);
      pipeGroup2.setLifetimeEach(-1);
  
      pipeGroup1.setVelocityXEach(0)
      pipeGroup2.setVelocityXEach(0)

      if(mousePressedOver(restart)){
        reset();
      }
  }
  
  
  
    
  
  drawSprites();

}
function spawnPipe(){
  if(frameCount % 150===0){
    pipe = createSprite(1000,Math.round(random(550,650)),30,30);
    pipe.addImage(pipe2Img)
    pipe.velocityX=-2
    pipe.scale=Math.round(random(0.9,1.2))
    pipe.depth=1;
    pipe.debug=true;
    pipe.lifetime=900;
    pipe.setCollider("rectangle",0,0,120,500)
    flappybird.depth=pipe.depth+1
    pipeGroup1.add(pipe);



    pipe2 = createSprite(1000,Math.round(random(0,50)),30,30);
    pipe2.addImage(pipe3Img);  
    pipe2.velocityX=-2;
    pipe2.scale=Math.round(random(0.7,1.5));
    pipe2.depth=1;
    pipe2.debug=true;
    pipe2.lifetime=900
    pipe2.setCollider("rectangle",0,0,120,500)
    flappybird.depth=pipe2.depth+1
    pipeGroup2.add(pipe2);
    
  }
                 
}



function reset(){
  
  pipeGroup1.destroyEach();
  pipeGroup2.destroyEach();
  
 
  flappybird.x=300;
  flappybird.y=0;
  flappybird.addImage(flappybirdImg);
  gameState="play";
}
