class Combatant {
  constructor(config, battle) {
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      })
      this.battle = battle;
      this.hp = typeof(this.hp) === "undefined" ? this.maxHp : this.hp;
      this.mp = typeof(this.mp) === "undefined" ? this.maxMp : this.mp;
      this.originalDefense = this.defense;
    }
  
    get isActive() {
      return this.battle.activeCombatants[this.team] === this.id;
    }

    get givesXp() {
      return this.level * 20;
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
      Object.keys(changes).forEach(key => {
        this[key] = changes[key];
      });

      if (this.hp < 0) {
        this.hp = 0;
      }

      if (this.mp < 0) {
        this.mp = 0;
      }
      if ('hp' in changes) {
        const hpText = this.hudElement.querySelector('.hp-text');
        if (hpText) {
          hpText.textContent = `HP: ${this.hp}/${this.maxHp}`;
        }
      }
      
      if ('mp' in changes) {
        const mpText = this.hudElement.querySelector('.mp-text');
        if (mpText) {
          mpText.textContent = `MP: ${this.mp}/${this.maxMp}`;
        }
      }

    }

  getReplacedEvents(originalEvents) {

    // 33% de chance do sono funcionar
    if (this.status?.type === "sleep" && utils.randomFromArray([true,false,false])) {
      return [
        { type: "textMessage", text: `${this.name} Dormiu!` },
      ]
    }
  
      return originalEvents;
    }

    getPostEvents() {
      if (this.status?.type === "armor" && !this.status.applied) {
        this.status.applied = true;
        return [
          { type: "textMessage", text: `${this.name} recebeu mais armadura!` },
          { type: "stateChange", armor: 10, onCaster: true }
        ];
      }
      return [];
    }

    decrementStatus() {
      if (this.status?.expiresIn > 0) {
        this.status.expiresIn -= 1;
        if (this.status.expiresIn === 0) {
          const expiredStatusType = this.status.type;
          const characterName = this.name; // Obtém o nome do personagem
          if (expiredStatusType === "armor") {
            this.update({ defense: this.originalDefense }); // Remover o efeito de armadura
          }
          this.status = null; // Remover o status completamente
          return {
            type: "textMessage",
            text: `O efeito ${expiredStatusType} de ${characterName} acabou!`
          };
        }
      }
      return null;
    }

    init(container) {
      this.createElement();
      container.appendChild(this.hudElement);
      container.appendChild(this.spriteElement);
      this.update();
    }

}