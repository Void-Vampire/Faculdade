class PlayerState {
    constructor() {
        this.hero = {
            "hero1": {
                id: "hero1",
                ...enemies.hero1,
            },
            "hero2": {
                id: "hero2",
                ...enemies.hero2,
            }
        }
        this.lineup = ["hero1","hero2"];
        this.items = [
            { actionId: "Potion1", instanceId: "item1" },
            { actionId: "Potion1", instanceId: "item2" },
            { actionId: "Potion1", instanceId: "item3" },
        ]
    }
}
window.playerState = new PlayerState();