var config = {
  width: window.innerWidth,
  height: window.innerHeight,
  //  width: window.innerWidth,
  //   height: window.innerHeight,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 2000 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var game = new Phaser.Game(config);
const collider = new Phaser.Physics.Arcade.Collider(
  true,
  function collision() {}
);

let cursors;
var fish;
var timeNow;
var timeBefore = Date.now();
var lives = 6;
var score = 0;
var livesText;
var scoreText;
var seaTrashs;
var seaSmallTrashs;
var gameTime = 0;
var timeDisplay = null;

var isHit = false;
const trashs = ["trash1", "trash2", "trash3", "trash4"];
const smalltrashs = ["trash5", "trash6", "trash7"];

function preload() {
  this.load.image("background", "./images-jeu/background.png");
  this.load.image("trash1", "./images-jeu/trash/42567oildrum_98985.png");
  this.load.image(
    "trash2",
    "./images-jeu/trash/Beer_Can_icon-icons.com_68781.png"
  );
  this.load.image("trash3", "./images-jeu/trash/coffecuptotakeaway_122701.png");
  this.load.image("trash4", "./images-jeu/trash/drinkpackage_122723.png");
  this.load.image("trash5", "./images-jeu/trash2/milk.png");
  this.load.image("trash6", "./images-jeu/trash2/coke.png");
  this.load.image("trash7", "./images-jeu/trash2/pail.png");
  this.load.spritesheet("fish", "./images-jeu/swim_to_left_sheet-mimi.png", {
    frameWidth: 256,
    frameHeight: 256
  });
  //   this.load.audio("theme", "./sounds/underwater-theme-super-mario-world.mp3");
}

function hitTrashs(fish, seaTrashs) {
  if (isHit === false) {
    isHit = true;
    lives -= 1;
    setTimeout(() => {
      isHit = false;
    }, 2000);
  }
}

function setLive() {
  livesText.setText("Lives: " + lives + "  " + " Time passed: " + gameTime);
}

function create() {
  setInterval(() => {
    gameTime++;
  }, 1000);

  this.add.image(1700, 1200, "background");

  livesText = this.add.text(32, 32, "Lives:", {
    fontSize: "140px",
    fontFamily: "",
    fill: "#00000"
  });
  livesText.setText("Lives:" + lives + "  " + " Time passed: " + gameTime);
  //   scoreText = this.add.text(16, 16, "live: 0", {
  //     fontSize: "72px",
  //     fill: "#000000"
  //   });
  //   trashs = ["trash1", "trash2", "trash3", "trash4"];
  //   smalltrashs = ["trash5", "trash6", "trash7", "trash8"];
  fish = this.physics.add.sprite(500, 500, "fish");
  fish.setCollideWorldBounds(true);
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("fish", { start: 0, end: 4 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("fish", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  var randomIndex = Math.floor(Math.random() * Math.floor(trashs.length));
  var randomIndex1 = Math.floor(Math.random() * Math.floor(smalltrashs.length));
  var position = Math.floor(Math.random() * 2900);
  cursors = this.input.keyboard.createCursorKeys();
  const seaTrashs = this.physics.add.group({
    key: trashs[randomIndex],
    setXY: { x: position, y: 0 },
    bounceX: 0,
    bounceY: 0.2,
    collideWorldBounds: true,
    setVelocityX: 50
  });
  this.physics.add.collider(fish, seaTrashs, e => {
    hitTrashs();
  });
  const seaSmallTrashs = this.physics.add.group({
    key: smalltrashs[randomIndex1],
    setXY: { x: position, y: 0 },
    bounceX: 0.1,
    bounceY: 0.2,
    collideWorldBounds: true,
    setVelocityY: 2000
  });
  this.physics.add.collider(fish, seaSmallTrashs, e => {
    hitTrashs();
  });
  //   var music = this.sound.add("theme");

  //   music.play();
}

function update() {
  if (lives === 0) {
    setTimeout(() => {});
    window.location = "https://ismaelguerrib.github.io/dftf/";
  }
  setLive();
  fish.setVelocityX(50, 50);
  if (cursors.up.isDown) {
    fish.setVelocity(0, -1500);
  }
  if (cursors.left.isDown) {
    fish.setVelocity(-1500, 0);
    fish.anims.play("left", true);
  }
  if (cursors.right.isDown) {
    fish.setVelocity(1500, 0);

    fish.anims.play("right", true);
  }
  if (cursors.down.isDown) {
    fish.setVelocity(0, 1000);
  }
  console.log("ici");
  timeNow = Date.now();
  if (timeNow - timeBefore >= 3000) {
    let randomIndex = Math.floor(Math.random() * Math.floor(trashs.length));
    let position = Math.floor(Math.random() * 2900);
    const seaTrashs = this.physics.add.group({
      key: trashs[randomIndex],
      setXY: { x: position, y: 0 },
      bounceX: 0,
      bounceY: 0.2,
      collideWorldBounds: true,
      setVelocityX: 50
    });
    this.physics.add.collider(fish, seaTrashs, e => {
      hitTrashs();
    });

    randomIndex = Math.floor(Math.random() * Math.floor(smalltrashs.length));
    position = Math.floor(Math.random() * 2900);
    const seaSmallTrashs = this.physics.add.group({
      key: smalltrashs[randomIndex],
      setXY: { x: position, y: 0 },
      bounceX: 0.1,
      bounceY: 0.2,
      collideWorldBounds: true,
      setVelocityY: 2000
    });
    this.physics.add.collider(fish, seaSmallTrashs, e => {
      hitTrashs();
    });
    timeBefore = timeNow;
  }

  //   window.setInterval(function randomTrashs() {
  //     // fish.physics.add.collider(fish, seaTrashs, hitTrashs);

  //     //   if (timeNow - timeBefore >= 1000) {

  //     //   } else console.log("meh -_-");

  //     timeBefore = timeNow;
  //   }, 1000);
}
