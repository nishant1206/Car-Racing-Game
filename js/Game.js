class Game {
    constructor() {}

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        car1 = createSprite(100, 200);
        car2 = createSprite(300, 200);
        car3 = createSprite(500, 200);
        car4 = createSprite(700, 200);
        cars = [car1, car2, car3, car4];
        car1.addImage(c1);
        car2.addImage(c2);
        car3.addImage(c3);
        car4.addImage(c4);
        passfinish = false;
    }

    play() {
        form.hide();
        textSize(30);
        text("Game Start", 120, 100)
        Player.getPlayerInfo();
        player.getRank();

        if (allPlayers !== undefined) {
            background(ground);
            image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
            var index = 0;
            var x = 175;
            var y;

            for (var plr in allPlayers) {
                index += 1;
                x += 200;
                y = displayHeight - allPlayers[plr].distance;

                cars[index - 1].x = x;
                cars[index - 1].y = y;
                if (index === player.index) {
                    fill("red");
                    ellipse(x, y, 60, 60);
                    camera.position.x = displayWidth / 2;
                    camera.position.y = cars[index - 1].y;
                }

                textSize(15);
                text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);
            }
        }

        if (keyIsDown(UP_ARROW) && player.index !== null) {
            player.distance += 10
            player.update();
            console.log(player.distance);
        }

        if (player.distance > 3700 && passfinish == false) {
            Player.UpdateRank();
            player.rank = finishPlayers;
            player.update();
            passfinish = true;
        }

        drawSprites();

    }

    displayRank() {
        camera.position.x = 0;
        background("red");
        camera.position.y = 0;
        Player.getPlayerInfo();
        textSize(30);
        fill("black");
        for (var plr in allPlayers) {
            if (allPlayers[plr].rank == 1) {
                text("1st Rank : " + allPlayers[plr].name, 0, 20);
            } else if (allPlayers[plr].rank == 2) {
                text("2nd Rank : " + allPlayers[plr].name, 0, 120);
            } else if (allPlayers[plr].rank == 3) {
                text("3rd Rank : " + allPlayers[plr].name, 0, 220);
            } else {
                text("4th Rank : " + allPlayers[plr].name, 0, 320);
            }
        }
    }
}