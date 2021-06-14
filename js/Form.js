class Form {

    constructor() {
        this.input = createInput("Name");
        this.button = createButton('Play');
        this.Resetbtn = createButton("Reset");
        this.greeting = createElement('h2');
    }
    hide() {
        this.title.hide();
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
    }

    display() {
        this.title = createElement('h2')
        this.title.html("Car Racing Game");
        this.title.position(displayWidth / 2, 50);

        this.input.position(displayWidth / 2 - 100, displayHeight / 2 - 100);
        this.button.position(displayWidth / 2 - 50, displayHeight / 2);
        this.Resetbtn.position(displayWidth - 200, 50);

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello " + player.name)
            this.greeting.position(displayWidth / 2, displayHeight / 2);
        });
        this.Resetbtn.mousePressed(() => {
            game.update(0);
            player.updateCount(0);
            database.ref("/").update({
                players: null,
                finishPlayers: 0
            });
        });
    }
}