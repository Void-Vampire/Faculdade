class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }

 startGameLoop() {
  const step = () => {

    // Suaviliza o Personagem
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

    // Fixar a Camera em um personagem
    const cameraPerson = this.map.gameObjects.hero;

    // Update all Objects
    Object.values(this.map.gameObjects).forEach(object => {

      // Movimentação
      object.update({
        arrow: this.directionInput.direction,
        map: this.map,
      }) 
    })

    // Desenha Imagem
    this.map.drawLowerImage(this.ctx, cameraPerson);

    // Desenha os Game Objects
    Object.values(this.map.gameObjects).sort((a,b) => {
      return a.y - b.y;
    }).forEach(object => {
      object.sprite.draw(this.ctx, cameraPerson);
    })

    requestAnimationFrame(() => {
      step();
    })
  }
  step();
 }

 bindActionInput() {
  new KeyPressListener("Enter", () => {
    //Is there a person here to talk to?
    this.map.checkForActionCutscene()
  })
}

bindHeroPositionCheck() {
  document.addEventListener("PersonWalkingComplete", e => {
    if (e.detail.whoId === "hero") {
      //Hero's position has changed
      this.map.checkForFootstepCutscene()
    }
  })
}

startMap(mapConfig) {
  this.map = new OverworldMap(mapConfig);
  this.map.overworld = this;
  this.map.mountObjects();
 }

 // Primeiro Mapa
 init() {

  // this.hud = new Hud()

  this.startMap(window.OverworldMaps.Forest1);
  console.log(this.map.encounterZones);

  this.bindActionInput();
  this.bindHeroPositionCheck();

  this.directionInput = new DirectionInput();
  this.directionInput.init();

  this.startGameLoop();

  // Cutscenes
 };
  
}