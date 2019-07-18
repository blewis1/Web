var stateActions = { preload: preload, create: create, update: update };
var score = -102;
var labelScore;
var player;
var pipes = [];
var gapMargin = 30;
var gapSize = 100;
var blockHeight = 40;
var height = 400;
var width = 790;
var pipeVerticalSpeed = 50

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);

function preload() {
  game.load.image("PlayerImg", "../assets/flappy-cropped.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock", "../assets/pipe_mint.png")
  game.load.audio("USSR", "../assets/USSR.ogg");
  game.load.image("Russia", "../assets/city.jpg");
}
function create() {
    game.sound.play("USSR")
    game.physics.startSystem(Phaser.Physics.ARCADE);
    backgroundImage = game.add.sprite(0, 0, "Russia")
    backgroundImage.height = 400;
    backgroundImage.width = 790;
    player = game.add.sprite(50,200, "PlayerImg");
    labelScore = game.add.text(10,10,"0");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 200;
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    var pipeInterval = 2.5 * Phaser.Timer.SECOND;
    game.time.events.loop(
      pipeInterval,
      generatePipe
    );
    game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown
    .add(playerJump);
      generatePipe();
      ultimateMode()
  }
function update() {
   game.physics.arcade.overlap(player, pipes, gameOver);
   if(player.body.y<0){
     gameOver();
   }
  if(player.body.y>400-20){
    gameOver();
  }
 }
function spacebar() {

}
function generatePipe(){
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
  for (var y = gapStart; y > 0;y -= blockHeight) {
     addPipeBlock(width, y - blockHeight);
   }
  for (var y = gapStart + gapSize; y < height;y += blockHeight) {
     addPipeBlock(width, y);
   }
   game.time.events.loop(Phaser.Timer.SECOND, togglePipeVerticalMovement);
   changeScore();
}




function addPipeBlock(x, y) {
   var block = game.add.sprite(x, y, "pipeBlock");
   pipes.push(block);
   game.physics.arcade.enable(block)
   block.body.velocity.x = -150;

}
function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}
function playerJump() {
     player.body.velocity.y = -100
   }
function gameOver() {
    location.reload();
}
function togglePipeVerticalMovement() {
  for (var i = 0; i < pipes.length; i++) {
 pipes[i].body.velocity.y = -pipes[i].body.velocity.y;
 }
}

function ultimateMode() {
 score = score + 100;
 labelScore.setText(score.toString());
 game.time
 .events
 .loop(pipeInterval * Phaser.Timer.SECOND, generateHardPipe);
var text = game.add.text(220, 50, 'Ultimate Mode!',{font: "30px Tahoma", fill:"#b30047"});
text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
}
