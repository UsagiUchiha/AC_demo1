var scoreCounter = 0;
var scoreTitle ="";
var health = 5;
var healthTitle ="health: "+ health + " out of 5";

class Scene1 extends Phaser.Scene{
  constructor(){  // Where can intialize variables
    super("playGame");
    this.gameOver = false;
  }

  preload(){
    this.load.image("background", "assets/background.png");
    this.load.image("floor", "assets/floor.png");
    this.load.image("ghost", "assets/ghost.png");
    this.load.image("trees", "assets/trees.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("gem", "assets/gem.png");
    this.load.image("portal", "assets/portal.png");

    // player spritesheets
    this.load.spritesheet("dragon", "assets/dragoidle.png",
    {frameWidth: 230, frameHeight: 230});
    this.dragonLeft = this.load.spritesheet("dragoLeft", "assets/dragoLeftWalk.png",
    {frameWidth: 230, frameHeight: 230});
    this.dragonRight = this.load.spritesheet("dragoRight", "assets/dragoWalk.png",
    {frameWidth: 230, frameHeight: 230});
    this.load.spritesheet("dragonIdleL", "assets/dragoIdleLeft.png",
    {frameWidth: 230, frameHeight: 230});
    this.fly = this.load.spritesheet("fly", "assets/fly.png",
    {frameWidth: 106, frameHeight: 108});

  }

//            ---Create---
  create(game){
    this.background = this.add.image(-100,0, "background");
    this.background.setOrigin(0, 0);
    this.background.setScale(2.8);

    // calls platformBuilder Function
    this.platformBuilder();
    this.playerCreation();
    this.createEnemy();

    this.buttonControls();
    this.gemCreator();
    this.portal();
    this.createEnemy();
    this.trees = this.add.image(600, 490, "trees").setScale(2);

    //Game over text
    this.gameOverMsg = this.add.text(200, 290, "GAME OVER", { fontsize: "200px", setFontfamily: 'Grenze Gotisch', strokeThickness: 5, fill: "#900"});
    this.gameOverMsg.setOrigin(-.5);
    this.gameOverMsg.visible = false;

    this.gameOverMsg2 = this.add.text(100, 290, "Refresh to start over.", { fontsize: "200px", setFontfamily: 'Grenze Gotisch', strokeThickness: 5, fill: "#900"});
    this.gameOverMsg2.setOrigin(-.5, -1.5);
    this.gameOverMsg2.visible = false;

    scoreTitle = this.add.text(20, 20, "Score: 0", { fontsize: "200px", setFontfamily: 'Grenze Gotisch', strokeThickness: 4, fill: "#230"});
    healthTitle = this.add.text(20, 40, "Health: 5", { fontsize: "200px", setFontfamily: 'Grenze Gotisch', strokeThickness: 4, fill: "#230"});
  }

// Function for creating platforms with static properties
  platformBuilder(){
    this.platforms= this.physics.add.staticGroup();
    this.platforms.create(400, 568, "floor").setScale(3).refreshBody();
    this.platforms.create(100, 500, "platform");
    this.platforms.create(300, 420, "platform");
  }

  // Player Animation
  playerCreation(){
    this.dragonPlayer = this.physics.add.sprite(100, 150, "dragon");
    this.dragonPlayer.body.setSize(100, 170, 200, 325);
    this.dragonPlayer.setBounce(0.1);

    //Edge colliders
    this.playerCollider = this.dragonPlayer.setCollideWorldBounds(true);
    this.physics.add.collider(this.dragonPlayer, this.platforms);

  this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dragoLeft", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turnRight",
      frames: [ { key: "dragon", frame: 0 } ],
      frameRate: 20
    });

    this.anims.create({
      key: "turnLeft",
      frames: [ { key: "dragonIdleLeft", frame: 0 } ],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dragoRight", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "fly",
      frames: [ { key: "fly", frame: 2 } ],
      frameRate: 15,
      repeat: -1
    });
  }

  // Creates gems
  gemCreator(){
    this.gem = this.physics.add.group({
      key: "gem",
      repeat: 3,
      setXY:{x: 100, y: 10, stepX: 110}
    });
      this.physics.add.collider(this.gem, this.platforms);
      this.physics.add.overlap(this.dragonPlayer, this.gem, this.collection, null, this);
  }

  portal(){
    this.portal = this.physics.add.group({
      key:"portal",
      repeat: 1,
      setXY:{x: 600, y: 470, stepX: 500}
    });
    this.physics.add.collider(this.portal, this.platforms);
    this.physics.add.overlap(this.dragonPlayer, this.portal, this.nextLevel, null, this);
  }

  collection(player, gem){
    gem.disableBody(true, true);
    scoreCounter += 1;
    scoreTitle.setText('Score: ' + scoreCounter);
  }

  createEnemy(){
    this.ghost = this.physics.add.group({
      key: "ghost",
      repeat: 1,
      setXY:{x: 400, y: 10, stepX: 100}
    });

    this.ghost.children.iterate(function (child){
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.3));
    })
      // this.ghost.setBounce(2);
      this.physics.add.collider(this.ghost, this.platforms);
      this.physics.add.overlap(this.dragonPlayer, this.ghost, this.damage, null, this);
  }

  damage(player, ghost){
    health -= 1;
    healthTitle.setText('Health: ' + health + " out of 5");
    if (health <= 0){
      healthTitle.setText('Health: 0' + " out of 5");
      this.gameOverMsg.visible = true;
      this.gameOverMsg2.visible = true;
      this.physics.pause();
      player.setTint(0xff0000);
      this.gameOver = true;
    }

  }

  nextLevel(player, portal){
  this.scene.launch("Final");
  this.scene.start("Final");

  }

  // function for button controls
  buttonControls(){
    this.arrows = this.input.keyboard.createCursorKeys();
  }

//        ---Update---
  update(){

    if (this.arrows.left.isDown){
      this.dragonPlayer.setVelocityX(-160);
      this.dragonPlayer.anims.play("left", true);

    }else if (this.arrows.right.isDown){
      this.dragonPlayer.setVelocityX(160);
      this.dragonPlayer.anims.play("right", true);

    }else{
      this.dragonPlayer.setVelocityX(0);
      this.dragonPlayer.anims.play("turnRight");
    }
    // plays flying animation
    if (this.arrows.up.isDown && this.dragonPlayer.body.blocked.down){
      this.dragonPlayer.setVelocityY(-240);
      this.dragonPlayer.anims.play("fly");
    }
  }
}
