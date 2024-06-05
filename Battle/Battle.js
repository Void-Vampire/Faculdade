class Battle {
  constructor({ onComplete, enemy }) {
    this.enemy = enemy;
    this.onComplete = onComplete;
    this.combatants = {};

    this.activeCombatants = {
      hero: [],
      enemy: [],
    };

    // Adiciona a música de fundo
    this.backgroundMusic = new Audio(this.enemy.music);
    this.backgroundMusic.loop = true; 
    this.backgroundMusic.volume = this.enemy.musicVolume || 0.1;

    // Hero Team
    window.playerState.lineup.forEach((id) => {
      this.addCombatant(id, "hero", window.playerState.hero[id]);
    });

    // Enemy Team
    Object.keys(this.enemy.enemies).forEach((key) => {
      this.addCombatant("e_" + key, "enemy", this.enemy.enemies[key]);
    });

    // Armazenar Items
    this.items = [];

    // Adiciona na batalha os items dos Herois
    window.playerState.items.forEach((item) => {
      this.items.push({
        ...item,
        team: "hero",
      });
    });
    this.usedInstanceIds = {}; // Armazena os itens usados
  }

  addCombatant(id, team, config) {
    this.combatants[id] = new Combatant(
      {
        ...window.enemies[config.id],
        ...config,
        team,
        isPlayerControlled: team === "hero",
      },
      this
    );

    this.activeCombatants[team].push(id);
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Battle");
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);

    // Iniciar a reprodução da música de fundo
    this.backgroundMusic.play();


    // Inicialia os Combatant
    Object.keys(this.combatants).forEach((key) => {
      let combatant = this.combatants[key];
      combatant.id = key;
      combatant.init(this.element);
    });

    // Inicia o ciclo de turnos
    this.turnCycle = new TurnCycle({
      battle: this,
      onNewEvent: (event) => {
        return new Promise((resolve) => {
          const battleEvent = new BattleEvent(event, this);
          battleEvent.init(resolve);
        });
      },
      onWinner: async (winner) => {
        console.log("Winner is:", winner);

        // Pausa a música de fundo ao fim da batalha
        this.backgroundMusic.pause();

        if (winner === "hero") {
          const playerState = window.playerState;
          // Atualiza o estado dos heróis no playerState
          Object.keys(playerState.hero).forEach((id) => {
            const playerStateHero = playerState.hero[id];
            const combatant = this.combatants[id];
            if (combatant) {
              playerStateHero.hp = combatant.hp > 0 ? combatant.hp : 1;
              playerStateHero.xp = combatant.xp;
              playerStateHero.maxXp = combatant.maxXp;
              playerStateHero.level = combatant.level;
            }
          });

          //Remover itens usado na batalha
          playerState.items = playerState.items.filter((item) => {
            return !this.usedInstanceIds[item.instanceId];
          });
        }

        this.element.remove();
        this.onComplete(winner === "hero");
      },
    });
    this.turnCycle.init();
  }
}
