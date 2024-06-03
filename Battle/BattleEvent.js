class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  textMessage(resolve) {
    const text = this.event.text
      .replace("{CASTER}", this.event.caster?.name)
      .replace("{TARGET}", this.event.target?.name)
      .replace("{ACTION}", this.event.action?.name);
    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      },
    });
    message.init(this.battle.element);
  }

  async stateChange(resolve) {
    const {
      caster,
      target,
      damage,
      damageX,
      armor,
      status,
      potionRecover,
      potionManaRecover,
      recover,
      RecoverX,
      attackModifier,
      absorbPercent,
      MagicDamage,
      magicModifier,
      mpCost,
      MagicDamageX,
      berserk,
      attackBoost,
      magicAttackBoost,
      healthDamage,
      VampirismHP,
      VampirismMP,
    } = this.event;
    let who = this.event.onCaster ? caster : target;

    console.log("Evento StateChange:", this.event);

    // Reduzir o MP Após usar uma magia
    if (mpCost) {
      caster.update({
        mp: caster.mp - mpCost,
      });
    }

    let affectedMembers = [];

    if (healthDamage) {
      let damageAmount = Math.floor(target.hp * (healthDamage / 100));
      target.update({
        hp: target.hp - damageAmount,
      });

      // Verificar se o alvo foi derrotado
      if (target.hp <= 0) {
        // Remover o elemento do sprite do DOM
        target.spriteElement.remove();
      } else {
        // Iniciar animação de dano
        target.spriteElement.classList.add("battle-damage-blink");

        affectedMembers.push(target);
      }
    }

    // Aplicar Berserk
    if (berserk) {
      let berserkDamage = Math.ceil(caster.hp * berserk);
      let newHp = caster.hp - berserkDamage;
      // Se o novo HP for menor ou igual a 0, defina-o como 1
      if (newHp <= 0) {
        newHp = 1;
      }
      caster.update({
        hp: newHp,
      });
    }

    if (damage) {
      // Calcular dano efetivo
      let effectiveDamage = damage + caster.attack * (attackModifier || 0);
      effectiveDamage = Math.max(effectiveDamage - target.defense, 1);

      // Arredondar o dano efetivo para baixo
      effectiveDamage = Math.floor(effectiveDamage);

      // Aplicar dano ao alvo
      target.update({
        hp: target.hp - effectiveDamage,
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

    if (damageX) {
      Object.values(this.battle.combatants).forEach((member) => {
        if (member.team === target.team) {
          let effectiveDamageX =
            damageX + caster.attack * (attackModifier || 0);
          effectiveDamageX = Math.max(effectiveDamageX - member.defense, 1);

          effectiveDamageX = Math.floor(effectiveDamageX);

          let newHp = member.hp - effectiveDamageX;
          if (newHp <= 0 && member !== target) {
            newHp = 1; // Garantir que todos, exceto o target, sobrevivam com 1 de HP
          }

          member.update({
            hp: newHp,
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

    if (MagicDamage) {
      let effectiveMagicDamage =
        MagicDamage + caster.magicAttack * (magicModifier || 0);
      effectiveMagicDamage = Math.max(
        effectiveMagicDamage - target.magicDefense,
        1
      );

      effectiveMagicDamage = Math.floor(effectiveMagicDamage);

      // Aplicar dano mágico ao alvo
      target.update({
        hp: target.hp - effectiveMagicDamage,
      });

      // Curar o atacante se houver absorbPercent
      if (absorbPercent) {
        let absorbAmount = Math.floor(effectiveMagicDamage * absorbPercent);
        let newHp = caster.hp + absorbAmount;
        if (newHp > caster.maxHp) {
          newHp = caster.maxHp;
        }
        caster.update({
          hp: newHp,
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
      Object.values(this.battle.combatants).forEach((member) => {
        if (member.team === target.team) {
          let effectiveMagicDamageX =
            MagicDamageX + caster.magicAttack * (magicModifier || 0);
          effectiveMagicDamageX = Math.max(
            effectiveMagicDamageX - member.magicDefense,
            1
          );

          effectiveMagicDamageX = Math.floor(effectiveMagicDamageX);

          let newHp = member.hp - effectiveMagicDamageX;
          if (newHp <= 0 && member !== target) {
            newHp = 1; // Garantir que todos, exceto o target, sobrevivam com 1 de HP
          }

          member.update({
            hp: newHp,
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
        hp: newHp,
      });
    }

    if (VampirismHP && VampirismMP) {
      // Calcula 10% da vida máxima do usuário
      const hpToSacrifice = Math.floor(caster.maxHp * (VampirismHP / 100));
      const mpRecovered = VampirismMP; // Valor de MP a ser recuperado
    
      // Reduzir a quantidade de HP equivalente à porcentagem da vida máxima do usuário
      const newHp = Math.max(caster.hp - hpToSacrifice, 1); // Garante que o HP não seja menor que 1
      caster.update({
        hp: newHp,
      });
    
      // Recuperar o MP definido em VampirismMP
      const newMp = caster.mp + mpRecovered;
      const maxMp = caster.maxMp;
      caster.update({
        mp: Math.min(newMp, maxMp),
      });
    }

    if (RecoverX) {
      // Aplicar cura a todos os membros da equipe do Caster
      Object.values(this.battle.combatants).forEach((member) => {
        if (member.team === caster.team) {
          let recoverAmount = Math.floor(
            RecoverX + caster.magicAttack * (magicModifier || 0)
          );
          console.log(recoverAmount);
          let newHp = member.hp + recoverAmount;
          if (newHp > member.maxHp) {
            newHp = member.maxHp;
          }
          member.update({
            hp: newHp,
          });
        }
      });
    }

    if (potionRecover) {
      // Aplicar cura a todos os membros da equipe do Caster
      Object.values(this.battle.combatants).forEach((member) => {
        if (member.team === caster.team) {
          let newHp = member.hp + potionRecover;
          if (newHp > member.maxHp) {
            newHp = member.maxHp;
          }
          member.update({
            hp: newHp,
          });
        }
      });
    }

    if (potionManaRecover) {
      // Aplicar cura a todos os membros da equipe do Caster
      Object.values(this.battle.combatants).forEach((member) => {
        if (member.team === caster.team) {
          let newMp = member.mp + potionManaRecover;
          if (newMp > member.maxMp) {
            newMp = member.maxMp;
          }
          member.update({
            mp: newMp,
          });
        }
      });
    }

    if (armor) {
      // Adicione esta linha para verificar quem está recebendo a armadura
      console.log(`${who.name} recebeu +${armor} de armadura`);
      who.update({
        defense: who.originalDefense + armor,
      });
    }

    if (attackBoost) {
      who.update({
        attack: who.originalAttack + attackBoost,
      });
    }

    if (magicAttackBoost) {
      who.update({
        magicAttack: who.originalMagicAttack + magicAttackBoost,
      });
    }

    if (status) {
      who.applyStatus(status);
    }

    if (status === null) {
      who.update({
        status: null,
      });
    }

    //Wait a little bit
    await utils.wait(600);

    //stop blinking
    affectedMembers.forEach((member) => {
      member.spriteElement.classList.remove("battle-damage-blink");
    });
    resolve();
  }

  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      items: this.battle.items,
      onComplete: (submission) => {
        //submission { what move to use, who to use it on }
        console.log("Submissão selecionada:", submission);
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  async giveXp(resolve) {
    let amount = this.event.xp;
    const { combatant } = this.event;

    while (amount > 0) {
      amount -= 1;
      combatant.xp += 1;

      // Verificar se houve aumento de nível
      if (combatant.xp >= combatant.maxXp) {
        combatant.xp = 0;
        combatant.level += 1;

        // Aumentar os status do combatente de acordo com o nível
        if (combatant.level <= 5) {
          combatant.maxHp = Math.floor(combatant.maxHp * 1.3);
          combatant.maxMp = Math.floor(combatant.maxMp * 1.3);
          combatant.attack = Math.floor(combatant.attack * 1.3);
          combatant.defense = Math.floor(combatant.defense * 1.3);
          combatant.magicAttack = Math.floor(combatant.magicAttack * 1.3);
          combatant.magicDefense = Math.floor(combatant.magicDefense * 1.3);
          combatant.maxXp = Math.floor(combatant.maxXp * 1.3);
        } else if (combatant.level > 5 && combatant.level <= 10) {
          combatant.maxHp = Math.floor(combatant.maxHp * 1.2);
          combatant.maxMp = Math.floor(combatant.maxMp * 1.2);
          combatant.attack = Math.floor(combatant.attack * 1.2);
          combatant.defense = Math.floor(combatant.defense * 1.2);
          combatant.magicAttack = Math.floor(combatant.magicAttack * 1.2);
          combatant.magicDefense = Math.floor(combatant.magicDefense * 1.2);
          combatant.maxXp = Math.floor(combatant.maxXp * 1.35);
        } else if (combatant.level > 10 && combatant.level <= 20) {
          combatant.maxHp = Math.floor(combatant.maxHp * 1.15);
          combatant.maxMp = Math.floor(combatant.maxMp * 1.15);
          combatant.attack = Math.floor(combatant.attack * 1.15);
          combatant.defense = Math.floor(combatant.defense * 1.15);
          combatant.magicAttack = Math.floor(combatant.magicAttack * 1.15);
          combatant.magicDefense = Math.floor(combatant.magicDefense * 1.15);
          combatant.maxXp = Math.floor(combatant.maxXp * 1.4);
        } else if (combatant.level > 20 && combatant.level <= 40) {
          combatant.maxHp = Math.floor(combatant.maxHp * 1.1);
          combatant.maxMp = Math.floor(combatant.maxMp * 1.1);
          combatant.attack = Math.floor(combatant.attack * 1.1);
          combatant.defense = Math.floor(combatant.defense * 1.1);
          combatant.magicAttack = Math.floor(combatant.magicAttack * 1.1);
          combatant.magicDefense = Math.floor(combatant.magicDefense * 1.1);
          combatant.maxXp = Math.floor(combatant.maxXp * 1.45);
        } else if (combatant.level > 40) {
          combatant.maxHp = Math.floor(combatant.maxHp * 1.05);
          combatant.maxMp = Math.floor(combatant.maxMp * 1.05);
          combatant.attack = Math.floor(combatant.attack * 1.05);
          combatant.defense = Math.floor(combatant.defense * 1.05);
          combatant.magicAttack = Math.floor(combatant.magicAttack * 1.05);
          combatant.magicDefense = Math.floor(combatant.magicDefense * 1.05);
          combatant.maxXp = Math.floor(combatant.maxXp * 1.5);
        }
        // Recuperar completamente os pontos de vida e pontos de magia após o aumento de nível
        combatant.hp = combatant.maxHp;
        combatant.mp = combatant.maxMp;
      }

      combatant.update();
      playerState.hero[combatant.id] = { ...combatant };
    }

    resolve();
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }

  init(resolve) {
    if (typeof this[this.event.type] === "function") {
      this[this.event.type](resolve);
    } else {
      console.error(`Tipo de evento desconhecido: ${this.event.type}`);
      resolve();
    }
  }
}
