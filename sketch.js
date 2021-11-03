var flappybird,flappybirdImg,backgroundImg
var ground;
var pipe2Img,pipe;
var pipe3Img;
function preload(){
  flappybirdImg = loadImage("images/flappyBird.png");
  backgroundImg = loadImage("images/background.jfif");
  pipe2Img=loadImage("images/pipe2.png")
  pipe3Img=loadImage("images/pipe3.png")

}
function setup(){
  createCanvas(1000,700);
  ground = createSprite(500,350,1000,700);
  ground.addImage(backgroundImg);
  ground.scale=4.5;
  flappybird = createSprite(300,350,5,5);
  flappybird.addImage(flappybirdImg);
  flappybird.scale=0.1

}
function draw(){
  background(255);
  ground.velocityX=-2;

  if(ground.x<450){
    ground.x= 500
  }
  spawnPipe()
  drawSprites();

}
function spawnPipe(){
  if(frameCount % 150===0){
    pipe = createSprite(1000,500,30,70);
    pipe.addImage(pipe2Img)
    pipe.velocityX=-2
  }
  
}