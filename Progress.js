class Progress {
  constructor() {
    this.mapId = "Forest1";
    this.startingHeroX = 0;
    this.startingHeroY = 0;
    this.startingHeroDirection = "down";
    this.saveFileKey = "QueenSwords_SaveFile1";
  }

  save() {
    // Filtrar dados para evitar referências circulares
    const dataToSave = {
      mapId: this.mapId,
      startingHeroX: this.startingHeroX,
      startingHeroY: this.startingHeroY,
      startingHeroDirection: this.startingHeroDirection,
      playerState: {
        hero: playerState.hero,
        lineup: playerState.lineup,
        items: playerState.items,
        storyFlags: playerState.storyFlags,
      },
    };

    window.localStorage.setItem(
      this.saveFileKey,
      JSON.stringify(dataToSave, this.circularReplacer())
    );
  }

  // Função para remover referências circulares
  circularReplacer() {
    const seen = new WeakSet();
    return function (key, value) {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  }

  getSaveFile() {
    const file = window.localStorage.getItem(this.saveFileKey);
    return file ? JSON.parse(file) : null;
  }

  load() {
    const file = this.getSaveFile();
    if (file) {
      this.mapId = file.mapId;
      this.startingHeroX = file.startingHeroX;
      this.startingHeroY = file.startingHeroY;
      this.startingHeroDirection = file.startingHeroDirection;
      Object.keys(file.playerState).forEach((key) => {
        playerState[key] = file.playerState[key];
      });
    }
  }
}
