class Scene2 extends Phaser.Scene{
  constructor(){
    super("Final");
  }
  preload(){
  this.load.image("forestLevel", "assets/forest.png");
}
  create(){
    this.forest = this.add.image(-100,100, "forestLevel");
    this.forest.setOrigin(0, 0);
    this.forest.setScale(2.8);
    this.add.text(20,20, "Let's go!!");
    console.log("scene two!!")
  }
  update(){}
}
