class PauseMenu {
  constructor({progress, onComplete}) {
    this.progress = progress;
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {

    //Case 1: Mostra a primeira pagina de opçoes
      if (pageKey === "root") {
        const lineupHeroes = playerState.lineup.map(id => {
          const hero = playerState.hero[id];
          return {
            label: hero.name,
            description: hero.description,
            handler: () => {
              this.keyboardMenu.setOptions( this.getOptions(id) )
            }
          }
        })
          return [
            ...lineupHeroes,
              {
                label: "Save",
                description: "Salve seu Progresso",
                handler: () => {
                  this.progress.save();
                  this.close();
                }
              },
              {
                label: "Close",
                description: "Feche o Menu de Pausa",
                handler: () => {
                  this.close();
                }
              }
            ]
  }
  // Case 2: Mostra as opçoes de um heroi (por ID)
  const hero = playerState.hero[pageKey];
  return[
    // Mostra os Status do Heroi...
    {
      label: "Status",
      description: "Status do Heroi",
      handler: () => {
        this.showHeroStatus(hero);
      }
    },
    {
      label: "Equip Weapon",
        description: "Equipar Arma",
        handler: () => {
          this.showEquipMenu(hero);
        }
    },
    {
      label: "Back",
      description: "Volte ao Menu Principal",
      handler: () => {
        this.keyboardMenu.setOptions( this.getOptions("root") );
      }
    }
  ];
}

showHeroStatus(hero) {
  const statusElement = document.createElement("div");
  statusElement.classList.add("HeroStatus");
  
  let weaponName = '';
  if (hero.weapon) {
    const weaponData = window.weapon[hero.weapon.Id];
    if (weaponData) {
      weaponName = weaponData.name;
    }
  }
  
  statusElement.innerHTML = `
    <h3>${hero.name} - Status</h3>
    <div class="status-list">
        <p>HP: ${hero.hp} / ${hero.maxHp}</p>
        <p>MP: ${hero.mp} / ${hero.maxMp}</p>
        <p>Attack: ${hero.attack}</p>
        <p>Defense: ${hero.defense}</p>
        <p>Magic Attack: ${hero.magicAttack}</p>
        <p>Magic Defense: ${hero.magicDefense}</p>
        <p>Level: ${hero.level}</p>
        <p>EXP: ${hero.xp} / ${hero.maxXp}</p>
        ${hero.weapon ? `<p>Weapon: ${weaponName}</p>` : ''}
    </div>
    <button id="back-button">Back</button>
  `;
  
  statusElement.querySelector("#back-button").addEventListener("click", () => {
    this.keyboardMenu.setOptions(this.getOptions(hero.id));
    statusElement.remove();
  });

  this.element.appendChild(statusElement);
}

generateWeaponStatsHTML(weaponData) {
  const stats = [];
  if (weaponData.attack !== 0) stats.push(`Attack: ${weaponData.attack}`);
  if (weaponData.defense !== 0) stats.push(`Defense: ${weaponData.defense}`);
  if (weaponData.magicAttack !== 0) stats.push(`Magic Attack: ${weaponData.magicAttack}`);
  if (weaponData.magicDefense !== 0) stats.push(`Magic Defense: ${weaponData.magicDefense}`);

  return stats.join(' | ');
}

showEquipMenu(hero) {
  const equipElement = document.createElement("div");
  equipElement.classList.add("EquipMenu");
  equipElement.innerHTML = `
    <h3>Equipar Arma - ${hero.name}</h3>
    <div class="weapon-list"></div>
    <div class="weapon-stats"></div>
    <button id="equip-cancel-button">Cancelar</button>
  `;

  const weaponList = equipElement.querySelector(".weapon-list");
  const weaponStats = equipElement.querySelector(".weapon-stats");
  const cancelButton = equipElement.querySelector("#equip-cancel-button");

  // Listar as armas disponíveis para equipar
  const availableWeapons = playerState.weapons.filter(weapon => {
    return !Object.values(playerState.hero).some(h => h.weapon && h.weapon.instanceId === weapon.instanceId);
  });

  availableWeapons.forEach(weapon => {
    const weaponData = window.weapon[weapon.Id];
    if (!weaponData) {
      console.error(`Weapon data not found for Id: ${weapon.Id}`);
      return;
    }

    const weaponItem = document.createElement("div");
    weaponItem.textContent = weaponData.name;
    weaponItem.classList.add("weapon-item");
    weaponItem.style.cursor = "pointer";

    weaponItem.addEventListener("click", () => {
      weaponStats.innerHTML = `
        <h4>Estatísticas da Arma</h4>
        <p>${this.generateWeaponStatsHTML(weaponData)}</p>
        <button id="equip-confirm-button" class="equip-button" ${hero.weapon && hero.weapon.Id === weapon.Id ? 'disabled' : ''}>Equipar</button>
        <button id="unequip-button" class="unequip-button" ${!hero.weapon ? 'disabled' : ''}>Unequipar</button>
      `;

      const confirmButton = weaponStats.querySelector("#equip-confirm-button");
      confirmButton.addEventListener("click", () => {
        if (hero.weapon) {
          const currentWeaponData = window.weapon[hero.weapon.Id];
          if (currentWeaponData) {
            hero.attack -= currentWeaponData.attack;
            hero.defense -= currentWeaponData.defense;
            hero.magicAttack -= currentWeaponData.magicAttack;
            hero.magicDefense -= currentWeaponData.magicDefense;
          }
        }

        hero.weapon = { Id: weapon.Id, instanceId: weapon.instanceId };
        hero.attack += weaponData.attack;
        hero.defense += weaponData.defense;
        hero.magicAttack += weaponData.magicAttack;
        hero.magicDefense += weaponData.magicDefense;

        equipElement.remove();
      });

      const unequipButtonInStats = weaponStats.querySelector("#unequip-button");
      unequipButtonInStats.addEventListener("click", () => {
        if (hero.weapon) {
          const currentWeaponData = window.weapon[hero.weapon.Id];
          if (currentWeaponData) {
            hero.attack -= currentWeaponData.attack;
            hero.defense -= currentWeaponData.defense;
            hero.magicAttack -= currentWeaponData.magicAttack;
            hero.magicDefense -= currentWeaponData.magicDefense;
          }
          hero.weapon = null;
        }
        equipElement.remove();
      });
    });

    weaponList.appendChild(weaponItem);
  });

  cancelButton.addEventListener("click", () => {
    equipElement.remove();
  });

  this.element.appendChild(equipElement);
}

      createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("PauseMenu")
      this.element.innerHTML = (`
        <h2>Pause Menu</h2>
      `)
    }

    close() {
      this.esc?.unbind();
      this.keyboardMenu.end();
      this.element.remove();
      this.onComplete();
    }

    async init(container) {
      this.createElement();
      this.keyboardMenu = new KeyboardMenu({
        descriptionContainer: container
      })
      this.keyboardMenu.init(this.element);
      this.keyboardMenu.setOptions(this.getOptions("root"));
  
      container.appendChild(this.element);
  
      utils.wait(200);
      this.esc = new KeyPressListener("Escape", () => {
        this.close();
      })
  
}
}
