var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var car1, car2, car3, car4, cars;
var c1, c2, c3, c4, track, ground, passfinish;
var finishPlayers = 0;

function preload() {
    c1 = loadImage("images/car1.png");
    c2 = loadImage("images/car2.png");
    c3 = loadImage("images/car3.png");
    c4 = loadImage("images/car4.png");
    track = loadImage("images/track.jpg");
    ground = loadImage("images/ground.png");
}

function setup() {
    canvas = createCanvas(displayWidth, displayHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();

}


function draw() {
    if (playerCount === 4) {
        game.update(1);
    }
    if (gameState === 1) {
        clear();
        game.play();
    }
    if (finishPlayers === 4) {
        game.update(2);
    }
    if (gameState === 2 && finishPlayers === 4) {
        game.displayRank();
    }
}