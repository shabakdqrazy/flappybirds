var flappybird,flappybirdImg,backgroundImg
var ground;
var pipe2Img,pipe;
var pipe3Img;
function preload(){
  flappybirdImg = loadImage("images/flappyBird.png");
  backgroundImg = loadImage("images/background.jfif");
  pipe2Img=loadImage("images/pipe2.png")
  pipe3Img=loadImage("images/pipe2inverted.png")
  

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


}
function draw(){
  background(255);
  
  if(keyDown("space")){
    flappybird.velocityY=-5
    
  }
  flappybird.velocityY=flappybird.velocityY+0.8

  if(ground.x<450){
    ground.x= 500
    
  }
  spawnPipe()
  if(flappybird.isTouching(pipeGroup1) || flappybird.isTouching(pipeGroup2)){
    flappybird.velocityY=100;
    ground.velocityX=0;
    pipeGroup1.setVelocityXEach(0)
    pipeGroup2.setVelocityXEach(0)
  }
    pipeGroup1.setLifetimeEach(-1);
    pipeGroup2.setLifetimeEach(-1);
  
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
    pipe.setCollider("rectangle",0,0,120,500)
    flappybird.depth=pipe.depth+1
    pipeGroup1.add(pipe);



    pipe2 = createSprite(1000,Math.round(random(0,50)),30,30);
    pipe2.addImage(pipe3Img);
    pipe2.velocityX=-2;
    pipe2.scale=Math.round(random(0.7,1.5));
    pipe2.depth=1;
    pipe2.debug=true;
    pipe2.setCollider("rectangle",0,0,120,500)
    flappybird.depth=pipe2.depth+1
    pipeGroup2.add(pipe2);
  }
  
}
