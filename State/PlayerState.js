class PlayerState {
  constructor() {
    this.hero = {
      hero1: {
        id: "hero1",
        ...enemies.hero1,
      },
      hero2: {
        id: "hero2",
        ...enemies.hero2,
      },
      hero3: {
        id: "hero3",
        ...enemies.hero3,
      },
      hero4: {
        id: "hero4",
        ...enemies.hero4,
      },
    };
    this.lineup = ["hero1","hero2","hero3","hero4"];
    this.items = [
      { actionId: "Potion1", instanceId: "item1" },
      { actionId: "Potion1", instanceId: "item2" },
      { actionId: "Potion1", instanceId: "item3" },
      { actionId: "Potion1", instanceId: "item4" },
      { actionId: "Potion1", instanceId: "item5" },
      { actionId: "Potion1", instanceId: "item6" },
      { actionId: "Potion1", instanceId: "item7" },
      { actionId: "Potion1", instanceId: "item8" },
      { actionId: "Potion1", instanceId: "item9" },
      { actionId: "Potion1", instanceId: "item10" },
      { actionId: "Potion2", instanceId: "item11" },
      { actionId: "Potion2", instanceId: "item12" },
      { actionId: "Potion2", instanceId: "item13" },
      { actionId: "Potion2", instanceId: "item14" },
      { actionId: "Potion2", instanceId: "item15" },
      { actionId: "Potion3", instanceId: "item16" },
      { actionId: "Potion3", instanceId: "item17" },
      { actionId: "Potion3", instanceId: "item18" },
      { actionId: "Elixir1", instanceId: "item19" },
      { actionId: "Elixir1", instanceId: "item20" },
      { actionId: "Elixir1", instanceId: "item21" },
      { actionId: "Elixir1", instanceId: "item22" },
      { actionId: "Elixir1", instanceId: "item23" },
      { actionId: "Elixir1", instanceId: "item24" },
      { actionId: "Elixir1", instanceId: "item25" },
      { actionId: "Elixir1", instanceId: "item26" },
      { actionId: "Elixir2", instanceId: "item27" },
      { actionId: "Elixir2", instanceId: "item28" },
      { actionId: "Elixir2", instanceId: "item29" },
      { actionId: "Elixir3", instanceId: "item30" },
    ];
    this.storyFlags = {};
  }
}
window.playerState = new PlayerState();
