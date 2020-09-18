var config ={
  type: Phaser.AUTO,
  width: 650,
  height: 580,
  physics:{
    default: "arcade",
    arcade: {
      gravity: {y:200},
      debug: true
    }
  },
  backgroundColor: 0X000000,
  scene: [SceneMain, Scene1, Scene2]
};

window.onload=function(){
  var game= new Phaser.Game(config);
}
