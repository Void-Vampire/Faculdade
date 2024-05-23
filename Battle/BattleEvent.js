class BattleEvent {
    constructor(event, battle) {
      this.event = event;
      this.battle = battle;
    }

textMessage(resolve) {

  const text = this.event.text
  .replace("{CASTER}", this.event.caster?.name)
  .replace("{TARGET}", this.event.target?.name)
  .replace("{ACTION}", this.event.action?.name)
    const message = new TextMessage({
        text,
        onComplete: () => {
          resolve();
        }
      })
      message.init( this.battle.element )
    }

    async stateChange(resolve) {
      const {caster, target, damage, armor, status, action, recover} = this.event;
      let who = this.event.onCaster ? caster : target;
      //if (action.targetType === "friendly") {
      //  who = caster;
      // }

      if (damage) {
        //modify the target to have less HP
        let effectiveDamage = Math.max(damage - target.defense, 1);
        target.update({
          hp: target.hp - effectiveDamage
        });
        //start blinking
        target.spriteElement.classList.add("battle-damage-blink");
      }

      if (recover) {
        let newHp = who.hp + recover;
        if (newHp > who.maxHp) {
          newHp = who.maxHp;
        }
        who.update({
          hp: newHp
        })
      }

      if (armor) {
        who.update({
          defense: who.defense + armor
        });
      }

      if (status) {
        who.update({
          status: {...status}
        })
      }
      if (status === null) {
        who.update({
          status: null
        })
      }

      //Wait a little bit
    await utils.wait(600)

    //stop blinking
    target.spriteElement.classList.remove("battle-damage-blink");
    resolve();
    }

    submissionMenu(resolve) {
      const menu = new SubmissionMenu({
        caster: this.event.caster,
        enemy: this.event.enemy,
        items: this.battle.items,
        onComplete: submission => {
          //submission { what move to use, who to use it on }
          resolve(submission)
        }
      })
      menu.init( this.battle.element )
    }

    giveXp(resolve) {
      let amount = this.event.xp;
      const {combatant} = this.event;
      const step = () => {
        if (amount > 0) {
          amount -= 1;
          combatant.xp += 1;
  
          //Check if we've hit level up point
          if (combatant.xp === combatant.maxXp) {
            combatant.xp = 0;
            combatant.maxXp = 100;
            combatant.level += 1;
          }
  
          combatant.update();
          requestAnimationFrame(step);
          return;
        }
        resolve();
      }
      requestAnimationFrame(step);
    }

    animation(resolve) {
      const fn = BattleAnimations[this.event.animation];
      fn(this.event, resolve);
    }

    

      init(resolve) {
        this[this.event.type](resolve);
      }
}

    