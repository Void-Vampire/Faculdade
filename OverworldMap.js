class OverworldMap {
    constructor(config) {
        this.overworld = null;
        this.gameObjects = {}; // Live objects are in here
        this.configObjects = config.configObjects; // Configuration content


        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};
        this.encounterZones = config.encounterZones || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.isCutscenePlaying = false;
        this.isPaused = false;
    }

    // Metodo
drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(this.lowerImage, 
        utils.withGrid(21) - cameraPerson.x,
        utils.withGrid(12) - cameraPerson.y,)
    
}
    // Metodo para validar a Colisão
isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX,currentY, direction);
    if (this.walls[`${x},${y}`]) {
      return true;
    }
    //Check for game objects at this position
    return Object.values(this.gameObjects).find(obj => {
      if (obj.x === x && obj.y === y) { return true; }
      if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y ) {
        return true;
      }
      return false;
    })
}

mountObjects() {
  Object.keys(this.configObjects).forEach(key => {

    let object = this.configObjects[key];
    object.id = key;

    let instance;
    if (object.type === "Person") {
      instance = new Person(object);
    }
    this.gameObjects[key] = instance;
    this.gameObjects[key].id = key;
    instance.mount(this);
  })
}

async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i=0; i<events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      const result = await eventHandler.init();
      if (result === "LOST_BATTLE") {
        break;
      }
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

      const relevantScenario = match.talking.find(scenario => {
        return (scenario.required || []).every(sf => {
          return playerState.storyFlags[sf]
        })
      })
      relevantScenario && this.startCutscene(relevantScenario.events)
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

        if (zone) {
          this.startCutscene([
              {type: "battle", enemyId: zone[0].events[0].enemyId}
          ]);
      }
    }
}

