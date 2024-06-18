class GameObject {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.frameX = config.frameX || {};
    this.frameY = config.frameY || {};
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "image/character/hero.png",
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.talking = config.talking || [];
    this.retryTimeout = null;
  }

  mount(map) {
    this.isMounted = true;

    // Se ele tiver um comportamento, começar apos um pequeno delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update() {}

  async doBehaviorEvent(map) {
    //Don't do anything if there is a more important cutscene or I don't have config to do anything
    //anyway.
    if (
      map.isCutscenePlaying ||
      this.behaviorLoop.length === 0 ||
      this.isStanding
    ) {
      return;
    }

    if (map.isCutscenePlaying) {
      if (this.retryTimeout) {
        clearTimeout(this.retryTimeout);
      }
      this.retryTimeout = setTimeout(() => {
        this.doBehaviorEvent(map);
      }, 1000);
      return;
    }

    //Setando Evento com Informaçoes Relevantes
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    //Criando uma Instancia de Evento a partir da configuração do proximo evento
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    //Configurando Proximo Evento
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    //Do it again!
    this.doBehaviorEvent(map);
  }
}
