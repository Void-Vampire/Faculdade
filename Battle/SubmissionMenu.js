class SubmissionMenu { 
  constructor({ caster, enemy, onComplete, items }) {
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;

    let quantityMap = {};
    items.forEach(item => {
      if (item.team === caster.team) {
        let existing = quantityMap[item.actionId];
        if (existing) {
          existing.quantity += 1;
        } else {
          quantityMap[item.actionId] = {
            actionId: item.actionId,
            quantity: 1,
            instanceId: item.instanceId,
          }
       }
      }
    })
    this.items = Object.values(quantityMap);
  }

    getPages() {

      const backOption = {
        label: "Go Back",
        description: "Return to previous page",
        handler: () => {
          this.keyboardMenu.setOptions(this.getPages().root)
        }
      };

      return {
        root: [
          {
            label: "Fight",
            description: "Attack",
            handler: () => {
              // Ataque Normal
              this.keyboardMenu.setOptions(this.getPages().fight);
            }
          },
          {
            label: "Magic",
            description: "Uses Magic",
            handler: () => {
              // Vá para a pagina de magias
              this.keyboardMenu.setOptions( this.getPages().magics )
            }
          },
          {
            label: "Items",
            description: "Uses Item",
            handler: () => {
              // Vá para a pagina de items
              this.keyboardMenu.setOptions( this.getPages().items )
            }
          }
        ],
        fight: [
          ...(this.caster.actions.includes('ishtarSword') ? [
            {
              label: Actions.ishtarSword.name,
              description: Actions.ishtarSword.description,
              handler: () => {
                this.menuSubmit(Actions.ishtarSword);
              }
            }
          ] : []),

          ...(this.caster.actions.includes('ishtarDualBlade') ? [
            {
              label: `${Actions.ishtarDualBlade.name} (MP: ${Actions.ishtarDualBlade.mpCost || 0})`,
              description: Actions.ishtarDualBlade.description,
              handler: () => {
                this.menuSubmit(Actions.ishtarDualBlade);
              }
            }
          ] : []),

          ...(this.caster.actions.includes('freyaStaff') ? [
            {
              label: Actions.freyaStaff.name,
              description: Actions.freyaStaff.description,
              handler: () => {
                this.menuSubmit(Actions.freyaStaff);
              }
            }
          ] : []),

          ...(this.caster.actions.includes('celestiaDarkStaff') ? [
            {
              label: Actions.celestiaDarkStaff.name,
              description: Actions.celestiaDarkStaff.description,
              handler: () => {
                this.menuSubmit(Actions.celestiaDarkStaff);
              }
            }
          ] : []),

          ...(this.caster.actions.includes('celestiaVampirism') ? [
            {
              label: Actions.celestiaVampirism.name,
              description: Actions.celestiaVampirism.description,
              handler: () => {
                this.menuSubmit(Actions.celestiaVampirism);
              }
            }
          ] : []),

          ...(this.caster.actions.includes('aerinRapier') ? [
            {
              label: Actions.aerinRapier.name,
              description: Actions.aerinRapier.description,
              handler: () => {
                this.menuSubmit(Actions.aerinRapier);
              }
            }
          ] : []),

          ...(this.caster.actions.includes('aerinMagicDagger') ? [
            {
              label: `${Actions.aerinMagicDagger.name} (MP: ${Actions.aerinMagicDagger.mpCost || 0})`,
              description: Actions.aerinMagicDagger.description,
              handler: () => {
                this.menuSubmit(Actions.aerinMagicDagger);
              }
            }
          ] : []),

          ...(this.caster.actions.includes('aerinBattleDance') ? [
            {
              label: `${Actions.aerinBattleDance.name} (MP: ${Actions.aerinBattleDance.mpCost || 0})`,
              description: Actions.aerinBattleDance.description,
              handler: () => {
                this.menuSubmit(Actions.aerinBattleDance);
              }
            }
          ] : []),

          backOption
        ],
        magics: [
          ...this.caster.actions.map(key => {
            if (key === 'ishtarSword') return null;
            if (key === 'ishtarDualBlade') return null;
            if (key === 'freyaStaff') return null;
            if (key === 'celestiaDarkStaff') return null;
            if (key === 'celestiaVampirism') return null;
            if (key === 'aerinMagicDagger') return null;
            if (key === 'aerinRapier') return null;
            if (key === 'aerinBattleDance') return null;
            const action = Actions[key];
            return {
              label: `${action.name} (MP: ${action.mpCost || 0})`,
              description: action.description,
              disabled: this.caster.mp < action.mpCost,
              handler: () => {
                this.menuSubmit(action)
              }
            }
          }).filter(action => action !== null), // Remove null entries
          backOption
        ],
        items: [
          ...this.items.map(item => {
            const action = Actions[item.actionId];
            return {
              label: action.name,
              description: action.description,
              right: () => {
                return "x"+item.quantity;
              },
              handler: () => {
                this.menuSubmit(action, item.instanceId)
              }
            }
          }),
          backOption
        ]
      }
    }

    menuSubmit(action, instanceId=null) {

      this.keyboardMenu?.end();
  
      this.onComplete({
        action,
        target: action.targetType === "friendly" ? this.caster : this.enemy,
        instanceId,
      })
    }
  
    decide() {
      // Inimigos iram randomicamente decidir o que fazer 
    const randomIndex = Math.floor(Math.random() * this.caster.actions.length);
    const randomAction = Actions[this.caster.actions[randomIndex]];
    this.menuSubmit(randomAction);
    }

    showMenu(container) {
      this.keyboardMenu = new KeyboardMenu();
      this.keyboardMenu.init(container);
      this.keyboardMenu.setOptions( this.getPages().root )
    }
  
    init(container) {

      if (this.caster.isPlayerControlled) {
        //Mostre o Menu de Batalha
        this.showMenu(container)
      } else{
        this.decide()
      }
    }
  }