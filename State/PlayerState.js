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
            },
            "hero3": {
                id: "hero3",
                ...enemies.hero3,
            },
            "hero4": {
                id: "hero4",
                ...enemies.hero4,
            }
        }
        this.lineup = ["hero1","hero2","hero3","hero4"];
        this.items = [
            { actionId: "Potion1", instanceId: "item1" },
            { actionId: "Potion1", instanceId: "item2" },
            { actionId: "Potion1", instanceId: "item3" },
        ]
        this.storyFlags = {
        };
    }
}
window.playerState = new PlayerState();