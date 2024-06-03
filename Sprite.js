class Sprite {
  constructor(config) {
    //Setar Imagens
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    //Configurar Animação e Status Iniciais
    this.animations = config.animations || {
      "idle-up": [[0, 0]],
      "idle-down": [[0, 1]],
      "idle-left": [[0, 2]],
      "idle-right": [[0, 3]],
      "walk-up": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-down": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-left": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-right": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = "idle-right"; // config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    // Velocidade do Personagem
    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    // Referencia ao GameObject
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  // Setar Animação
  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    // Redução do Progresso de Frame
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    // Resetar o Contador
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + utils.withGrid(21) - cameraPerson.x;
    const y = this.gameObject.y + 18 + utils.withGrid(11) - cameraPerson.y;

    const frameMultiplier = this.gameObject.isSmallCharacter ? 32 : 64; // Determina o multiplicador do frame

    const [frameX, frameY] = this.frame;

    this.isLoaded &&
      ctx.drawImage(
        this.image,
        frameX * frameMultiplier,
        frameY * frameMultiplier,
        32,
        32,
        x,
        y,
        32,
        32
      );
    this.updateAnimationProgress();
  }
}
