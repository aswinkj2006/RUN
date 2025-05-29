var road, runner;
var obstacle1, obstacle2, obstacle3;
var roadImg, runnerImg, runnerImg2;
var catcher, catcherImg, catcherImg2;

var database;

var form;

var obstacleImg;
var obstacleImg2;
var obstacleImg3;
var obstacleImg4;

var gameOverImg, cycleBell;

var obs1G, obs2G, obs3G,obs4G;

var gameState = 0;

var distance = 0;
var gameOver, restart;

function preload() {
  roadImg = loadImage("images/background.png");
  runnerImg = loadAnimation("images/runner1.png", "images/runner2.png", "images/runner3.png", "images/runner4.png", "images/runner5.png", "images/runner6.png");
  runnerImg2 = loadAnimation("images/runner1.png");

  font = loadFont("font.TTF");

  catcherImg = loadAnimation("images/catcher1.png", "images/catcher2.png");
  catcherImg2 = loadAnimation("images/catcher1.png");

  obstacleImg = loadImage("images/obstacle1.png");
  obstacleImg2 = loadImage("images/obstacle2.png");
  obstacleImg3 = loadImage("images/obstacle3.png");
  obstacleImg4 = loadImage("images/coin.png")

  gameOverImg = loadImage("images/gameOver.png");
}

function setup() {

  createCanvas(window.innerWidth, window.innerHeight);

  road = createSprite(1200, 370);
  road.addImage(roadImg);
  road.x = width / 2;
  road.scale =0.5;

  runner = createSprite(200, 250);
  runner.addAnimation("runner1", runnerImg);
  runner.setCollider("rectangle", 0, 0, 50, 100);

  catcher = createSprite(50, 250);
  catcher.addAnimation("catcher1", catcherImg);
  catcher.setCollider("rectangle", 0, 0, 70, 110);

  gameOver = createSprite(650, 120);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  obs1G = new Group();
  obs2G = new Group();
  obs3G = new Group();
  obs4G = new Group();

}

