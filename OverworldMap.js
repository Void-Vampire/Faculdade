class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};
        this.encounterZones = config.encounterZones || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.isCutscenePlaying = false;
    }

    // Metodo
drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(this.lowerImage, 
        utils.withGrid(21) - cameraPerson.x,
        utils.withGrid(12.5) - cameraPerson.y,)
    
}
    // Metodo para validar a Colisão
isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX,currentY, direction);
    return this.walls[`${x},${y}`] || false;
}

mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {

      let object = this.gameObjects[key];
      object.id = key;

      //TODO: determine if this object should actually mount
      object.mount(this);

    })
  }

async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i=0; i<events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    //Resetar NPCS
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events)
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene( match[0].events )
    }

    this.checkForEncounterZone();
  }

checkForEncounterZone() {
        const hero = this.gameObjects["hero"];
        const currentCoords = `${hero.x},${hero.y}`;
        const zone = this.encounterZones[currentCoords];

        console.log("Checking for encounter zone at:", currentCoords, "Found zone:", zone);

        if (zone) {
          console.log("Starting battle with enemy ID:", zone[0].events[0].enemyId);
          this.startCutscene([
              {type: "battle", enemyId: zone[0].events[0].enemyId}
          ]);
      }
    }

addWall(x,y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x,y) {
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const {x,y} = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x,y);
  }
}

window.OverworldMaps = {
    Forest1: {
        lowerSrc: "/image/maps/Forest1.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(6),
                y: utils.withGrid(12),
                src: "image/character/hero.png",
            }),
            npc1: new Person({
                x: utils.withGrid(5),
                y: utils.withGrid(3),
                src: "/image/character/npc1.png",
                isSmallCharacter: true,
                }),  
            npc2: new Person({
                    x: utils.withGrid(8),
                    y: utils.withGrid(3),
                    src: "/image/character/hero2.png",
                    talking: [{
                      events: [{ type: "textMessage", text: "Press Enter to Advanced Messages", faceHero: "npc2"},
                        ]}]
                      })
        },
        walls: {
            [utils.asGridCoord(7,6)] : true
        },
        cutsceneSpaces: {
            [utils.asGridCoord(0,0)]: [{
                events: [
                  { who: "hero", type: "walk",  direction: "down" },
                  { who: "hero", type: "walk",  direction: "left" },
                  { type: "textMessage", text:"You can't be in there!"},
                ]
              }],
            [utils.asGridCoord(15,0)]: [{
                events: [
                  { type: "changeMap", map: "Forest2" }
                ]
        }],
          },
          encounterZones: {
            [utils.asGridCoord(2,3)]: [{
              events: [
                { type: "battle", enemyId: "Forest1" }
              ]
      }],
          }
            
    },
    Forest2: {
        lowerSrc: "/image/maps/Forest2.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5),
                src: "image/character/hero.png",
            }),
            npc1: new Person({
                x: utils.withGrid(3),
                y: utils.withGrid(3),
                src: "/image/character/npc1.png",
                isSmallCharacter: true,
               })
        }
    }
}