window.OverworldMaps = {
    Forest1: {
        id: "Forest1",
        lowerSrc: "/image/maps/Forest1.png",
        configObjects: {
          hero: {
              type: "Person",
                isPlayerControlled: true,
                x: utils.withGrid(9),
                y: utils.withGrid(14),
                src: "image/character/hero.png",
            },
          npc1: {
              type: "Person",
                x: utils.withGrid(14),
                y: utils.withGrid(9),
                src: "/image/character/npc1.png",
                talking: [
                  {
                    required: ["PROLOGO"],
            events: [
              { type: "textMessage", text: "Se tiver duvidas com comandos ou coisas do tipo fale com a garota acima", faceHero: "npc1" },
            ]
                  },
                  {
                    events: [
                      { type: "textMessage", text: "Bem vindo ao Prologo de Queen of Swords, Essa é uma versão teste que contém pouco conteúdo, aproveite.", faceHero: "npc1" },
                      { type: "addStoryFlag", flag: "PROLOGO"},
                      // { type: "textMessage", text: "Go away!"},
                      //{ who: "hero", type: "walk",  direction: "up" },
                    ]
                  }
                ]
                },  
                npc2: {
                  type: "Person",
                  x: utils.withGrid(11),
                  y: utils.withGrid(3),
                  src: "/image/character/npc1.png",
                  talking: [
                    {
                    events: [
                      { type: "textMessage", text: "Obviamente voce percebeu que para se mover é o famoso AWSD ou Cima, Baixo, Direita, Esquerda, Para abrir a opção de menu ESC e isso é tudo por hora", faceHero: "npc2"},
                      
                      ]
                    }
                  ]
                    },
          hero2: {
                    type: "Person",
                    x: utils.withGrid(11),
                    y: utils.withGrid(16),
                    direction: "left",
                    src: "/image/character/hero2.png",
                    talking: [
                      {
                      events: [
                        { type: "textMessage", text: "FREYA: Vamos terminar com isso logo Ishtar, já descansamos vamos seguir em frente", faceHero: "hero2"},
                        
                        ]
                      }
                    ]
                      },
           hero3: {
                        type: "Person",
                        x: utils.withGrid(7),
                        y: utils.withGrid(16),
                        direction: "right",
                        src: "/image/character/hero3.png",
                        talking: [
                          {
                          events: [
                            { type: "textMessage", text: "CELESTIA: Espero que as informaçoes estejam corretas sobre esse culto maligno", faceHero: "hero3"},
                            
                            ]
                          }
                        ]
                          },
                          hero4: {
                            type: "Person",
                            x: utils.withGrid(9),
                            y: utils.withGrid(19),
                            direction: "up",
                            src: "/image/character/hero4.png",
                            talking: [
                              {
                              events: [
                                { type: "textMessage", text: "AERIN: Estou com fome", faceHero: "hero4"},
                                
                                ]
                              }
                            ]
                              },
              
        },
        walls: {
            // 1 Conjunto de Arvores
            [utils.asGridCoord(0,0)] : true,
            [utils.asGridCoord(0,1)] : true,
            [utils.asGridCoord(0,2)] : true,
            [utils.asGridCoord(1,0)] : true,
            [utils.asGridCoord(2,0)] : true,
            [utils.asGridCoord(3,0)] : true,
            [utils.asGridCoord(4,0)] : true,
            [utils.asGridCoord(5,0)] : true,
            [utils.asGridCoord(6,0)] : true,
            [utils.asGridCoord(7,0)] : true,
            [utils.asGridCoord(8,0)] : true,
            [utils.asGridCoord(9,0)] : true,
            [utils.asGridCoord(10,0)] : true,
            [utils.asGridCoord(11,0)] : true,
            [utils.asGridCoord(1,2)] : true,
            [utils.asGridCoord(2,2)] : true,
            [utils.asGridCoord(3,2)] : true,
            [utils.asGridCoord(4,2)] : true,
            [utils.asGridCoord(5,2)] : true,
            [utils.asGridCoord(6,2)] : true,
            [utils.asGridCoord(7,2)] : true,
            [utils.asGridCoord(8,2)] : true,
            [utils.asGridCoord(9,2)] : true,
            [utils.asGridCoord(10,2)] : true,
            [utils.asGridCoord(11,1)] : true,
            [utils.asGridCoord(11,2)] : true,

            // 2 Conjunto de Arvores
            [utils.asGridCoord(18,0)] : true,
            [utils.asGridCoord(18,1)] : true,
            [utils.asGridCoord(18,2)] : true,
            [utils.asGridCoord(19,0)] : true,
            [utils.asGridCoord(20,0)] : true,
            [utils.asGridCoord(21,0)] : true,
            [utils.asGridCoord(22,0)] : true,
            [utils.asGridCoord(23,0)] : true,
            [utils.asGridCoord(24,0)] : true,
            [utils.asGridCoord(25,0)] : true,
            [utils.asGridCoord(26,0)] : true,
            [utils.asGridCoord(27,0)] : true,
            [utils.asGridCoord(28,0)] : true,
            [utils.asGridCoord(29,0)] : true,
            [utils.asGridCoord(29,1)] : true,
            [utils.asGridCoord(29,2)] : true,
            [utils.asGridCoord(28,2)] : true,
            [utils.asGridCoord(27,2)] : true,
            [utils.asGridCoord(26,2)] : true,
            [utils.asGridCoord(25,2)] : true,
            [utils.asGridCoord(24,2)] : true,
            [utils.asGridCoord(23,2)] : true,
            [utils.asGridCoord(22,2)] : true,
            [utils.asGridCoord(21,2)] : true,
            [utils.asGridCoord(20,2)] : true,
            [utils.asGridCoord(19,2)] : true,

            // 3 Conunto de Arvores
            [utils.asGridCoord(0,6)] : true,
            [utils.asGridCoord(1,6)] : true,
            [utils.asGridCoord(2,6)] : true,
            [utils.asGridCoord(3,6)] : true,
            [utils.asGridCoord(4,6)] : true,
            [utils.asGridCoord(5,6)] : true,
            [utils.asGridCoord(6,6)] : true,
            [utils.asGridCoord(7,6)] : true,
            [utils.asGridCoord(8,6)] : true,
            [utils.asGridCoord(9,6)] : true,
            [utils.asGridCoord(10,6)] : true,
            [utils.asGridCoord(11,6)] : true,
            [utils.asGridCoord(12,6)] : true,
            [utils.asGridCoord(13,6)] : true,
            [utils.asGridCoord(14,6)] : true,
            [utils.asGridCoord(14,7)] : true,
            [utils.asGridCoord(14,8)] : true,
            [utils.asGridCoord(0,7)] : true,
            [utils.asGridCoord(0,8)] : true,
            [utils.asGridCoord(1,8)] : true,
            [utils.asGridCoord(2,8)] : true,
            [utils.asGridCoord(3,8)] : true,
            [utils.asGridCoord(4,8)] : true,
            [utils.asGridCoord(5,8)] : true,
            [utils.asGridCoord(6,8)] : true,
            [utils.asGridCoord(7,8)] : true,
            [utils.asGridCoord(8,8)] : true,
            [utils.asGridCoord(9,8)] : true,
            [utils.asGridCoord(10,8)] : true,
            [utils.asGridCoord(11,8)] : true,
            [utils.asGridCoord(12,8)] : true,
            [utils.asGridCoord(13,8)] : true,

            // 4 Conjunto de Arvores
            [utils.asGridCoord(0,10)] : true,
            [utils.asGridCoord(0,11)] : true,
            [utils.asGridCoord(0,12)] : true,
            [utils.asGridCoord(1,10)] : true,
            [utils.asGridCoord(2,10)] : true,
            [utils.asGridCoord(3,10)] : true,
            [utils.asGridCoord(4,10)] : true,
            [utils.asGridCoord(5,10)] : true,
            [utils.asGridCoord(6,10)] : true,
            [utils.asGridCoord(7,10)] : true,
            [utils.asGridCoord(8,10)] : true,
            [utils.asGridCoord(9,10)] : true,
            [utils.asGridCoord(10,10)] : true,
            [utils.asGridCoord(11,10)] : true,
            [utils.asGridCoord(11,11)] : true,
            [utils.asGridCoord(11,12)] : true,
            [utils.asGridCoord(10,12)] : true,
            [utils.asGridCoord(9,12)] : true,
            [utils.asGridCoord(8,12)] : true,
            [utils.asGridCoord(7,12)] : true,
            [utils.asGridCoord(6,12)] : true,
            [utils.asGridCoord(5,12)] : true,
            [utils.asGridCoord(4,12)] : true,
            [utils.asGridCoord(3,12)] : true,
            [utils.asGridCoord(2,12)] : true,
            [utils.asGridCoord(1,12)] : true,

            // 3 Pequenos Conjuntos de Arvores na esquerda
            [utils.asGridCoord(0,14)] : true,
            [utils.asGridCoord(0,15)] : true,
            [utils.asGridCoord(0,16)] : true,
            [utils.asGridCoord(1,14)] : true,
            [utils.asGridCoord(2,14)] : true,
            [utils.asGridCoord(3,14)] : true,
            [utils.asGridCoord(4,14)] : true,
            [utils.asGridCoord(5,14)] : true,
            [utils.asGridCoord(5,15)] : true,
            [utils.asGridCoord(5,16)] : true,
            [utils.asGridCoord(1,16)] : true,
            [utils.asGridCoord(2,16)] : true,
            [utils.asGridCoord(3,16)] : true,
            [utils.asGridCoord(4,16)] : true,

            [utils.asGridCoord(0,18)] : true,
            [utils.asGridCoord(0,19)] : true,
            [utils.asGridCoord(0,20)] : true,
            [utils.asGridCoord(5,18)] : true,
            [utils.asGridCoord(5,19)] : true,
            [utils.asGridCoord(5,20)] : true,
            [utils.asGridCoord(1,18)] : true,
            [utils.asGridCoord(2,18)] : true,
            [utils.asGridCoord(3,18)] : true,
            [utils.asGridCoord(4,18)] : true,
            [utils.asGridCoord(1,20)] : true,
            [utils.asGridCoord(2,20)] : true,
            [utils.asGridCoord(3,20)] : true,
            [utils.asGridCoord(4,20)] : true,

            [utils.asGridCoord(0,22)] : true,
            [utils.asGridCoord(0,23)] : true,
            [utils.asGridCoord(0,24)] : true,
            [utils.asGridCoord(5,22)] : true,
            [utils.asGridCoord(5,23)] : true,
            [utils.asGridCoord(5,24)] : true,
            [utils.asGridCoord(1,22)] : true,
            [utils.asGridCoord(2,22)] : true,
            [utils.asGridCoord(3,22)] : true,
            [utils.asGridCoord(4,22)] : true,
            [utils.asGridCoord(1,24)] : true,
            [utils.asGridCoord(2,24)] : true,
            [utils.asGridCoord(3,24)] : true,
            [utils.asGridCoord(4,24)] : true,

            //Resto
            [utils.asGridCoord(0,26)] : true,
            [utils.asGridCoord(1,26)] : true,
            [utils.asGridCoord(2,26)] : true,
            [utils.asGridCoord(3,26)] : true,
            [utils.asGridCoord(4,26)] : true,
            [utils.asGridCoord(5,26)] : true,
            [utils.asGridCoord(6,26)] : true,
            [utils.asGridCoord(7,26)] : true,
            [utils.asGridCoord(8,26)] : true,
            [utils.asGridCoord(9,26)] : true,
            [utils.asGridCoord(10,26)] : true,
            [utils.asGridCoord(11,26)] : true,
            [utils.asGridCoord(12,26)] : true,
            [utils.asGridCoord(13,26)] : true,
            [utils.asGridCoord(14,25)] : true,
            [utils.asGridCoord(14,24)] : true,
            [utils.asGridCoord(14,23)] : true,
            [utils.asGridCoord(14,22)] : true,
            [utils.asGridCoord(14,21)] : true,
            [utils.asGridCoord(14,20)] : true,
            [utils.asGridCoord(14,19)] : true,
            [utils.asGridCoord(14,18)] : true,
            [utils.asGridCoord(14,17)] : true,
            [utils.asGridCoord(14,16)] : true,
            [utils.asGridCoord(14,15)] : true,
            [utils.asGridCoord(14,14)] : true,
            [utils.asGridCoord(15,14)] : true,
            [utils.asGridCoord(16,14)] : true,
            [utils.asGridCoord(16,15)] : true,
            [utils.asGridCoord(16,16)] : true,
            [utils.asGridCoord(17,16)] : true,
            [utils.asGridCoord(18,16)] : true,
            [utils.asGridCoord(19,16)] : true,
            [utils.asGridCoord(20,15)] : true,
            [utils.asGridCoord(20,14)] : true,
            [utils.asGridCoord(21,14)] : true,
            [utils.asGridCoord(22,14)] : true,
            [utils.asGridCoord(23,14)] : true,
            [utils.asGridCoord(24,15)] : true,
            [utils.asGridCoord(25,15)] : true,
            [utils.asGridCoord(25,16)] : true,
            [utils.asGridCoord(25,17)] : true,
            [utils.asGridCoord(25,18)] : true,
            [utils.asGridCoord(25,19)] : true,
            [utils.asGridCoord(25,20)] : true,
            [utils.asGridCoord(25,21)] : true,
            [utils.asGridCoord(25,22)] : true,
            [utils.asGridCoord(25,23)] : true,
            [utils.asGridCoord(25,24)] : true,
            [utils.asGridCoord(24,24)] : true,
            [utils.asGridCoord(23,24)] : true,
            [utils.asGridCoord(22,24)] : true,
            [utils.asGridCoord(21,24)] : true,
            [utils.asGridCoord(20,24)] : true,
            [utils.asGridCoord(19,24)] : true,
            [utils.asGridCoord(18,24)] : true,
            [utils.asGridCoord(17,24)] : true,
            [utils.asGridCoord(16,25)] : true,
            [utils.asGridCoord(17,26)] : true,
            [utils.asGridCoord(18,26)] : true,
            [utils.asGridCoord(19,26)] : true,
            [utils.asGridCoord(20,26)] : true,
            [utils.asGridCoord(21,26)] : true,
            [utils.asGridCoord(22,26)] : true,
            [utils.asGridCoord(23,26)] : true,
            [utils.asGridCoord(24,26)] : true,
            [utils.asGridCoord(25,26)] : true,
            [utils.asGridCoord(26,26)] : true,
            [utils.asGridCoord(27,26)] : true,
            [utils.asGridCoord(28,26)] : true,
            [utils.asGridCoord(29,26)] : true,
            [utils.asGridCoord(22,6)] : true,
            [utils.asGridCoord(23,6)] : true,
            [utils.asGridCoord(25,6)] : true,
            [utils.asGridCoord(26,6)] : true,
            [utils.asGridCoord(27,6)] : true,
            [utils.asGridCoord(28,6)] : true,
            [utils.asGridCoord(29,6)] : true,
            [utils.asGridCoord(22,7)] : true,
            [utils.asGridCoord(23,7)] : true,
            [utils.asGridCoord(25,7)] : true,
            [utils.asGridCoord(26,7)] : true,
            [utils.asGridCoord(20,13)] : true,
            [utils.asGridCoord(21,13)] : true,
            [utils.asGridCoord(27,8)] : true,
            [utils.asGridCoord(28,8)] : true,
            [utils.asGridCoord(29,8)] : true,
            [utils.asGridCoord(27,10)] : true,
            [utils.asGridCoord(27,11)] : true,
            [utils.asGridCoord(27,12)] : true,
            [utils.asGridCoord(28,12)] : true,
            [utils.asGridCoord(29,12)] : true,
            [utils.asGridCoord(28,10)] : true,
            [utils.asGridCoord(29,10)] : true,
            [utils.asGridCoord(27,14)] : true,
            [utils.asGridCoord(27,15)] : true,
            [utils.asGridCoord(27,16)] : true,
            [utils.asGridCoord(28,16)] : true,
            [utils.asGridCoord(29,16)] : true,
            [utils.asGridCoord(28,14)] : true,
            [utils.asGridCoord(29,14)] : true,
            [utils.asGridCoord(27,18)] : true,
            [utils.asGridCoord(27,19)] : true,
            [utils.asGridCoord(27,20)] : true,
            [utils.asGridCoord(28,20)] : true,
            [utils.asGridCoord(29,20)] : true,
            [utils.asGridCoord(28,18)] : true,
            [utils.asGridCoord(29,18)] : true,
            [utils.asGridCoord(27,22)] : true,
            [utils.asGridCoord(27,23)] : true,
            [utils.asGridCoord(27,24)] : true,
            [utils.asGridCoord(28,24)] : true,
            [utils.asGridCoord(29,24)] : true,
            [utils.asGridCoord(28,22)] : true,
            [utils.asGridCoord(29,22)] : true,

            // Outside
            [utils.asGridCoord(-1,3)] : true,
            [utils.asGridCoord(-1,4)] : true,
            [utils.asGridCoord(-1,5)] : true,
            [utils.asGridCoord(-1,9)] : true,
            [utils.asGridCoord(-1,13)] : true,
            [utils.asGridCoord(-1,17)] : true,
            [utils.asGridCoord(-1,21)] : true,
            [utils.asGridCoord(-1,25)] : true,
            [utils.asGridCoord(30,3)] : true,
            [utils.asGridCoord(30,4)] : true,
            [utils.asGridCoord(30,5)] : true,
            [utils.asGridCoord(30,9)] : true,
            [utils.asGridCoord(30,13)] : true,
            [utils.asGridCoord(30,17)] : true,
            [utils.asGridCoord(30,21)] : true,
            [utils.asGridCoord(30,25)] : true,
            [utils.asGridCoord(12,-1)] : true,
            [utils.asGridCoord(13,-1)] : true,
            [utils.asGridCoord(14,-1)] : true,
            [utils.asGridCoord(15,-1)] : true,
            [utils.asGridCoord(16,-1)] : true,
            [utils.asGridCoord(17,-1)] : true,

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
                  { 
                    type: "changeMap", 
                    map: "Forest2",
                    x: utils.withGrid(15),
                    y: utils.withGrid(23), 
                    direction: "down",
                  }
                ]
        }],
        [utils.asGridCoord(14,0)]: [{
          events: [
            { 
              type: "changeMap", 
              map: "Forest2",
              x: utils.withGrid(14),
              y: utils.withGrid(23), 
              direction: "down",
            }
          ]
  }],
          },
          encounterZones: {
            [utils.asGridCoord(9,13)]: [{
              events: [
                { type: "battle", enemyId: "teste" }
              ]
      }],
    },
  },
    Forest2: {
        id: "Forest2",
        lowerSrc: "/image/maps/Forest2.png",
        configObjects: {
            hero: {
                type: "Person",
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5),
                src: "image/character/hero.png",
            },
            npc1: {
              type: "Person",
                x: utils.withGrid(4),
                y: utils.withGrid(17),
                src: "/image/character/npc1.png",
                talking: [
                  {
                  events: [
                    { type: "textMessage", text: "Logo acima de mim, nessa area mais verde tem encontro com um grupo de inimigos, fique a vontade para testar o modo de combate", faceHero: "npc1"},
                    ]
                  }
                ]
               },
               hero2: {
                type: "Person",
                x: utils.withGrid(15),
                y: utils.withGrid(12),
                direction: "left",
                src: "/image/character/hero2.png",
                talking: [
                  {
                  events: [
                    { type: "textMessage", text: "FREYA: Uma casinha no meio do nada, que suspeito", faceHero: "hero2"},
                    
                    ]
                  }
                ]
                  },
                  hero3: {
                    type: "Person",
                    x: utils.withGrid(26),
                    y: utils.withGrid(8),
                    direction: "down",
                    src: "/image/character/hero3.png",
                    talking: [
                      {
                      events: [
                        { type: "textMessage", text: "CELESTIA: Parece que as informaçoes eram corretas", faceHero: "hero3"},
                        ]
                      }
                    ]
                      },
                      hero4: {
                        type: "Person",
                        x: utils.withGrid(21),
                        y: utils.withGrid(6),
                        direction: "down",
                        src: "/image/character/hero4.png",
                        talking: [
                          {
                          events: [
                            { type: "textMessage", text: "AERIN: Vamos entrar Freya", faceHero: "hero4"},
                            ]
                          }
                        ]
                          },
        },
        walls: {
          [utils.asGridCoord(12,24)] : true,
          [utils.asGridCoord(13,24)] : true,
          [utils.asGridCoord(14,24)] : true,
          [utils.asGridCoord(15,24)] : true,
          [utils.asGridCoord(16,24)] : true,
          [utils.asGridCoord(17,24)] : true,
          [utils.asGridCoord(18,23)] : true,
          [utils.asGridCoord(18,22)] : true,
          [utils.asGridCoord(18,21)] : true,
          [utils.asGridCoord(19,21)] : true,
          [utils.asGridCoord(20,21)] : true,
          [utils.asGridCoord(21,21)] : true,
          [utils.asGridCoord(22,21)] : true,
          [utils.asGridCoord(23,21)] : true,
          [utils.asGridCoord(24,21)] : true,
          [utils.asGridCoord(25,21)] : true,
          [utils.asGridCoord(26,21)] : true,
          [utils.asGridCoord(27,21)] : true,
          [utils.asGridCoord(28,21)] : true,
          [utils.asGridCoord(29,21)] : true,
          [utils.asGridCoord(11,23)] : true,
          [utils.asGridCoord(11,22)] : true,
          [utils.asGridCoord(11,21)] : true,
          [utils.asGridCoord(10,21)] : true,
          [utils.asGridCoord(9,21)] : true,
          [utils.asGridCoord(8,21)] : true,
          [utils.asGridCoord(7,21)] : true,
          [utils.asGridCoord(6,21)] : true,
          [utils.asGridCoord(5,21)] : true,
          [utils.asGridCoord(4,21)] : true,
          [utils.asGridCoord(3,21)] : true,
          [utils.asGridCoord(2,21)] : true,
          [utils.asGridCoord(1,21)] : true,
          [utils.asGridCoord(0,21)] : true,
          [utils.asGridCoord(28,18)] : true,
          [utils.asGridCoord(28,19)] : true,
          [utils.asGridCoord(29,18)] : true,
          [utils.asGridCoord(29,19)] : true,
          [utils.asGridCoord(28,15)] : true,
          [utils.asGridCoord(28,16)] : true,
          [utils.asGridCoord(29,15)] : true,
          [utils.asGridCoord(29,16)] : true,
          [utils.asGridCoord(28,9)] : true,
          [utils.asGridCoord(28,10)] : true,
          [utils.asGridCoord(28,12)] : true,
          [utils.asGridCoord(28,13)] : true,
          [utils.asGridCoord(29,9)] : true,
          [utils.asGridCoord(29,10)] : true,
          [utils.asGridCoord(29,12)] : true,
          [utils.asGridCoord(29,13)] : true,
          [utils.asGridCoord(11,14)] : true,
          [utils.asGridCoord(11,13)] : true,
          [utils.asGridCoord(12,14)] : true,
          [utils.asGridCoord(12,13)] : true,
          [utils.asGridCoord(9,11)] : true,
          [utils.asGridCoord(9,10)] : true,
          [utils.asGridCoord(10,11)] : true,
          [utils.asGridCoord(10,10)] : true,
          [utils.asGridCoord(14,9)] : true,
          [utils.asGridCoord(14,8)] : true,
          [utils.asGridCoord(15,9)] : true,
          [utils.asGridCoord(15,8)] : true,
          [utils.asGridCoord(16,11)] : true,
          [utils.asGridCoord(16,12)] : true,
          [utils.asGridCoord(17,11)] : true,
          [utils.asGridCoord(17,12)] : true,
          [utils.asGridCoord(0,8)] : true,
          [utils.asGridCoord(1,8)] : true,
          [utils.asGridCoord(2,8)] : true,
          [utils.asGridCoord(2,9)] : true,
          [utils.asGridCoord(2,10)] : true,
          [utils.asGridCoord(1,10)] : true,
          [utils.asGridCoord(0,9)] : true,
          [utils.asGridCoord(0,10)] : true,
          [utils.asGridCoord(0,2)] : true,
          [utils.asGridCoord(1,2)] : true,
          [utils.asGridCoord(2,0)] : true,
          [utils.asGridCoord(2,1)] : true,
          [utils.asGridCoord(2,2)] : true,
          [utils.asGridCoord(0,4)] : true,
          [utils.asGridCoord(1,4)] : true,
          [utils.asGridCoord(2,4)] : true,
          [utils.asGridCoord(2,5)] : true,
          [utils.asGridCoord(0,6)] : true,
          [utils.asGridCoord(1,6)] : true,
          [utils.asGridCoord(2,6)] : true,
          [utils.asGridCoord(5,0)] : true,
          [utils.asGridCoord(5,1)] : true,
          [utils.asGridCoord(5,2)] : true,
          [utils.asGridCoord(6,2)] : true,
          [utils.asGridCoord(7,2)] : true,
          [utils.asGridCoord(8,2)] : true,
          [utils.asGridCoord(9,2)] : true,
          [utils.asGridCoord(10,2)] : true,
          [utils.asGridCoord(11,2)] : true,
          [utils.asGridCoord(12,2)] : true,
          [utils.asGridCoord(13,2)] : true,
          [utils.asGridCoord(14,2)] : true,
          [utils.asGridCoord(15,2)] : true,
          [utils.asGridCoord(16,2)] : true,
          [utils.asGridCoord(17,1)] : true,
          [utils.asGridCoord(17,2)] : true,
          [utils.asGridCoord(17,3)] : true,
          [utils.asGridCoord(17,4)] : true,
          [utils.asGridCoord(17,5)] : true,
          [utils.asGridCoord(17,6)] : true,
          [utils.asGridCoord(17,7)] : true,
          [utils.asGridCoord(17,7)] : true,
          [utils.asGridCoord(18,7)] : true,
          [utils.asGridCoord(19,7)] : true,
          [utils.asGridCoord(20,7)] : true,
          [utils.asGridCoord(26,7)] : true,
          [utils.asGridCoord(27,7)] : true,
          [utils.asGridCoord(28,7)] : true,
          [utils.asGridCoord(28,7)] : true,
          [utils.asGridCoord(28,6)] : true,
          [utils.asGridCoord(28,5)] : true,
          [utils.asGridCoord(28,4)] : true,
          [utils.asGridCoord(28,3)] : true,
          [utils.asGridCoord(28,2)] : true,
          [utils.asGridCoord(28,1)] : true,
          [utils.asGridCoord(28,0)] : true,
          [utils.asGridCoord(27,0)] : true,
          [utils.asGridCoord(26,0)] : true,
          [utils.asGridCoord(25,0)] : true,
          [utils.asGridCoord(24,0)] : true,
          [utils.asGridCoord(23,0)] : true,
          [utils.asGridCoord(22,0)] : true,
          [utils.asGridCoord(21,0)] : true,
          [utils.asGridCoord(20,0)] : true,
          [utils.asGridCoord(19,0)] : true,
          [utils.asGridCoord(18,0)] : true,

          //Outside
          [utils.asGridCoord(30,20)] : true,
          [utils.asGridCoord(30,17)] : true,
          [utils.asGridCoord(30,14)] : true,
          [utils.asGridCoord(30,11)] : true,
          [utils.asGridCoord(-1,3)] : true,
          [utils.asGridCoord(-1,7)] : true,
          [utils.asGridCoord(-1,11)] : true,
          [utils.asGridCoord(-1,12)] : true,
          [utils.asGridCoord(-1,13)] : true,
          [utils.asGridCoord(-1,14)] : true,
          [utils.asGridCoord(-1,15)] : true,
          [utils.asGridCoord(-1,16)] : true,
          [utils.asGridCoord(-1,17)] : true,
          [utils.asGridCoord(-1,18)] : true,
          [utils.asGridCoord(-1,19)] : true,
          [utils.asGridCoord(-1,20)] : true,
          [utils.asGridCoord(3,-1)] : true,
          [utils.asGridCoord(4,-1)] : true,

          [utils.asGridCoord(21,2)] : true,
          [utils.asGridCoord(21,3)] : true,
          [utils.asGridCoord(21,4)] : true,
          [utils.asGridCoord(21,5)] : true,
          [utils.asGridCoord(22,2)] : true,
          [utils.asGridCoord(23,2)] : true,
          [utils.asGridCoord(24,2)] : true,
          [utils.asGridCoord(24,4)] : true,
          [utils.asGridCoord(25,3)] : true,
          [utils.asGridCoord(25,2)] : true,
          [utils.asGridCoord(25,5)] : true,
          [utils.asGridCoord(22,5)] : true,
          [utils.asGridCoord(23,5)] : true,
          [utils.asGridCoord(25,5)] : true,
        },
        cutsceneSpaces: {
          [utils.asGridCoord(24,5)]: [{
            events: [
              { 
                type: "changeMap", 
                map: "House",
                x: utils.withGrid(7),
                y: utils.withGrid(8), 
                direction: "up",
              }
            ]
    }],
    [utils.asGridCoord(14,23)]: [{
      events: [
        { 
          type: "changeMap", 
          map: "Forest1",
          x: utils.withGrid(14),
          y: utils.withGrid(1), 
          direction: "down",
        }
      ]
}],
[utils.asGridCoord(15,23)]: [{
  events: [
    { 
      type: "changeMap", 
      map: "Forest1",
      x: utils.withGrid(15),
      y: utils.withGrid(1), 
      direction: "down",
    }
  ]
}],
        },
        encounterZones: {
          [utils.asGridCoord(4,15)]: [{
            events: [
              { type: "battle", enemyId: "Forest3" }
            ]
    }],
    [utils.asGridCoord(3,15)]: [{
      events: [
        { type: "battle", enemyId: "Forest1" }
      ]
}],
[utils.asGridCoord(2,15)]: [{
  events: [
    { type: "battle", enemyId: "Forest2" }
  ]
}],
[utils.asGridCoord(5,15)]: [{
  events: [
    { type: "battle", enemyId: "Forest4" }
  ]
}],
[utils.asGridCoord(6,15)]: [{
  events: [
    { type: "battle", enemyId: "Forest5" }
  ]
}],
[utils.asGridCoord(7,15)]: [{
  events: [
    { type: "battle", enemyId: "Forest6" }
  ]
}],
        }

    },
    House: {
      id: "House",
      lowerSrc: "/image/maps/house.png",
      configObjects: {
          hero: {
              type: "Person",
              isPlayerControlled: true,
              x: utils.withGrid(1),
              y: utils.withGrid(1),
              src: "image/character/hero.png",
          },
          npc1: {
            type: "Person",
              x: utils.withGrid(7),
              y: utils.withGrid(6),
              src: "/image/character/npc2.png",
              talking: [
                {
                  required: ["DEFEATEDGUARDIAN1"],
                  events: [
                    { type: "textMessage", text: "Morto", faceHero: "npc1"},
                    { who: "npc1", type: "walk",  direction: "up" },
                    ]
                  },
                {
                required: ["DEFEATEDGUARDIANS"],
                events: [
                  { type: "textMessage", text: "ISHTAR: Um lugar protegido por demonios que interessante", faceHero: "npc1"},
                  { type: "addStoryFlag", flag: "DEFEATEDGUARDIAN1"},
                  { who: "npc1", type: "walk",  direction: "up" },
                  ]
                },
                {
                  events: [
                    { type: "textMessage", text: "Guardas: perdida Garota? hahaha!", faceHero: "npc1" },
                    { type: "battle", enemyId: "House" },
                    { type: "addStoryFlag", flag: "DEFEATEDGUARDIANS"},
                    { type: "textMessage", text: "Reaper: Impossivel Demonios perderem para uma humana"},
                  ]
                }
                
              ]
             },
             npc2: {
              type: "Person",
                x: utils.withGrid(6),
                y: utils.withGrid(7),
                src: "/image/character/npc2.png",
                direction: "right",
                talking: [
                  {
                    required: ["DEFEATEDGUARDIAN2"],
                    events: [
                      { type: "textMessage", text: "Morto", faceHero: "npc2"},
                      ]
                    },
                  {
                  required: ["DEFEATEDGUARDIANS"],
                  events: [
                    { type: "textMessage", text: "ISHTAR: Nada de Interessante", faceHero: "npc2"},
                    { type: "addStoryFlag", flag: "DEFEATEDGUARDIAN2"},
                    { who: "npc2", type: "walk",  direction: "left" },
                    
                    ]
                  },
                  
                ]
               },
               npc3: {
                type: "Person",
                  x: utils.withGrid(8),
                  y: utils.withGrid(7),
                  src: "/image/character/npc2.png",
                  direction: "left",
                  talking: [
                    {
                      required: ["DEFEATEDGUARDIAN3"],
                      events: [
                        { type: "textMessage", text: "Morto", faceHero: "npc3"},
                        ]
                      },
                    {
                    required: ["DEFEATEDGUARDIANS"],
                    events: [
                      { type: "textMessage", text: "ISHTAR: Quanto tempo não vejo um Reaper", faceHero: "npc3"},
                      { type: "addStoryFlag", flag: "DEFEATEDGUARDIAN3"},
                      { who: "npc3", type: "walk",  direction: "right" },
                      
                      ]
                    },
                    
                  ]
                 }
      },
      walls: {
        [utils.asGridCoord(2,2)] : true,
        [utils.asGridCoord(3,1)] : true,
        [utils.asGridCoord(4,1)] : true,
        [utils.asGridCoord(5,1)] : true,
        [utils.asGridCoord(6,1)] : true,
        [utils.asGridCoord(7,1)] : true,
        [utils.asGridCoord(7,9)] : true,
        [utils.asGridCoord(8,1)] : true,
        [utils.asGridCoord(9,1)] : true,
        [utils.asGridCoord(10,1)] : true,
        [utils.asGridCoord(11,1)] : true,
        [utils.asGridCoord(2,3)] : true,
        [utils.asGridCoord(2,4)] : true,
        [utils.asGridCoord(2,5)] : true,
        [utils.asGridCoord(2,6)] : true,
        [utils.asGridCoord(2,7)] : true,
        [utils.asGridCoord(2,8)] : true,
        [utils.asGridCoord(2,8)] : true,
        [utils.asGridCoord(3,8)] : true,
        [utils.asGridCoord(4,8)] : true,
        [utils.asGridCoord(5,8)] : true,
        [utils.asGridCoord(6,8)] : true,
        [utils.asGridCoord(8,8)] : true,
        [utils.asGridCoord(9,8)] : true,
        [utils.asGridCoord(10,8)] : true,
        [utils.asGridCoord(11,8)] : true,
        [utils.asGridCoord(12,2)] : true,
        [utils.asGridCoord(12,3)] : true,
        [utils.asGridCoord(12,4)] : true,
        [utils.asGridCoord(12,5)] : true,
        [utils.asGridCoord(12,6)] : true,
        [utils.asGridCoord(12,7)] : true,
        [utils.asGridCoord(12,8)] : true,
        [utils.asGridCoord(12,9)] : true,
      },
      cutsceneSpaces: {
        [utils.asGridCoord(6,4)]: [{
          events: [
            { 
              type: "changeMap", 
              map: "Floor1",
              x: utils.withGrid(14),
              y: utils.withGrid(24), 
              direction: "up",
            }
          ]
  }],
  [utils.asGridCoord(7,8)]: [{
    events: [
      { 
        type: "changeMap", 
        map: "Forest2",
        x: utils.withGrid(24),
        y: utils.withGrid(5), 
        direction: "down",
      }
    ]
}],
      }
  },
    Floor1: {
      id: "Floor1",
      lowerSrc: "/image/maps/Floor1.png",
      configObjects: {
        hero: {
          type: "Person",
          isPlayerControlled: true,
          x: utils.withGrid(3),
          y: utils.withGrid(7),
          src: "image/character/hero.png",
        },
        npc1: {
          type: "Person",
          x: utils.withGrid(14),
          y: utils.withGrid(17),
          src: "/image/character/npc2.png",
          talking: [
            {
              required: ["DEFEATED_FLOOR1_1"],
              events: [
                { who: "npc1", type: "walk",  direction: "left" },
                { type: "textMessage", text: "Morto"},
                ]
              },
            {
            events: [
              { type: "textMessage", text: "Guarda: Intrusos? O que diabos aqueles idiotas estão fazendo lá em cima!", faceHero: "npc1"},
              { type: "battle", enemyId: "Floor1_1" },
              { type: "addStoryFlag", flag: "DEFEATED_FLOOR1_1"},
              ]
            }
          ]
          },
          npc2: {
            type: "Person",
            x: utils.withGrid(19),
            y: utils.withGrid(14),
            src: "/image/character/npc2.png",
            direction: "left",
            talking: [
              {
                required: ["DEFEATED_FLOOR1_2"],
                events: [
                  { type: "textMessage", text: "Morto"},
                  ]
                },
              {
              events: [
                { type: "textMessage", text: "Guarda: Intrusos? O que diabos aqueles idiotas estão fazendo lá em cima!", faceHero: "npc2"},
                { type: "battle", enemyId: "Floor1_2" },
                { type: "addStoryFlag", flag: "DEFEATED_FLOOR1_2"},
                ]
              }
            ]
            },
            npc3: {
              type: "Person",
              x: utils.withGrid(9),
              y: utils.withGrid(14),
              src: "/image/character/npc2.png",
              direction: "right",
              talking: [
                {
                  required: ["DEFEATED_FLOOR1_3"],
                  events: [
                    { type: "textMessage", text: "Morto"},
                    ]
                  },
                {
                events: [
                  { type: "textMessage", text: "Guarda: Intrusos? O que diabos aqueles idiotas estão fazendo lá em cima!", faceHero: "npc3"},
                  { type: "battle", enemyId: "Floor1_3" },
                  { type: "addStoryFlag", flag: "DEFEATED_FLOOR1_3"},
                  ]
                }
              ]
              },
              Felicia: {
                type: "Person",
                x: utils.withGrid(14),
                y: utils.withGrid(10),
                src: "/image/character/npc3.png",
                talking: [
                  {
                    required: ["FELICIA"],
                    events: [
                      { type: "textMessage", text: "Fim do Prologo! Obrigado por jogar Queen of Sword"},
                    ]
                  },
                  {
                    required: ["DAOS"],
                    events: [
                      { type: "textMessage", text: "Felicia: Os 4 Sinistrals Derrotados..."},
                      { type: "textMessage", text: "Felicia: O que há de se esperar de idiotas que foram selados á 1000 Anos"},
                      { type: "textMessage", text: "Felicia: Não pense que será tão facil me derrotar quanto eles, HAHAHAHA!"},
                      { type: "battle", enemyId: "Boss5" },
                      { type: "addStoryFlag", flag: "FELICIA"},
                    ]
                  },
                  {
                    required: ["ERIM"],
                    events: [
                      { type: "textMessage", text: "Felicia: DAOS acho que seus subordinados não são nada alem de fracos"},
                      { who: "Felicia", type: "walk",  direction: "up" },
                      { who: "Felicia", type: "walk",  direction: "up" },
                      { who: "Felicia", type: "walk",  direction: "down" },
                      { type: "textMessage", text: "Felicia: DAOS, O Deus do Terror"},
                      { type: "battle", enemyId: "Boss4" },
                      { type: "addStoryFlag", flag: "DAOS"},
                    ]
                  },
                  {
                    required: ["AMON"],
                    events: [
                      { type: "textMessage", text: "Felicia: URGH..."},
                      { who: "Felicia", type: "walk",  direction: "up" },
                      { who: "Felicia", type: "walk",  direction: "up" },
                      { who: "Felicia", type: "walk",  direction: "down" },
                      { type: "textMessage", text: "Felicia: ERIM, A Deusa da Morte"},

                      { type: "battle", enemyId: "Boss3" },
                      { type: "addStoryFlag", flag: "ERIM"},
                    ]
                  },
                  {
                    required: ["GADES"],
                    events: [
                      { type: "textMessage", text: "Felicia: GADES? Bom não importa ele é apenas o mais fraco dos Sinistrals"},
                      { who: "Felicia", type: "walk",  direction: "up" },
                      { who: "Felicia", type: "walk",  direction: "up" },
                      { who: "Felicia", type: "walk",  direction: "down" },
                      { type: "textMessage", text: "Felicia: Sua vez AMON, O Deus do Caos"},
                      { type: "battle", enemyId: "Boss2" },
                      { type: "addStoryFlag", flag: "AMON"},
                    ]
                  },
                  {
                    required: ["DEFEATED_FLOOR1_3","DEFEATED_FLOOR1_2","DEFEATED_FLOOR1_1"],
                    events: [
                      { type: "textMessage", text: "Felicia: Que bando de idiotas, bom não importa o ritual já está completo"},
                      { type: "textMessage", text: "Freya: Ritual??..."},
                      { type: "textMessage", text: "Celestia: Olhe atrás dela!"},
                      { type: "textMessage", text: "Aerin: Impossivel!"},
                      { type: "textMessage", text: "Ishtar: Os 4 Sinistrals!"},
                      { who: "Felicia", type: "walk",  direction: "up" },
                      { who: "Felicia", type: "walk",  direction: "up" },
                      { who: "Felicia", type: "walk",  direction: "down" },
                      { type: "textMessage", text: "Felicia: Destrua os GADES, O Deus da Destruição"},
                      { type: "battle", enemyId: "Boss1" },
                      { type: "addStoryFlag", flag: "GADES"},
                      ]
                    },
                ]
                },
      },
      walls: {
        [utils.asGridCoord(13,24)] : true,
        [utils.asGridCoord(13,23)] : true, 
        [utils.asGridCoord(13,22)] : true, 
        [utils.asGridCoord(13,21)] : true, 
        [utils.asGridCoord(13,20)] : true, 
        [utils.asGridCoord(13,19)] : true, 
        [utils.asGridCoord(13,18)] : true,  
        [utils.asGridCoord(12,18)] : true, 
        [utils.asGridCoord(11,18)] : true, 
        [utils.asGridCoord(10,18)] : true, 
        [utils.asGridCoord(9,18)] : true, 
        [utils.asGridCoord(8,18)] : true, 
        [utils.asGridCoord(7,18)] : true, 
        [utils.asGridCoord(6,18)] : true, 
        [utils.asGridCoord(5,18)] : true, 
        [utils.asGridCoord(4,18)] : true, 
        [utils.asGridCoord(3,18)] : true, 
        [utils.asGridCoord(3,17)] : true, 
        [utils.asGridCoord(3,16)] : true, 
        [utils.asGridCoord(3,15)] : true, 
        [utils.asGridCoord(3,14)] : true, 
        [utils.asGridCoord(3,13)] : true, 
        [utils.asGridCoord(3,12)] : true, 
        [utils.asGridCoord(3,11)] : true, 
        [utils.asGridCoord(4,10)] : true,
        [utils.asGridCoord(5,10)] : true,
        [utils.asGridCoord(6,10)] : true,
        [utils.asGridCoord(7,10)] : true,
        [utils.asGridCoord(8,10)] : true,
        [utils.asGridCoord(10,10)] : true,
        [utils.asGridCoord(10,9)] : true,
        [utils.asGridCoord(10,8)] : true,
        [utils.asGridCoord(10,7)] : true,
        [utils.asGridCoord(10,6)] : true,
        [utils.asGridCoord(10,5)] : true,
        [utils.asGridCoord(10,4)] : true,
        [utils.asGridCoord(10,3)] : true,
        [utils.asGridCoord(10,2)] : true,
        [utils.asGridCoord(10,1)] : true,
        [utils.asGridCoord(10,0)] : true,
        [utils.asGridCoord(11,-1)] : true,
        [utils.asGridCoord(12,-1)] : true,
        [utils.asGridCoord(13,-1)] : true,
        [utils.asGridCoord(14,-1)] : true,
        [utils.asGridCoord(15,-1)] : true,
        [utils.asGridCoord(16,-1)] : true,
        [utils.asGridCoord(17,-1)] : true,
        [utils.asGridCoord(11,10)] : true,
        [utils.asGridCoord(12,10)] : true,
        [utils.asGridCoord(13,10)] : true,
        [utils.asGridCoord(15,10)] : true,
        [utils.asGridCoord(16,10)] : true,
        [utils.asGridCoord(17,10)] : true,
        [utils.asGridCoord(18,10)] : true,
        [utils.asGridCoord(18,9)] : true,
        [utils.asGridCoord(18,8)] : true,
        [utils.asGridCoord(18,7)] : true,
        [utils.asGridCoord(18,6)] : true,
        [utils.asGridCoord(18,5)] : true,
        [utils.asGridCoord(18,4)] : true,
        [utils.asGridCoord(18,3)] : true,
        [utils.asGridCoord(18,2)] : true,
        [utils.asGridCoord(18,1)] : true,
        [utils.asGridCoord(18,0)] : true,
        [utils.asGridCoord(9,11)] : true,
        [utils.asGridCoord(9,12)] : true,
        [utils.asGridCoord(9,13)] : true,
        [utils.asGridCoord(9,15)] : true,
        [utils.asGridCoord(9,16)] : true,
        [utils.asGridCoord(9,17)] : true,
        [utils.asGridCoord(9,18)] : true,
        [utils.asGridCoord(14,25)] : true,  
        [utils.asGridCoord(15,24)] : true, 
        [utils.asGridCoord(15,23)] : true, 
        [utils.asGridCoord(15,22)] : true, 
        [utils.asGridCoord(15,21)] : true, 
        [utils.asGridCoord(15,20)] : true, 
        [utils.asGridCoord(15,19)] : true, 
        [utils.asGridCoord(15,18)] : true, 
        [utils.asGridCoord(16,18)] : true, 
        [utils.asGridCoord(17,18)] : true, 
        [utils.asGridCoord(18,18)] : true, 
        [utils.asGridCoord(19,18)] : true, 
        [utils.asGridCoord(20,18)] : true, 
        [utils.asGridCoord(21,18)] : true, 
        [utils.asGridCoord(22,18)] : true, 
        [utils.asGridCoord(23,18)] : true, 
        [utils.asGridCoord(24,18)] : true, 
        [utils.asGridCoord(19,10)] : true,
        [utils.asGridCoord(19,11)] : true,
        [utils.asGridCoord(19,12)] : true, 
        [utils.asGridCoord(19,13)] : true,
        [utils.asGridCoord(19,15)] : true,
        [utils.asGridCoord(19,16)] : true,
        [utils.asGridCoord(19,17)] : true,
        [utils.asGridCoord(19,18)] : true,
        [utils.asGridCoord(19,19)] : true,
        [utils.asGridCoord(20,10)] : true, 
        [utils.asGridCoord(21,10)] : true, 
        [utils.asGridCoord(22,10)] : true, 
        [utils.asGridCoord(23,10)] : true, 
        [utils.asGridCoord(24,10)] : true, 
        [utils.asGridCoord(25,10)] : true, 
        [utils.asGridCoord(25,11)] : true, 
        [utils.asGridCoord(25,12)] : true, 
        [utils.asGridCoord(25,13)] : true, 
        [utils.asGridCoord(25,14)] : true, 
        [utils.asGridCoord(25,15)] : true, 
        [utils.asGridCoord(25,16)] : true, 
        [utils.asGridCoord(25,17)] : true, 
        [utils.asGridCoord(25,18)] : true, 
      },
      cutsceneSpaces: {
        [utils.asGridCoord(14,24)]: [{
          events: [
            { 
              type: "changeMap", 
              map: "House",
              x: utils.withGrid(6),
              y: utils.withGrid(4), 
              direction: "up",
            }
          ]
  }],
      }
    }
}
