class SceneMain extends Phaser.Scene{
  constructor(){
    super("SceneMain");
  }
  preload(){
  this.load.image("titleScreen", "assets/titleScreen.png");
}
  create(){
    console.log('GO')
    this.title = this.add.image(-100,0, "titleScreen");
    this.title.setOrigin(0, 0);
    this.title.setScale(2.8);

    this.add.text(200, 290, "Welcome to A Dragon's Life!",{ fontsize: "200px"});
    this.add.text(160, 350, "Click anywhere in the game to start.",{ fontsize: "40px"});
    this.input.on("pointerdown", () => this.scene.start("playGame"));
    // this.scene.start("playGame");
  }
  update(){}
}
