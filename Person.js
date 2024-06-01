class Person extends GameObject {
    constructor(config) {
      super(config);
      this.movingProgressRemaining = 0;
      this.isStanding = false;
      this.intentPosition = null; // [x,y]
      this.isSmallCharacter = config.isSmallCharacter || false; // indicar se é um personagem pequeno
  
      this.isPlayerControlled = config.isPlayerControlled || false;
  
      this.directionUpdate = {
        "up": ["y", -1],
        "down": ["y", 1],
        "left": ["x", -1],
        "right": ["x", 1],
      }
    }
  
    update(state) {
      if (this.movingProgressRemaining > 0) {
      this.updatePosition();
      } else {

        //Case: Teclado Pronto e Tecla pressionada
        if (!state.map.isCutscenePlaying &&this.isPlayerControlled && state.arrow) {
          this.startBehavior(state, {
            type: "walk",
            direction: state.arrow
          })
        }
        this.updateSprite(state);
      }
      
  
      
    }

    startBehavior(state, behavior) {

      if (!this.isMounted) {
        return;
      }
      //Set character direction to whatever behavior has
      this.direction = behavior.direction;
      
      if (behavior.type === "walk") {
  
        //Pare se o Espaço n estiver livre
        if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
          
          behavior.retry && setTimeout(() => {
            this.startBehavior(state, behavior)
          }, 10);
  
          return;
        }
  
        //Preparado para Andar
        this.movingProgressRemaining = 16;

        const intentPosition = utils.nextPosition(this.x,this.y, this.direction)
        this.intentPosition = [
        intentPosition.x,
        intentPosition.y,
      ]
        this.updateSprite(state);
      }

      if (behavior.type === "stand") {
        this.isStanding = true;
        setTimeout(() => {
          utils.emitEvent("PersonStandComplete", {
            whoId: this.id
          })
        }, behavior.time)
      }
    }
  
    updatePosition() {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;

      if (this.movingProgressRemaining === 0) {
        //Terminou de Andar
        this.intentPosition = null;
        utils.emitEvent("PersonWalkingComplete", {
          whoId: this.id
        })

      }
  }

    updateSprite() {

      // Para Andando
      if (this.movingProgressRemaining > 0) {
        this.sprite.setAnimation("walk-"+this.direction);
        return;
      }
      // Para Parado
        this.sprite.setAnimation("idle-"+this.direction);
    }
  }