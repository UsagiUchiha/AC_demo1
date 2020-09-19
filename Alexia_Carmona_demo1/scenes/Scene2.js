class Scene2 extends Phaser.Scene{
  constructor(){
    super("Final");
  }
  preload(){
    this.load.image("forestLevel", "assets/forestScene.png");
    this.load.image("path", "assets/path.png");
    this.load.image("ghost", "assets/ghost.png");
    this.load.image("platform", "assets/platform.png");
    this.load.image("gem", "assets/gem.png");
    this.load.image("chest", "assets/chest.png");

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
  create(){
    this.forest = this.add.image(-100,0, "forestLevel");
    this.forest.setOrigin(0, 0);
    this.forest.setScale(2.8);

    // calls platformBuilder, player, and enemy functions
    this.platformBuilder();
    this.playerCreation();
    this.createEnemy();

    this.buttonControls();
    this.gemCreator();
    this.chestCreate();
    this.createEnemy();

    this.gameOverMsg = this.add.text(200, 290, "GAME OVER", { fontsize: "200px", fontfamily: 'Grenze Gotisch', strokeThickness: 5, fill: "#900"});
    this.gameOverMsg.setOrigin(-.5);
    this.gameOverMsg.visible = false;
    this.gameOverMsg2 = this.add.text(100, 290, "Refresh to start over.", { fontsize: "200px", fontfamily: 'Grenze Gotisch', strokeThickness: 5, fill: "#900"});
    this.gameOverMsg2.setOrigin(-.5, -1.5);
    this.gameOverMsg2.visible = false;

    // win Message
    this.winMsg = this.add.text(200, 290, "You win!!!", { fontsize: "200px", setFontfamily: 'Grenze Gotisch', strokeThickness: 5, fill: "#090"});
    this.winMsg.setOrigin(-.5);
    this.winMsg.visible = false;

    this.winMsg2 = this.add.text(100, 290, "Refresh to play again.", { fontsize: "200px", setFontfamily: 'Grenze Gotisch', strokeThickness: 5, fill: "#090"});
    this.winMsg2.setOrigin(-.5, -1.5);
    this.winMsg2.visible = false;

// Score and health
    scoreTitle = this.add.text(20, 20, "Score: " + scoreCounter, { fontsize: "200px", setFontfamily: 'Grenze Gotisch', strokeThickness: 4, fill: "#090"});
    healthTitle = this.add.text(20, 40, "Health: " + health, { fontsize: "200px", setFontfamily: 'Grenze Gotisch', strokeThickness: 4, fill: "#090"});
  }


  platformBuilder(){
    this.platforms= this.physics.add.staticGroup();
    this.platforms.create(400, 568, "path").setScale(3).refreshBody();
    this.platforms.create(155, 300, "platform");
    this.platforms.create(100, 320, "platform");
  }

  // Player Animation
  playerCreation(){
    this.dragonPlayer = this.physics.add.sprite(100, 150, "dragon");
    this.dragonPlayer.body.setSize(100, 170, 200, 325);

    this.dragonPlayer.setBounce(0.2);

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

  gemCreator(){
    this.gem = this.physics.add.group({
      key: "gem",
      repeat: 3,
      setXY:{x: 200, y: 10, stepX: 100}
    });
      this.physics.add.collider(this.gem, this.platforms);
      this.physics.add.overlap(this.dragonPlayer, this.gem, this.collection, null, this);
  }

  chestCreate(){
    this.chest = this.physics.add.group({
      key:"chest",
      repeat: 1,
      setXY:{x: 600, y: 470, stepX: 500}
    });
    this.physics.add.collider(this.chest, this.platforms);
    this.physics.add.overlap(this.dragonPlayer, this.chest, this.winState, null, this);
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
      setXY:{x: 220, y: 200, stepX: 100}
    });
    this.ghost.children.iterate(function (child){
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    })
      this.physics.add.collider(this.ghost, this.platforms);
      this.physics.add.overlap(this.dragonPlayer, this.ghost, this.damage, null, this);
  }

  damage(player, ghost){;
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

// If player wins(goes to chest)
  winState(player, chest){
    this.winMsg.visible = true;
    this.winMsg2.visible = true;
    this.physics.pause();
  }

  // function for button controls
  buttonControls(){
    this.arrows = this.input.keyboard.createCursorKeys();
  }


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