function draw() {
  background(0);
  drawSprites();

  if(gameState === 0){
    textSize(100)
    fill("lightblue")
    textFont(font)
    text("RUN",600,250)
    textSize(20)
    fill(255)
    text("WELCOME TO .. ",360,250)
    text("COLLECT COINS TO ESCAPE THE CATCHER",310,300)
    text("HITTING OBSTACLES BRINGS YOU CLOSE TO THE CATCHER", 200, 440)
    text("USE MOUSE TO MOVE THE CHARACTER", 330,480)
    text("( PRESS UP ARROW TO BEGIN THE GAME )", 300,520)

    if(keyDown(38)){
      gameState = 1
    }
  }

  if (gameState === 1) {

    textSize(20);
    fill(255);
    textFont(font)
    text("Distance: " + distance, 1050, 30);

    distance = distance + Math.round(getFrameRate() / 50);
    road.velocityX = -(6 + 2 * distance / 150);

    runner.y = World.mouseY;
    catcher.y = runner.y;

    edges = createEdgeSprites();
    runner.collide(edges);


    if (road.x < 0) {

      road.x = width / 2;
  
    }


    var select_obstacle = Math.round(random(1, 4));

    let spawnInterval = Math.max(40, 150 - Math.floor(distance / 10));

    if (World.frameCount % spawnInterval == 0) {
      if (select_obstacle == 1) {
        obst1();
      } else if (select_obstacle == 2) {
        obst2();
      } else if(select_obstacle == 3){
        obst3();
      } else{
        obst4();
      }
    }

    if (obs1G.isTouching(runner)) {
      catcher.x += 3;
    }

    if (obs2G.isTouching(runner)) {
      catcher.x += 3;
    }

    if (obs3G.isTouching(runner)) {
      catcher.x += 3;
    }
    if(obs4G.isTouching(runner)) {
      runner.x += 12;
      catcher.x -= 12;
      obs4G.destroyEach();
    }

    if (obs1G.isTouching(catcher)) {
      obs1G.destroyEach();
    }

    if (obs2G.isTouching(catcher)) {
      obs2G.destroyEach();
    }

    if (obs3G.isTouching(catcher)) {
      obs3G.destroyEach();
    }

    if (obs4G.isTouching(catcher)){
      obs4G.destroyEach();
    }

    if(catcher.isTouching(runner)){
      gameState = 2;
    }

    if(catcher.x < 0){
      gameState = 3;
    }

  } else if (gameState === 2) {

    textSize(40);
    textFont(font);
    fill("red");
    text("YOU LOST !", 600,100);
    textSize(20)
    fill(255);
    text("Press Up Arrow to Restart the game!", 370, 270);
    text("SCORE : " + distance, 560,340)

    road.velocityX = 0;
    runner.velocityY = 0;
    runner.addAnimation("runner1", runnerImg2);

    catcher.velocityY = 0;
    catcher.addAnimation("catcher1", catcherImg2);

    obs1G.setVelocityXEach(0);
    obs1G.setLifetimeEach(-1);

    obs2G.setVelocityXEach(0);
    obs2G.setLifetimeEach(-1);

    obs3G.setVelocityXEach(0);
    obs3G.setLifetimeEach(-1);

    obs4G.setVelocityXEach(0);
    obs4G.setLifetimeEach(-1);

    if (keyDown("UP_ARROW")) {
      reset();
    }
  } else if  (gameState === 3) {

    textSize(40);
    textFont(font);
    fill("lightgreen");
    text("YOU WON !", 600,100);
    textSize(20)
    fill(255)
    text("Press Up Arrow to Restart the game!", 370, 270);
    text("SCORE : " + distance, 560,340)

    road.velocityX = 0;
    runner.velocityY = 0;
    runner.addAnimation("runner1", runnerImg2);

    catcher.velocityY = 0;
    catcher.addAnimation("catcher1", catcherImg2);

    obs1G.setVelocityXEach(0);
    obs1G.setLifetimeEach(-1);

    obs2G.setVelocityXEach(0);
    obs2G.setLifetimeEach(-1);

    obs3G.setVelocityXEach(0);
    obs3G.setLifetimeEach(-1);

    obs4G.setVelocityXEach(0);
    obs4G.setLifetimeEach(-1);

    if (keyDown("UP_ARROW")) {
      reset();
    }
  }
}

function obst1() {
  player1 = createSprite(1100, Math.round(random(50, 250)));
  player1.scale = 0.06;
  player1.velocityX = -(6 + 2 * distance / 150);
  player1.addImage("obs1", obstacleImg);
  player1.setLifetime = 170;
  obs1G.add(player1);
}

function obst2() {
  player2 = createSprite(1100, Math.round(random(50, 250)));
  player2.scale = 0.06;
  player2.velocityX = -(6 + 2 * distance / 150);
  player2.addImage("obs2", obstacleImg2);
  player2.setLifetime = 170;
  obs2G.add(player2);
}

function obst3() {
  player3 = createSprite(1100, Math.round(random(50, 250)));
  player3.scale = 0.06;
  player3.velocityX = -(6 + 2 * distance / 250);
  player3.addImage("obs3", obstacleImg3);
  player3.setLifetime = 170;
  obs3G.add(player3);
}

function obst4() {
  player4 = createSprite(1100,Math.round(random(50,250)));
  player4.scale = 0.2;
  player4.velocityX = -(6+2*distance/250);
  player4.addImage("obs4",obstacleImg4);
  player4.setLifetime = 170;
  obs4G.add(player4);
}

function reset() {
  gameState = 0;
  gameOver.visible = false;
  runner.addAnimation("runner", runnerImg2);
  catcher.addAnimation("catcher",catcherImg2);

  obs1G.destroyEach();
  obs2G.destroyEach();
  obs3G.destroyEach();
  obs4G.destroyEach();

  distance = 0;
}