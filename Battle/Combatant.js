class Combatant {
  constructor(config, battle) {
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });
    this.battle = battle;
    this.hp = typeof this.hp === "undefined" ? this.maxHp : this.hp;
    this.mp = typeof this.mp === "undefined" ? this.maxMp : this.mp;
    this.originalDefense = this.defense;
    this.originalAttack = this.attack;
    this.originalMagicAttack = this.magicAttack;

    this.statusEffects = {}; // Armazena múltiplos status
  }

  get isActive() {
    return this.battle.activeCombatants[this.team] === this.id;
  }

  get givesXp() {
    return this.xp;
  }

  createElement() {
    this.hudElement = document.createElement("div");
    this.hudElement.classList.add("Combatant");
    this.hudElement.setAttribute("data-combatant", this.id);
    this.hudElement.setAttribute("data-team", this.team);

    this.hudContainer = document.createElement("div");
    this.hudContainer.classList.add("hud");

    if (this.team === "hero") {
      this.hudContainer.innerHTML = `
          <div class="name">${this.name}</div>
          <div class="level">Level: ${this.level}</div>
          <div class="hp-text">HP: ${this.hp}/${this.maxHp}</div>
          <div class="mp-text">MP: ${this.mp}/${this.maxMp}</div>
        `;
    }
    if (this.team === "enemy") {
      this.hudContainer.innerHTML = `
          <div class="name">${this.name}</div>
          <div class="hp-text">HP: ${this.hp}/${this.maxHp}</div>
        `;
    }

    this.hudElement.appendChild(this.hudContainer);

    this.spriteElement = document.createElement("img");
    this.spriteElement.classList.add("sprite");
    this.spriteElement.setAttribute("alt", this.name);
    this.spriteElement.setAttribute("data-team", this.team);
    this.spriteElement.setAttribute("src", this.src);
    this.spriteElement.setAttribute("data-id", this.id);

    this.hudElement.classList.add(`hero-${this.id}`);
    this.spriteElement.classList.add(`hero-${this.id}`);

    this.hudElement.classList.add(`enemy-${this.id}`);
    this.spriteElement.classList.add(`enemy-${this.id}`);
  }

  update(changes = {}) {
    // Atualize os atributos com as alterações recebidas
    Object.keys(changes).forEach((key) => {
      this[key] = changes[key];
    });

    if (this.hp < 0) {
      this.hp = 0;
    }

    if (this.mp < 0) {
      this.mp = 0;
    }
    if ("hp" in changes) {
      const hpText = this.hudElement.querySelector(".hp-text");
      if (hpText) {
        hpText.textContent = `HP: ${this.hp}/${this.maxHp}`;
      }
    }

    if ("mp" in changes) {
      const mpText = this.hudElement.querySelector(".mp-text");
      if (mpText) {
        mpText.textContent = `MP: ${this.mp}/${this.maxMp}`;
      }
    }
    if ("level" in changes) {
      const levelText = this.hudElement.querySelector(".level");
      if (levelText) {
        levelText.textContent = `Level: ${this.level}`;
      }
    }
  }

  getReplacedEvents(originalEvents) {
    // Verificar se o combatente está sob o efeito do status "sleep"
    const sleepStatus = this.statusEffects["sleep"];
    if (sleepStatus && utils.randomFromArray([true, false, false])) {
      return [
        {
          type: "textMessage",
          text: `${this.name} está dormindo e não pode agir!`,
        },
      ];
    }
    return originalEvents;
  }

  applyStatus(status) {
    if (status) {
      this.statusEffects[status.type] = { ...status };
      console.log(`${this.name} aplicou status: ${status.type}`);
    }
  }

  getPostEvents() {
    let events = [];
    Object.keys(this.statusEffects).forEach((statusType) => {
      let status = this.statusEffects[statusType];
      if (!status.applied) {
        status.applied = true;
        if (statusType === "armor") {
          events.push({
            type: "textMessage",
            text: `${this.name} recebeu ${status.armor} de armadura aumentada por 3 turnos!`,
          });
          events.push({
            type: "stateChange",
            armor: status.armor,
            onCaster: true,
          });
        } else if (statusType === "attackFullBoost") {
          events.push({
            type: "textMessage",
            text: `${this.name} teve seu ataque em ${status.attackBoost} e ataque mágico em ${status.magicAttackBoost} aumentados por 3 turnos!`,
          });
          events.push({
            type: "stateChange",
            attackBoost: status.attackBoost,
            magicAttackBoost: status.magicAttackBoost,
            onCaster: true,
          });
        } else if (statusType === "attackBoost") {
          events.push({
            type: "textMessage",
            text: `${this.name} teve seu ataque aumentado em ${status.attackBoost} por 3 turnos!`,
          });
          events.push({
            type: "stateChange",
            attackBoost: status.attackBoost,
            onCaster: true,
          });
        } else if (statusType === "magicBoost") {
          events.push({
            type: "textMessage",
            text: `${this.name} teve seu ataque mágico aumentado em ${status.magicAttackBoost} por 3 turnos!`,
          });
          events.push({
            type: "stateChange",
            magicAttackBoost: status.magicAttackBoost,
            onCaster: true,
          });
        }
      }
    });
    return events;
  }

  decrementStatus() {
    let expiredStatuses = [];
    let textMessage = null; // Inicializamos como null
    Object.keys(this.statusEffects).forEach((statusType) => {
      let status = this.statusEffects[statusType];
      if (status.expiresIn > 0) {
        status.expiresIn -= 1;
        if (status.expiresIn === 0) {
          expiredStatuses.push(statusType);
          if (statusType === "armor") {
            this.update({ defense: this.originalDefense });
          }
          if (statusType === "attackFullBoost") {
            this.update({
              attack: this.originalAttack,
              magicAttack: this.originalMagicAttack,
            });
          }
          if (statusType === "attackBoost") {
            this.update({ attack: this.originalAttack });
          }
          if (statusType === "magicBoost") {
            this.update({ magicAttack: this.originalMagicAttack });
          }
        }
      }
    });

    expiredStatuses.forEach((statusType) => {
      const characterName = this.name;
      console.log(`Deleting status ${statusType} from ${characterName}.`);
      delete this.statusEffects[statusType];
      // Armazenamos o objeto textMessage apenas se um status foi deletado
      textMessage = {
        type: "textMessage",
        text: `O efeito ${statusType} de ${characterName} acabou!`,
      };
    });
    return textMessage; // Retornamos o objeto textMessage
  }

  init(container) {
    this.createElement();
    container.appendChild(this.hudElement);
    container.appendChild(this.spriteElement);
    this.update();
  }
}
