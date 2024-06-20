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
      physical,
      magic,
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
      magicDrain,
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

    if (physical && magic) {

    let effectiveDamage = physical + caster.attack * (attackModifier || 0);
    effectiveDamage = Math.max(effectiveDamage - target.defense, 1);
    effectiveDamage = Math.floor(effectiveDamage);

    // Calcular o dano mágico efetivo
    let effectiveMagicDamage = magic + caster.magicAttack * (magicModifier || 0);
    effectiveMagicDamage = Math.max(effectiveMagicDamage - target.magicDefense, 1);
    effectiveMagicDamage = Math.floor(effectiveMagicDamage);

    const totalDamage = effectiveDamage + effectiveMagicDamage;

   // Aplicar o dano total ao alvo
    target.update({
    hp: target.hp - totalDamage,
     });

    // Iniciar animação de dano
    this.showDamage(totalDamage, target.spriteElement);
    target.spriteElement.classList.add("battle-damage-blink");

    // Exibir número de dano total
    this.showDamage(totalDamage, target.spriteElement);

    // Verificar se o alvo foi derrotado
    if (target.hp <= 0) {
    // Remover o elemento do sprite do DOM
    target.spriteElement.remove();
    target.hudElement.remove();
  }
  affectedMembers.push(target);
    }

    if (healthDamage) {
      let damageAmount = Math.floor(target.hp * (healthDamage / 100));

      target.update({
        hp: target.hp - damageAmount,
      });

      this.showDamage(damageAmount, target.spriteElement);

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

      this.showDamage(berserkDamage, caster.spriteElement);
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

      target.spriteElement.classList.add("battle-damage-blink");
      this.showDamage(effectiveDamage, target.spriteElement);

      if (target.hp <= 0) {
        // Remover o elemento do sprite do DOM
        target.spriteElement.remove();
        target.hudElement.remove();
      }
        affectedMembers.push(target);
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

      target.spriteElement.classList.add("battle-damage-blink");
      this.showDamage(effectiveDamage, target.spriteElement);

      if (target.hp <= 0) {
          // Remover o elemento do sprite do DOM
          target.spriteElement.remove();
          target.hudElement.remove();
      } 
          affectedMembers.push(target);
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

          this.showDamage(effectiveDamageX, member.spriteElement);
          member.spriteElement.classList.add("battle-damage-blink");
          affectedMembers.push(member);

          if (member.hp <= 0) {
            member.spriteElement.remove();
            member.hudElement.remove();
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

      this.showDamage(effectiveMagicDamage, target.spriteElement);
      target.spriteElement.classList.add("battle-damage-blink");

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
      } 
        affectedMembers.push(target);
      
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

      this.showDamage(effectiveMagicDamage, target.spriteElement);
      target.spriteElement.classList.add("battle-damage-blink");
      
      if (target.hp <= 0) {
          
          target.spriteElement.remove();
          target.hudElement.remove();
      } 
          affectedMembers.push(target);   
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

          this.showDamage(effectiveMagicDamageX, member.spriteElement);
          member.spriteElement.classList.add("battle-damage-blink");

          affectedMembers.push(member);

          if (member.hp <= 0) {
            member.spriteElement.remove();
            member.hudElement.remove();
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

      this.showDamage(hpToSacrifice, caster.spriteElement);
    
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

    if (magicDrain) {
      // Calcular a quantidade de magicDrain considerando o magicModifier
      const drainedAmount = Math.floor(magicDrain + caster.magicAttack * (magicModifier || 0));
      
      // Reduzir o magicAttack do alvo
      target.update({
        magicAttack: target.magicAttack - drainedAmount,
      });

      caster.update({
        magicAttack: caster.magicAttack + drainedAmount,
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

    // Definir os ranges diretamente dentro do método giveXp
    const attributeRanges = {
      hero1: {
        hpMin: 9, hpMax: 13,
        mpMin: 5, mpMax: 7,
        attackMin: 7, attackMax: 10,
        defenseMin: 6, defenseMax: 10,
        magicAttackMin: 4, magicAttackMax: 6,
        magicDefenseMin: 4, magicDefenseMax: 6,
      },
      hero2: {
        hpMin: 5, hpMax: 7,
        mpMin: 10, mpMax: 15,
        attackMin: 5, attackMax: 7,
        defenseMin: 4, defenseMax: 6,
        magicAttackMin: 9, magicAttackMax: 12,
        magicDefenseMin: 7, magicDefenseMax: 11,
      },
      hero3: {
        hpMin: 7, hpMax: 11,
        mpMin: 7, mpMax: 10,
        attackMin: 4, attackMax: 6,
        defenseMin: 5, defenseMax: 8,
        magicAttackMin: 7, magicAttackMax: 10,
        magicDefenseMin: 5, magicDefenseMax: 8,
      },
      hero4: {
        hpMin: 13, hpMax: 18,
        mpMin: 9, mpMax: 13,
        attackMin: 5, attackMax: 8,
        defenseMin: 4, defenseMax: 7,
        magicAttackMin: 5, magicAttackMax: 8,
        magicDefenseMin: 6, magicDefenseMax: 9,
      },
    };

    while (amount > 0) {
      amount -= 1;
      combatant.xp += 1;

      const heroAttributes = attributeRanges[combatant.id];

      // Verificar se houve aumento de nível
      if (combatant.xp >= combatant.maxXp) {
        combatant.xp = 0;
        combatant.level += 1;

        // Aumentar os status do combatente de acordo com o nível
        if (combatant.level <= 10) {
          combatant.maxHp += Math.floor(Math.random() * (heroAttributes.hpMax - heroAttributes.hpMin + 1) + heroAttributes.hpMin);
          combatant.maxMp += Math.floor(Math.random() * (heroAttributes.mpMax - heroAttributes.mpMin + 1) + heroAttributes.mpMin);
          combatant.attack += Math.floor(Math.random() * (heroAttributes.attackMax - heroAttributes.attackMin + 1) + heroAttributes.attackMin);
          combatant.defense += Math.floor(Math.random() * (heroAttributes.defenseMax - heroAttributes.defenseMin + 1) + heroAttributes.defenseMin);
          combatant.magicAttack += Math.floor(Math.random() * (heroAttributes.magicAttackMax - heroAttributes.magicAttackMin + 1) + heroAttributes.magicAttackMin);
          combatant.magicDefense += Math.floor(Math.random() * (heroAttributes.magicDefenseMax - heroAttributes.magicDefenseMin + 1) + heroAttributes.magicDefenseMin);
          combatant.maxXp = Math.floor(combatant.maxXp * 1.20);
        } else if (combatant.level > 10 && combatant.level <= 20) {
          combatant.maxXp = Math.floor(combatant.maxXp * 1.28);
        } else if (combatant.level > 20 && combatant.level <= 40) {
          combatant.maxXp = Math.floor(combatant.maxXp * 1.35);
        } else if (combatant.level > 40) {
          combatant.maxXp = Math.floor(combatant.maxXp * 1.40);
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

  showDamage(damage, targetElement) {
    // Crie um novo elemento para o número de dano
    const damageNumber = document.createElement('div');
    damageNumber.classList.add('damage-number');
    damageNumber.textContent = damage;
    
    // Posicione o elemento de dano acima do sprite do alvo
    const targetRect = targetElement.getBoundingClientRect();
    damageNumber.style.top = `${targetRect.top}px`;
    damageNumber.style.left = `${targetRect.left}px`;
    
    // Adicione o elemento ao DOM
    document.body.appendChild(damageNumber);
    
    // Remova o elemento após um período de tempo
    setTimeout(() => {
      damageNumber.remove();
  }, 3000); // Tempo de exibição do número de dano (3 segundos)
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
