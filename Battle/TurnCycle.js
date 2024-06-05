class TurnCycle {
  constructor({ battle, onNewEvent, onWinner }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.onWinner = onWinner;
    this.currentTeamIndex = 0; // Índice da equipe atual na lista de equipes ativas
    this.teams = ["hero", "enemy"];
    this.totalEnemyXP = 0;
  }

  async turn() {
    const currentTeam = this.teams[this.currentTeamIndex];
    const activeCombatants = this.battle.activeCombatants[currentTeam];

    // Loop através dos combatentes ativos do time atual
    for (let i = 0; i < activeCombatants.length; i++) {
      const casterId = activeCombatants[i];
      const caster = this.battle.combatants[casterId];
      const enemyTeam = currentTeam === "hero" ? "enemy" : "hero";
      const enemyTeamCombatants = this.battle.activeCombatants[enemyTeam];
      const randomEnemyIndex = Math.floor(
        Math.random() * enemyTeamCombatants.length
      );
      const enemyId = enemyTeamCombatants[randomEnemyIndex];
      const enemy = this.battle.combatants[enemyId];

      // Obter ação do jogador e processar
      const submission = await this.onNewEvent({
        type: "submissionMenu",
        caster,
        enemy,
      });

      if (submission.instanceId) {
        //Add to list to persist to player state later
        this.battle.usedInstanceIds[submission.instanceId] = true;

        //Removing item from battle state
        this.battle.items = this.battle.items.filter(
          (item) => item.instanceId !== submission.instanceId
        );
      }

      // Processar eventos resultantes da ação do jogador
      console.log("Status atual:", caster.statusEffects);
      const resultingEvents = caster.getReplacedEvents(
        submission.action.success
      );
      for (let i = 0; i < resultingEvents.length; i++) {
        const event = {
          ...resultingEvents[i],
          submission,
          action: submission.action,
          caster,
          target: submission.target,
        };
        await this.onNewEvent(event);
      }

      // Remover combatente se o alvo estiver sem vida
      if (submission.target.hp <= 0) {
        const targetTeam = submission.target.team;
        const targetIndex = this.battle.activeCombatants[targetTeam].indexOf(
          submission.target.id
        );
        if (targetIndex !== -1) {
          this.battle.activeCombatants[targetTeam].splice(targetIndex, 1);

          // Verificar se o alvo é um inimigo e exibir uma mensagem de morte
          if (submission.target.team === "enemy") {
            await this.onNewEvent({
              type: "textMessage",
              text: `${submission.target.name} foi derrotado!`,
            });
          }
        }
        if (submission.target.team === "enemy") {
          this.totalEnemyXP += submission.target.givesXp; // Acumular experiência dos inimigos
          console.log(this.totalEnemyXP);
        }
      }

      // Execute post-turn events
      const postEvents = [];
      Object.values(this.battle.combatants).forEach((caster) => {
        if (caster.hp > 0) {
          postEvents.push(...caster.getPostEvents());
        }
      });
      for (let l = 0; l < postEvents.length; l++) {
        const event = {
          ...postEvents[l],
          submission,
          action: submission.action,
          caster,
          target: submission.target,
        };
        await this.onNewEvent(event);
      }

      const winner = this.getWinningTeam();
      if (winner) {
        await this.onNewEvent({
          type: "textMessage",
          text: winner === "hero" ? "Vitória!" : "Derrota!",
        });
        this.distributeEnemyXP();
        this.onWinner(winner); // Chama o manipulador de evento para informar o vencedor
        return; 
      }
      // Verificar se a batalha terminou
    }

    const expiredEvents = [];
    Object.values(this.battle.combatants).forEach((caster) => {
      const expiredEvent = caster.decrementStatus();
      if (expiredEvent) {
        expiredEvents.push(expiredEvent);
      }
    });
    for (let k = 0; k < expiredEvents.length; k++) {
      await this.onNewEvent(expiredEvents[k]);
    }

    // Avançar para o próximo turno
    this.nextTurn();
  }

  nextTurn() {
    this.currentTeamIndex = (this.currentTeamIndex + 1) % this.teams.length;
    this.turn(); // Chama o próximo turno
  }

  async distributeEnemyXP() {
    const heroCount = Object.values(this.battle.combatants).filter(c => c.team === "hero").length;
    const xpPerHero = Math.floor(this.totalEnemyXP / heroCount);
    for (const c of Object.values(this.battle.combatants)) {
      if (c.team === "hero") {
        const event = {
          type: "giveXp",
          xp: xpPerHero,
          combatant: c
        };
        const battleEvent = new BattleEvent(event, this.battle);
      await new Promise(resolve => {
        battleEvent.giveXp(resolve);
      });
  
        // Mostrar a mensagem de quanto de exp o personagem ganhou
        await this.onNewEvent({
          type: "textMessage",
          text: `${c.name} gained ${xpPerHero} XP!`
        });
      }
    }
  }

  getWinningTeam() {
    let aliveTeams = {};
    Object.values(this.battle.combatants).forEach((c) => {
      if (c.hp > 0) {
        aliveTeams[c.team] = true;
      }
    });
    if (!aliveTeams["hero"]) {
      return "enemy";
    }
    if (!aliveTeams["enemy"]) {
      return "hero";
    }
    return null;
  }

  async init() {
    await this.onNewEvent({
      type: "textMessage",
      text: "A Batalha está começando!",
    });

    // Iniciar o primeiro turno
    this.turn();
  }
}
