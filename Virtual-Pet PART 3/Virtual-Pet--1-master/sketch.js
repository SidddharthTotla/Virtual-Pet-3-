//Create variables here
var dog,happyDog,database,foodS,foodStock;
var fedTime,lastFed;
var foodObj,feed;
var changeState,readState;
var bR,dG,dV,fS,inj,lazy,lR,Milk,running,rL,Vacc,wR;

function preload()
{
  //load images here
  dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png');
  bR = loadImage('images/Bed Room.png');
  dG = loadImage('images/deadDog.png');
  dV = loadImage('images/dogVaccination.png');
  fS = loadImage('images/Food Stock.png');
  inj = loadImage('images/Injection.png');
  lazy = loadImage('images/Lazy.png');
  lR = loadImage('images/Living Room.png');
  Milk = loadImage('images/Milk.png');
  running = loadImage('images/running.png');
  rL = loadImage('images/runningLeft.png');
  Vacc = loadImage('images/Vaccination.png');
  wR = loadImage('images/Wash Room.png');
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
}

function setup() {
  createCanvas(1000, 800);
  database = firebase.database();
  dog = createSprite(250,250,10,10);
  dog.scale = 0.5;
  dog.addImage(happyDogImg);
  dog.addImage(dogImg);

  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
   
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new food();
}


function draw() {  

  background(46,139,87);

 // foodStock=database.ref('Food');
 // foodStock.on("value",readStock);
  
 // if(keyWentDown(UP_ARROW)){
   // writeStock(foodS);
   // dog.addImage(dogImg);
 // }
 // Food.display();

  //add styles here
  drawSprites();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  textSize(25);
  fill("blue");
  stroke(10);
  if(lastFed>2){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30);
  }

  if(gameState!=="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dG);
  }

  currentTime = hour();
  if(currentTime===(lastFed+1)){
    update("PLaying");
    foodObj.livingRoom();
  }else if(currentTime===(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime <=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

 // text("Press UP_ARROW Key to feed the milk",20,450);
}

function readStock(data){
  foodS=data.val();
}

async function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  console.log(x);
  await database.ref('/').update({
    Food:x})
}

function feedDog(){
  dog.changeImage(dogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FoodTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}