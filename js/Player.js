class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.rank = 0;
    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            rank: this.rank
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    getRank() {
        var playerdb = database.ref('finishPlayers');
        playerdb.on("value", (data) => {
            finishPlayers = data.val();
        });
    }

    static UpdateRank() {
        database.ref("/").update({
            finishPlayers: finishPlayers + 1,
        });
        this.rank = this.rank + 1;
    }
}