var PLAY=1;
var END=0;
var gameState=PLAY;
var grucactus, grunubes;
var trex, trex_running, edges;
var groundImage;
var piso;
var piso2;
var matriz1=[6,4,8,2,9,7,11,22,12,5,3,8]
var suma= 0;
var promedio=0;
var nubeImg,nube;
var obs1,obs2,obs3,obs4,obs5,obs6,cactus;
var puntu=0;
var overImg,resetImg,trexdieImg;
var over,reset;
var box;
var die,jump,checkpoint;

for (i=0; i<matriz1.length; i++){

  if (matriz1[i]>10){
console.log(matriz1[i]);
  }

//suma=suma+matriz1[i];

//console.log(suma);


}

//promedio=suma/matriz1.length;
//console.log(promedio);

function preload(){  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nubeImg = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  overImg = loadImage("gameOver.png");
  resetImg = loadImage("restart.png");
  trexdieImg = loadAnimation("trex_collided.png");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  checkpoint = loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

 grucactus = createGroup();

 grunubes = createGroup();

over = createSprite(width/2,height/2-50);
over.addImage(overImg);
over.scale=0.5;


reset = createSprite(width/2,height/2);
reset.addImage(resetImg);
reset.scale=0.5;


  piso2 = createSprite(width/2,height-10,width,125);
  piso2.visible=false;
  piso = createSprite(width/2,height-80,width,125);
  piso.addImage(groundImage);
  piso.x=width/2;
  console.log(piso.x);
  //crear sprite de Trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trexdieImg);
  edges = createEdgeSprites();
  trex.collide(piso2);


  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50;
  trex.setCollider("circle",0,0,50);
  trex.debug=false;
  var estudiante;
  estudiante = new Alumno("john",15,"preparatoria");
  estudiante.display();


}


function draw(){
  //establecer color de fondo.
  background(150);
  textSize(30);
  fill("black");


//var aleatorio=Math.round(random(5,50));
//console.log(aleatorio);

  //cargar la posición Y del Trex
  //console.log(frameCount);
 // console.log(trex.y);
  //hacer que el Trex salte al presionar la barra espaciadora
 if(gameState==PLAY){
  puntu=puntu+Math.round(getFrameRate()/60);
   if(puntu>0&&puntu%100==0){
checkpoint.play();
   }

over.visible=false;
reset.visible=false;
  if(touches.length>0|| keyDown("space")&&trex.y>=height-150){
    trex.velocityY = -15;
    jump.play();
    touches=[];
  }
  


  if(piso.x<0){
piso.x=piso.width/2;
  }
  trex.velocityY = trex.velocityY + 0.5;
piso.velocityX =-(6+puntu/100);
dibujanubes();
obstaculos();
if(trex.isTouching(grucactus)){
gameState=END;
die.play(); 
}
 }else {
piso.velocityX=0;
trex.velocityY=0;
grunubes.setVelocityXEach(0);
grucactus.setVelocityXEach(0);
grunubes.setLifetimeEach(-1);
grucactus.setLifetimeEach(-1);
over.visible=true;
reset.visible=true;
trex.changeAnimation("collided",trexdieImg);
if(touches.length>0||mousePressedOver(reset)){
reiniciar();
touches=[];
}

 }








  //evitar que el Trex caiga
  trex.collide(piso2);  
  

  drawSprites();
  text("Puntuacion: "+puntu,50,50);
}

function dibujanubes (){

  
  if(frameCount%105==0){
nube = createSprite(width+20,height-300,40,10);
nube.addImage(nubeImg);
nube.y=Math.round(random(20,140));
nube.velocityX = -5;
nube.depth=trex.depth;
nube.scale=1.1;
trex.depth=trex.depth+1; 
nube.lifetime=300;
grunubes.add(nube);

  }
}

function obstaculos (){

if(frameCount%70==0){
cactus = createSprite(width+20,height-95,10,40);
cactus.velocityX=-(6+puntu/100);
var aleatorio = Math.round(random(1,6));
switch (aleatorio) {
  case 1:
    cactus.addImage(obs1);
    break;

    case 2:
    cactus.addImage(obs2);
    break;

    case 3:
    cactus.addImage(obs3);
    break;

    case 4:
    cactus.addImage(obs4);
    break;

    case 5:
    cactus.addImage(obs5);
    break;  

    case 6:
    cactus.addImage(obs6);
    break;

  default:
    break;
}
cactus.scale=0.6;
cactus.lifetime=300;
grucactus.add(cactus);

}


}

function reiniciar(){
puntu=0;
gameState=PLAY;
grucactus.destroyEach();
grunubes.destroyEach();
trex.changeAnimation("running",trex_running);
}