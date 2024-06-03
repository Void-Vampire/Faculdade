class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.backgroundMusic = new Audio('theme/map.mp3');
    this.backgroundMusic.loop = true; // Para repetir a música em loop
    this.backgroundMusic.volume = 0.5;
  }

  startGameLoop() {
    const step = () => {
      // Suaviliza o Personagem
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Fixar a Camera em um personagem
      const cameraPerson = this.map.gameObjects.hero;

      // Update all Objects
      Object.values(this.map.gameObjects).forEach((object) => {
        // Movimentação
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      // Desenha Imagem
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Desenha os Game Objects
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

      if (!this.map.isPaused) {
        requestAnimationFrame(() => {
          step();
        });
      }
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //Is there a person here to talk to?
      this.map.checkForActionCutscene();
    });
    new KeyPressListener("Escape", () => {
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([{ type: "pause" }]);
      }
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        //Hero's position has changed
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig, heroInitialState = null) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();

    if (heroInitialState) {
      const { hero } = this.map.gameObjects;
      hero.x = heroInitialState.x;
      hero.y = heroInitialState.y;
      hero.direction = heroInitialState.direction;
    }

    this.progress.mapId = mapConfig.id;
    this.progress.startingHeroX = this.map.gameObjects.hero.x;
    this.progress.startingHeroY = this.map.gameObjects.hero.y;
    this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;
  }

  // Primeiro Mapa
  async init() {
    const container = document.querySelector(".game-container");

    // Criar um novo progreso
    this.progress = new Progress();

    // Mostre a tela do inicio
    this.titleScreen = new TitleScreen({
      progress: this.progress,
    });
    const useSaveFile = await this.titleScreen.init(container);

    // Carregar Save Data
    let initialHeroState = null;
    if (useSaveFile) {
      this.progress.load();
      initialHeroState = {
        x: this.progress.startingHeroX,
        y: this.progress.startingHeroY,
        direction: this.progress.startingHeroDirection,
      };
    }
    this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState);

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.backgroundMusic.play();

    this.startGameLoop();

    // Cutscenes
  }
}
