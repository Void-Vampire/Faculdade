class Battle {
  constructor({onComplete, enemy }) {

    this.enemy = enemy;
    this.onComplete = onComplete;
    console.log("Enemy:", enemy);

this.combatants = {}

  this.activeCombatants = {
    hero: null,
    enemy: null,
  }

  // Hero Team
  if (window.playerState && window.playerState.lineup) {
    window.playerState.lineup.forEach((id) => {
      this.addCombatant(id, "hero", window.playerState.hero[id]);
    });
  } else {
    console.error("Player state lineup is missing.");
  }

  // Enemy Team
  
    // Se todos os níveis de propriedade existirem, prossiga
    Object.keys(this.enemy.enemies).forEach((key) => {
      this.addCombatant("e_" + key, "enemy", this.enemy.enemies[key]);
    });

  // Começa Vazio
  this.items = [];

  // Adiciona na batalha os items dos Herois
  window.playerState.items.forEach(item => {
    this.items.push({
      ...item,
      team: "hero"
    })
  })
  this.usedInstanceIds = {}; 
}

addCombatant(id, team, config) {
  if (!config || !config.id) {
    console.error("Invalid config or id missing for combatant:", id);
    return;
  }

  this.combatants[id] = new Combatant({
    ...window.enemies[config.id],
    ...config,
    team,
    isPlayerControlled: team === "hero",
  }, this);

  console.log(this);
  this.activeCombatants[team] = this.activeCombatants[team] || id;
}

  createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("Battle");
    }

    init(container) {

      this.createElement();
      container.appendChild(this.element);
  
      Object.keys(this.combatants).forEach(key => {
        let combatant = this.combatants[key];
        combatant.id = key;
        combatant.init(this.element)
      })
      
      this.turnCycle = new TurnCycle({
        battle: this,
        onNewEvent: event => {
          return new Promise(resolve => {
            const battleEvent = new BattleEvent(event, this)
            battleEvent.init(resolve);
          })
        },
        onWinner: winner => {
          console.log("Winner is:", winner);

          if (winner === "hero") {
            const playerState = window.playerState;
            Object.keys(playerState.hero).forEach(id => {
              const playerStateHero = playerState.hero[id];
              const combatant = this.combatants[id];
              if (combatant) {
                playerStateHero.hp = combatant.hp;
                playerStateHero.xp = combatant.xp;
                playerStateHero.maxXp = combatant.maxXp;
                playerStateHero.level = combatant.level;
              }
            })

            //Remover itens usado na batalha
            playerState.items = playerState.items.filter(item => {
              return !this.usedInstanceIds[item.instanceId]
            })

          }
          
          this.element.remove();
          this.onComplete();
        }
      })
      this.turnCycle.init();
    }
}


