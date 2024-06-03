window.BattleAnimations = {
    async spin(event, onComplete) {
      const element = event.caster.spriteElement;
      const animationClassName = event.caster.team === "hero" ? "battle-spin-left" : "battle-spin-right";
      element.classList.add(animationClassName);
  
      //Remove class when animation is fully complete
      element.addEventListener("animationend", () => {
        element.classList.remove(animationClassName);
      }, { once:true });
  
      //Continue battle cycle right around when the pizzas collide
      await utils.wait(100);
      onComplete();
    },

    async fire(event, onComplete) {
      const { caster,target } = event;
      const fireElement = document.createElement("div");
      fireElement.classList.add("fire-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      fireElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      fireElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(fireElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      fireElement.classList.add("impact");
      fireElement.addEventListener("animationend", () => {
        fireElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async water(event, onComplete) {
      const { caster,target } = event;
      const fireElement = document.createElement("div");
      fireElement.classList.add("water-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      fireElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      fireElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(fireElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      fireElement.classList.add("impact");
      fireElement.addEventListener("animationend", () => {
        fireElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async ice(event, onComplete) {
      const { caster,target } = event;
      const fireElement = document.createElement("div");
      fireElement.classList.add("ice-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      fireElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      fireElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(fireElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      fireElement.classList.add("impact");
      fireElement.addEventListener("animationend", () => {
        fireElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async bolt(event, onComplete) {
      const { caster,target } = event;
      const fireElement = document.createElement("div");
      fireElement.classList.add("bolt-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      fireElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      fireElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(fireElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      fireElement.classList.add("impact");
      fireElement.addEventListener("animationend", () => {
        fireElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async drain(event, onComplete) {
      const { caster,target } = event;
      const fireElement = document.createElement("div");
      fireElement.classList.add("drain-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      fireElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      fireElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(fireElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      fireElement.classList.add("impact");
      fireElement.addEventListener("animationend", () => {
        fireElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async flood(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("flood-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async thunder(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("thunder-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async flash(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("flash-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async sleep(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("sleep-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async blast(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("blast-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async vulcan(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("vulcan-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async crystal(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("crystal-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async fireSword(event, onComplete) {
      const { target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("fireSword-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async sleeps(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("sleeps-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async blizzard(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("blizzard-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async vampirism(event, onComplete) {
      const { caster,target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("vampirism-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(200);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(200);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async waterSword(event, onComplete) {
      const { target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("waterSword-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async iceSword(event, onComplete) {
      const { target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("iceSword-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

    async boltSword(event, onComplete) {
      const { target } = event;
      const drainElement = document.createElement("div");
      drainElement.classList.add("boltSword-animation");
  
      // Posicione a animação de fogo sobre o alvo
      const targetRect = target.spriteElement.getBoundingClientRect();
      drainElement.style.left = `${targetRect.left + (targetRect.width / 2) - 0}px`; // Ajuste conforme necessário
      drainElement.style.top = `${targetRect.top + (targetRect.height / 2) - 0}px`; // Ajuste conforme necessário
  
      document.body.appendChild(drainElement);
  
      // Adicione a classe de impacto para a animação de erupção
      drainElement.classList.add("impact");
      drainElement.addEventListener("animationend", () => {
        drainElement.remove();
        onComplete();
      }, { once: true });

      // Aguarde a duração da animação mais um pouco antes de continuar
    await utils.wait(2000); // 1500ms da animação + 500ms do move
    onComplete();
    },

  }