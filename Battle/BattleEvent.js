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
      damageBreak,
      damageX,
      armor,
      status,
      potionRecover,
      potionManaRecover,
      manaRecover,
      recover,
      RecoverX,
      attackModifier,
      absorbPercent,
      MagicDamage,
      magicModifier,
      mpCost,
      magicDamageBreak,
      MagicDamageX,
      berserk,
      attackBoost,
      magicAttackBoost,
      magicDefenseBoost,
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
        target.hudElement.remove();
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
        target.hudElement.remove();
      } else {
        // Iniciar animação de dano
        target.spriteElement.classList.add("battle-damage-blink");

        affectedMembers.push(target);
      }
    }

    if (damageBreak) {
      // Calcular dano efetivo ignorando a defesa do alvo
      let effectiveDamage = Math.floor(damageBreak + caster.attack * (attackModifier || 0));

      // Certificar-se de que o dano efetivo seja pelo menos 1
      effectiveDamage = Math.max(effectiveDamage, 1);

      // Aplicar dano ao alvo
      target.update({
          hp: target.hp - effectiveDamage,
      });

      // Iniciar animação de dano
      if (target.hp <= 0) {
          // Remover o elemento do sprite do DOM
          target.spriteElement.remove();
          target.hudElement.remove();
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

          if (member.hp >= 1) {
            if (newHp <= 0 && member !== target) {
             newHp = 1; // Garantir que todos, exceto o target, sobrevivam com 1 de HP
           }
         }

          member.update({
            hp: newHp,
          });

          affectedMembers.push(member);

          if (member.hp <= 0) {
            member.spriteElement.remove();
            member.hudElement.remove();
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
        target.hudElement.remove();
      } else {
        // Iniciar animação de dano
        target.spriteElement.classList.add("battle-damage-blink");

        affectedMembers.push(target);
      }
    }

    if (magicDamageBreak) {
      // Calcular dano efetivo ignorando a defesa do alvo
      let effectiveMagicDamage = Math.floor(magicDamageBreak + caster.magicAttack * (magicModifier || 0));

      // Certificar-se de que o dano efetivo seja pelo menos 1
      effectiveMagicDamage = Math.max(effectiveMagicDamage, 1);

      // Aplicar dano ao alvo
      target.update({
          hp: target.hp - effectiveMagicDamage,
      });

      // Iniciar animação de dano
      if (target.hp <= 0) {
          // Remover o elemento do sprite do DOM
          target.spriteElement.remove();
          target.hudElement.remove();
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

          if (member.hp >= 1) {
           if (newHp <= 0 && member !== target) {
            newHp = 1; // Garantir que todos, exceto o target, sobrevivam com 1 de HP
          }
        }
        

          member.update({
            hp: newHp,
          });

          affectedMembers.push(member);

          if (member.hp <= 0) {
            member.spriteElement.remove();
            member.hudElement.remove();
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

    if (manaRecover) {
      let mpRecovered = Math.floor(manaRecover + caster.magicAttack * (magicModifier || 0));
      let newMp = caster.mp + mpRecovered;
      if (newMp > caster.maxMp) {
        newMp = caster.maxMp;
      }
      caster.update({
        mp: newMp,
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

    if (magicDefenseBoost) {
      who.update({
        magicDefense: who.originalMagicDefense + magicDefenseBoost,
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
  
        // Atualizar os atributos do combatente a partir do playerState
        const playerStateHero = window.playerState.hero[combatant.id];
        if (playerStateHero) {
          playerStateHero.xp = combatant.xp;
          playerStateHero.level = combatant.level;
  
          // Aumentar os atributos do combatente de acordo com o nível
          if (playerStateHero.level <= 5) {
            playerStateHero.maxHp = Math.floor(playerStateHero.maxHp * 1.2);
            playerStateHero.maxMp = Math.floor(playerStateHero.maxMp * 1.2);
            playerStateHero.attack = Math.floor(playerStateHero.attack * 1.2);
            playerStateHero.defense = Math.floor(playerStateHero.defense * 1.2);
            playerStateHero.magicAttack = Math.floor(playerStateHero.magicAttack * 1.2);
            playerStateHero.magicDefense = Math.floor(playerStateHero.magicDefense * 1.2);
            playerStateHero.maxXp = Math.floor(playerStateHero.maxXp * 1.35);
          } else if (playerStateHero.level > 5 && playerStateHero.level <= 10) {
            playerStateHero.maxHp = Math.floor(playerStateHero.maxHp * 1.15);
            playerStateHero.maxMp = Math.floor(playerStateHero.maxMp * 1.15);
            playerStateHero.attack = Math.floor(playerStateHero.attack * 1.15);
            playerStateHero.defense = Math.floor(playerStateHero.defense * 1.15);
            playerStateHero.magicAttack = Math.floor(playerStateHero.magicAttack * 1.15);
            playerStateHero.magicDefense = Math.floor(playerStateHero.magicDefense * 1.15);
            playerStateHero.maxXp = Math.floor(playerStateHero.maxXp * 1.35);
          } else if (playerStateHero.level > 10 && playerStateHero.level <= 20) {
            playerStateHero.maxHp = Math.floor(playerStateHero.maxHp * 1.12);
            playerStateHero.maxMp = Math.floor(playerStateHero.maxMp * 1.12);
            playerStateHero.attack = Math.floor(playerStateHero.attack * 1.12);
            playerStateHero.defense = Math.floor(playerStateHero.defense * 1.12);
            playerStateHero.magicAttack = Math.floor(playerStateHero.magicAttack * 1.12);
            playerStateHero.magicDefense = Math.floor(playerStateHero.magicDefense * 1.12);
            playerStateHero.maxXp = Math.floor(playerStateHero.maxXp * 1.4);
          } else if (playerStateHero.level > 20 && playerStateHero.level <= 40) {
            playerStateHero.maxHp = Math.floor(playerStateHero.maxHp * 1.1);
            playerStateHero.maxMp = Math.floor(playerStateHero.maxMp * 1.1);
            playerStateHero.attack = Math.floor(playerStateHero.attack * 1.1);
            playerStateHero.defense = Math.floor(playerStateHero.defense * 1.1);
            playerStateHero.magicAttack = Math.floor(playerStateHero.magicAttack * 1.1);
            playerStateHero.magicDefense = Math.floor(playerStateHero.magicDefense * 1.1);
            playerStateHero.maxXp = Math.floor(playerStateHero.maxXp * 1.45);
          } else if (playerStateHero.level > 40) {
            playerStateHero.maxHp = Math.floor(playerStateHero.maxHp * 1.05);
            playerStateHero.maxMp = Math.floor(playerStateHero.maxMp * 1.05);
            playerStateHero.attack = Math.floor(playerStateHero.attack * 1.05);
            playerStateHero.defense = Math.floor(playerStateHero.defense * 1.05);
            playerStateHero.magicAttack = Math.floor(playerStateHero.magicAttack * 1.05);
            playerStateHero.magicDefense = Math.floor(playerStateHero.magicDefense * 1.05);
            playerStateHero.maxXp = Math.floor(playerStateHero.maxXp * 1.5);
          }
          // Recuperar completamente os pontos de vida e pontos de magia após o aumento de nível
          playerStateHero.hp = playerStateHero.maxHp;
          playerStateHero.mp = playerStateHero.maxMp;
        }
      }
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
