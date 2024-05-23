class Combatant {
  constructor(config, battle) {
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      })
      this.battle = battle;
      this.hp = typeof(this.hp) === "undefined" ? this.maxHp : this.hp;
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

      if (this.team === "hero") {
        this.hudElement.innerHTML += `
        <div class="name">${this.name}</div>
        <div class="hp-text">HP: ${this.hp}/${this.maxHp}</div>
        <div class="mp-text">MP: ${this.mp}/${this.maxMp}</div>
        
        `;
    }
    if (this.team === "enemy") {
      this.hudElement.innerHTML += `
      <div class="name">${this.name}</div>
      <div class="hp-text">HP: ${this.hp}/${this.maxHp}</div>`;
  }
      
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

      if ('hp' in changes) {
        const hpText = this.hudElement.querySelector('.hp-text');
        if (hpText) {
          hpText.textContent = `HP: ${this.hp}/${this.maxHp}`;
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
        { type: "textMessage", text: "Mais Armadura" },
        { type: "stateChange", armor: 10, onCaster: true }
      ]
    }

    
    return [];
  }

  decrementStatus() {
    if (this.status?.expiresIn > 0) {
      this.status.expiresIn -= 1;
      if (this.status.expiresIn === 0) {
        if (this.status.type === "armor") {
          this.update({ defense: this.originalDefense }); // Remover o efeito de armadura
        }
        this.update({ status: null }); // Remover o status completamente
        return {
          type: "textMessage",
          text: "Status expired!"
        }
      }
    }
    return null;
  }

    init(container) {
      this.createElement();
      container.appendChild(this.hudElement);
      container.appendChild(this.spriteElement);
      
    }

}