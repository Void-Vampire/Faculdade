class TurnCycle {
  constructor({ battle, onNewEvent, onWinner }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.onWinner = onWinner;
    this.currentTeam = "hero"; //or "enemy"
  }

  async turn() {
    //Get the caster
    const casterId = this.battle.activeCombatants[this.currentTeam];
    const caster = this.battle.combatants[casterId];
    const enemyId = this.battle.activeCombatants[caster.team === "hero" ? "enemy" : "hero"]
    const enemy = this.battle.combatants[enemyId];

    const submission = await this.onNewEvent({
      type: "submissionMenu",
      caster,
      enemy
    })

    if (submission.instanceId) {

      // Adicionar a lista para persistir no Player State mais tarde
      this.battle.usedInstaceIds[submission.instanceId] = true;

      // Removendo Items da Batalha
      this.battle.items = this.battle.items.filter(i => i.instanceId !== submission.instanceId)
    }

    const resultingEvents = caster.getReplacedEvents(submission.action.success);
    
    for (let i=0; i<resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target,
      }
      await this.onNewEvent(event);
    }

    // Verificar se o Alvo Morreu
    const targetDead = submission.target.hp <= 0;
    if (targetDead) {
      await this.onNewEvent({ 
        type: "textMessage", text: `${submission.target.name} Caiu!`
      })

      if (submission.target.team === "enemy") {

        const playerActiveHeroId = this.battle.activeCombatants.hero;
        const xp = submission.target.givesXp;

        await this.onNewEvent({
          type: "textMessage",
          text: `Gained ${xp} XP!`
        })
        await this.onNewEvent({
          type: "giveXp",
          xp,
          combatant: this.battle.combatants[playerActiveHeroId]
        })
      }
    }

    // Verificar Equipe Vencedora
    const winner = this.getWinningTeam();
    if (winner) {
      await this.onNewEvent({
        type: "textMessage",
        text: "Winner!"
      })
      if (typeof this.onWinner === "function") {
        this.onWinner(winner);
      } else {
        console.error("onWinner is not a function:", this.onWinner);
      }
      return;
    }

    //Verficar Eventos Pós Turno
    //(Fazer alguma coisa após o turno)
    const postEvents = caster.getPostEvents();
    for (let i=0; i < postEvents.length; i++ ) {
      const event = {
        ...postEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target, 
      }
      await this.onNewEvent(event);
    }

    //Check for status expire
    const expiredEvent = caster.decrementStatus();
    if (expiredEvent) {
      await this.onNewEvent(expiredEvent)
    }

    this.nextTurn();
  }

  nextTurn() {
    this.currentTeam = this.currentTeam === "hero" ? "enemy" : "hero";
    this.turn();
  }

  getWinningTeam() {
    let aliveTeams = {};
    Object.values(this.battle.combatants).forEach(c => {
      if (c.hp > 0) {
        aliveTeams[c.team] = true;
      }
    })
    if (!aliveTeams["hero"]) { return "enemy"}
    if (!aliveTeams["enemy"]) { return "hero"}
    return null;
  }

  async init() {
    await this.onNewEvent({
      type: "textMessage",
      text: "The battle is starting!"
    })

    //Start the first turn!
    this.turn();

  }

}