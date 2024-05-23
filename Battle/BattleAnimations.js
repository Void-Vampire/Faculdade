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

    async createOrb(event, onComplete) {
      const { caster, target } = event;
      const orb = document.createElement("div");
      orb.classList.add("orb");
      
      // Calcula a posição central do alvo
  const targetRect = target.spriteElement.getBoundingClientRect();
  const targetCenterX = targetRect.left + targetRect.width / 2;
  const targetCenterY = targetRect.top + targetRect.height / 2;
  
  // Define a posição do orb com base na posição central do alvo
  orb.style.left = `${targetCenterX}px`; // Posição horizontal central
  orb.style.top = `${targetCenterY}px`; // Posição vertical central
      document.body.appendChild(orb);

      

      if (caster.team === "hero") {
        caster.spriteElement.classList.add("hero-move-left");
      } else {
        caster.spriteElement.classList.add("enemy-move-right");
      }
      await utils.wait(100);
      setTimeout(() => {
        if (caster.team === "hero") {
          caster.spriteElement.classList.remove("hero-move-left");
        } else {
          caster.spriteElement.classList.remove("enemy-move-right");
        }
      }, 500);
  
      // Aguarde um curto período para a animação ser visível
      await utils.wait(100);
  
      // Remova o orbe após a animação
      orb.classList.add("disappear");
      orb.addEventListener("animationend", () => {
        orb.remove();
        onComplete();
      });
    }
  }