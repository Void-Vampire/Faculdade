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
    const {caster, target, damage, armor, status, potionRecover,recover, attackModifier,absorbPercent, 
      MagicDamage,magicModifier,mpCost,MagicDamageX, berserk} = this.event;
    let who = this.event.onCaster ? caster : target;
    //if (action.targetType === "friendly") {
    //  who = caster;
    // }
    console.log("Evento StateChange:", this.event);

    // Reduzir o MP Após usar uma magia
    if (mpCost) {
      caster.update({
        mp: caster.mp - mpCost
      });    
    }

    let affectedMembers = [];

if (damage) {
  // Calcular dano efetivo
  let effectiveDamage = damage + (caster.attack * (attackModifier || 0));
  effectiveDamage = Math.max(effectiveDamage - target.defense, 1);

  // Aplicar Berserk
  if (berserk) {
    let berserkDamage = Math.ceil(caster.hp * berserk);
    let newHp = caster.hp - berserkDamage;
    caster.update({
      hp: Math.max(newHp)
    });
  }

  // Aplicar dano ao alvo
  target.update({
    hp: target.hp - effectiveDamage
  });

  // Iniciar animação de dano
  if (target.hp <= 0) {
    // Remover o elemento do sprite do DOM
    target.spriteElement.remove();
  } else {
    // Iniciar animação de dano
    target.spriteElement.classList.add("battle-damage-blink");

    affectedMembers.push(target);
  }
}


if (MagicDamage) {
  let effectiveMagicDamage = MagicDamage + (caster.magicAttack * (magicModifier || 0));
  effectiveMagicDamage = Math.max(effectiveMagicDamage - target.magicDefense, 1);
  console.log(effectiveMagicDamage)

  // Aplicar dano mágico ao alvo
  target.update({
    hp: target.hp - effectiveMagicDamage
  });

  // Curar o atacante se houver absorbPercent
  if (absorbPercent) {
    let absorbAmount = Math.floor(effectiveMagicDamage * absorbPercent);
    let newHp = caster.hp + absorbAmount;
    if (newHp > caster.maxHp) {
      newHp = caster.maxHp;
    }
    caster.update({
      hp: newHp
    });
}
if (target.hp <= 0) {
  // Remover o elemento do sprite do DOM
  target.spriteElement.remove();
} else {
  // Iniciar animação de dano
  target.spriteElement.classList.add("battle-damage-blink");

  affectedMembers.push(target);
}
}

if (MagicDamageX) {
  Object.values(this.battle.combatants).forEach(member => {
    if (member.team === target.team) {
      let effectiveMagicDamageX = MagicDamageX + (caster.magicAttack * (magicModifier || 0));
      effectiveMagicDamageX = Math.max(effectiveMagicDamageX - member.magicDefense, 1);

      let newHp = member.hp - effectiveMagicDamageX;
      if (newHp < 0) newHp = 0; // Garantir que o HP não fique negativo
      member.update({
        hp: newHp
      });

      affectedMembers.push(member);

      if (member.hp <= 0) {
        member.spriteElement.remove();
      } else {
        member.spriteElement.classList.add("battle-damage-blink");
      }
    }
  });
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

    if (potionRecover) {
      // Aplicar cura a todos os membros da equipe do Caster
      Object.values(this.battle.combatants).forEach(member => {
          if (member.team === caster.team) {
              let newHp = member.hp + potionRecover;
              if (newHp > member.maxHp) {
                  newHp = member.maxHp;
              }
              member.update({
                  hp: newHp
              });
          }
      });
  }

    if (armor) {
      // Adicione esta linha para verificar quem está recebendo a armadura
      console.log(`${who.name} recebeu +${armor} de armadura`);
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
  affectedMembers.forEach(member => {
    member.spriteElement.classList.remove("battle-damage-blink");
  });
  resolve();
  }

  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      items: this.battle.items,
      onComplete: submission => {
        //submission { what move to use, who to use it on }
        console.log("Submissão selecionada:", submission);
        resolve(submission)
      }
    })
    menu.init( this.battle.element )
  }

  giveXp(resolve) {
    let amount = this.event.xp;
    const { combatant } = this.event;
    const step = () => {
      if (amount > 0) {
        amount -= 1;
        combatant.xp += 1;
  
        // Check if we've hit level up point
        if (combatant.xp >= combatant.maxXp) {
          combatant.xp = 0;
          combatant.level += 1;
  
          console.log(`Level up! ${combatant.name} is now level ${combatant.level}`);
          console.log(`Before: HP ${combatant.maxHp}, Attack ${combatant.attack}, Defense ${combatant.defense}`);
  
          combatant.maxHp = Math.floor(combatant.maxHp * 1.3);
          combatant.hp = combatant.maxHp; // Optionally restore HP to the new max HP
          combatant.maxXp = Math.floor(combatant.maxXp * 1.3);
  
          // Increase other attributes by 30%
          combatant.attack = Math.floor(combatant.attack * 1.3);
          combatant.defense = Math.floor(combatant.defense * 1.3);
          combatant.magicAttack = Math.floor(combatant.magicAttack * 1.3);
          combatant.magicDefense = Math.floor(combatant.magicDefense * 1.3);
  
          console.log(`After: HP ${combatant.maxHp}, Attack ${combatant.attack}, Defense ${combatant.defense}`);
        }
  
        combatant.update();
        playerState.hero[combatant.id] = { ...combatant };
        requestAnimationFrame(step);
        return;
      }
      resolve();
    };
    requestAnimationFrame(step);
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  

  init(resolve) {
    console.log("Iniciando evento:", this.event.type);
    if (typeof this[this.event.type] === 'function') {
      this[this.event.type](resolve);
    } else {
      console.error(`Tipo de evento desconhecido: ${this.event.type}`);
      resolve();
    }
  }
}

  