class PauseMenu {
  constructor({ progress, onComplete }) {
    this.progress = progress;
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {
    //Case 1: Mostra a primeira pagina de opçoes
    if (pageKey === "root") {
      const lineupHeroes = playerState.lineup.map((id) => {
        const hero = playerState.hero[id];
        return {
          label: hero.name,
          description: hero.description,
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions(id));
          },
        };
      });
      return [
        ...lineupHeroes,
        {
          label: "Save",
          description: "Save your progress",
          handler: () => {
            this.progress.save();
            this.close();
          },
        },
        {
          label: "Close",
          description: "Close the pause menu",
          handler: () => {
            this.close();
          },
        },
      ];
    }
    // Case 2: Mostra as opçoes de um heroi (por ID)
    const hero = playerState.hero[pageKey];
    return [
      // Mostra os Status do Heroi...
      {
        label: "Status",
        description: "Status do Heroi",
        handler: () => {
          this.showHeroStatus(hero);
        },
      },
      {
        label: "Back",
        description: "Back to root menu",
        handler: () => {
          this.keyboardMenu.setOptions(this.getOptions("root"));
        },
      },
    ];
  }

  showHeroStatus(hero) {
    const statusElement = document.createElement("div");
    statusElement.classList.add("HeroStatus");
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
      </div>
      <button id="back-button">Back</button>
  `;
    statusElement
      .querySelector("#back-button")
      .addEventListener("click", () => {
        this.keyboardMenu.setOptions(this.getOptions(hero.id));
        statusElement.remove();
      });

    this.element.appendChild(statusElement);
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("PauseMenu");
    this.element.innerHTML = `
          <h2>Pause Menu</h2>
        `;
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
      descriptionContainer: container,
    });
    this.keyboardMenu.init(this.element);
    this.keyboardMenu.setOptions(this.getOptions("root"));

    container.appendChild(this.element);

    utils.wait(200);
    this.esc = new KeyPressListener("Escape", () => {
      this.close();
    });
  }
}
