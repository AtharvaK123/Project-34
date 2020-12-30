var dog, dogS, happyDogS, database, foodS, foodStock;

function preload()
{
  dog = loadImage("images/dogImg.png");
  happyDogS = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
 dogS = createSprite(250, 250, 100, 100);
 dogS.addImage(dog);
 dogS.scale = 0.5;

 foodStock = database.ref('food');
 foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogS.addImage(happyDogS);
  }

  drawSprites();
  
  textSize(13);
  fill("Red");
  text("Press the Up Arrow to Feed the Dog", 150, 30);
  text("Note: There are only 20 milk Bottles", 150, 470);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if (x<=0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    food:x
  })
}