window.Enemies = {
  
  teste: {
    // 310 de EXP, 77 EXP para cada Heroi
    name: "teste",
    enemies: {
      e3: {
        id: "greenOrb1",
        ...window.enemies.s010,
        name: "Green Orb",
        hp : 1,
        xp: 20000,

      },
  },
},

  Forest1: {
    // 310 de EXP, 77 EXP para cada Heroi
    name: "Forest1",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "bat1",
        ...window.enemies.s001,
        name: "Bat [1]",
      },
      e2: {
        id: "rat1",
        ...window.enemies.s002,
        name: "Rat",
      },
      e3: {
        id: "bat2",
        ...window.enemies.s001,
        name: "Bat [2]",
      },
    },
  },
  Forest2: {
    // 395 de EXP 98 EXP para cada Heroi
    name: "Forest2",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "slime1",
        ...window.enemies.s004,
        name: "Slime ",
      },
      e2: {
        id: "earwig1",
        ...window.enemies.s003,
        name: "Earwig ",
      },
      e3: {
        id: "mushroom1",
        ...window.enemies.s005,
        name: "Mushroom",
      },
    },
  },
  Forest3: {
    name: "Forest3",
    music: "theme/Battle.mp3",
    // 410 de EXP 102 EXP para cada Heroi
    enemies: {
      e1: {
        id: "crab1",
        ...window.enemies.s006,
        name: "Crab [1]",
      },
      e2: {
        id: "crab2",
        ...window.enemies.s006,
        name: "Crab [2]",
      },
      e3: {
        id: "mushroom1",
        ...window.enemies.s005,
        name: "Mushroom",
      },
    },
  },
  Forest4: {
    // 530 de EXP 132 EXP para cada Heroi
    name: "Forest4",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "salamandra1",
        ...window.enemies.s007,
        name: "Salamandra [1]",
      },
      e2: {
        id: "crab1",
        ...window.enemies.s006,
        name: "Crab",
      },
      e3: {
        id: "salamandra2",
        ...window.enemies.s007,
        name: "Salamandra [2]",
      },
    },
  },
  Forest5: {
    // 540 de EXP 135 EXP para cada Heroi
    name: "Forest5",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "worm1",
        ...window.enemies.s008,
        name: "Worm [1]",
      },
      e2: {
        id: "worm2",
        ...window.enemies.s008,
        name: "Worm [2]",
      },
      e3: {
        id: "worm3",
        ...window.enemies.s008,
        name: "Worm [3]",
      },
    },
  },
  Forest6: {
    // 630 de EXP 157 EXP para cada Heroi
    name: "Forest6",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "anemone1",
        ...window.enemies.s009,
        name: "Anemone ",
      },
      e2: {
        id: "worm1",
        ...window.enemies.s008,
        name: "Worm ",
      },
      e3: {
        id: "slime1",
        ...window.enemies.s004,
        name: "Slime",
      },
    },
  },
  Forest7: {
    // 910 de EXP 227 EXP para cada Heroi
    name: "Forest7",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "anemone1",
        ...window.enemies.s009,
        name: "Anemone ",
      },
      e2: {
        id: "salamandra1",
        ...window.enemies.s007,
        name: "Salamandra ",
      },
      e3: {
        id: "greenOrb1",
        ...window.enemies.s010,
        name: "Green Orb",
      },
    },
  },
  Forest8: {
    // 800 de EXP 200 EXP para cada Heroi
    name: "Forest8",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "anemone1",
        ...window.enemies.s009,
        name: "Anemone [1] ",
      },
      e2: {
        id: "worm1",
        ...window.enemies.s008,
        name: "Worm ",
      },
      e3: {
        id: "anemone2",
        ...window.enemies.s009,
        name: "Anemone [2]",
      },
    },
  },
  Forest9: {
    // 1110 de EXP 277 EXP para cada Heroi
    name: "Forest9",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "greenOrb1",
        ...window.enemies.s010,
        name: "Green Orb",
      },
      e2: {
        id: "salamandra1",
        ...window.enemies.s007,
        name: "Salamandra ",
      },
      e3: {
        id: "slime1",
        ...window.enemies.s004,
        name: "Slime",
      },
    },
  },
  Forest10: {
    // 740 de EXP 185 EXP para cada Heroi
    name: "Forest10",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "anemone1",
        ...window.enemies.s009,
        name: "Anemone ",
      },
      e2: {
        id: "greenOrb1",
        ...window.enemies.s010,
        name: "Green Orb [1]",
      },
      e3: {
        id: "greenOrb2",
        ...window.enemies.s010,
        name: "Green Orb [2]",
      },
    },
  },

  Floor1: {
    // 740 de EXP 185 EXP para cada Heroi
    name: "Floor1",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "orc1",
        ...window.enemies.c001,
        name: "Orc [1]",
      },
      e2: {
        id: "skeleton1",
        ...window.enemies.c002,
        name: "Skeleton ",
      },
      e3: {
        id: "orc2",
        ...window.enemies.c001,
        name: "Orc [2]",
      },
    },
  },
  Floor2: {
    // 740 de EXP 185 EXP para cada Heroi
    name: "Floor2",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "mimic1",
        ...window.enemies.c003,
        name: "Mimic ",
      },
      e2: {
        id: "skeleton1",
        ...window.enemies.c002,
        name: "Skeleton",
      },
      e3: {
        id: "orc1",
        ...window.enemies.c001,
        name: "Orc",
      },
    },
  },
  Floor3: {
    // 740 de EXP 185 EXP para cada Heroi
    name: "Floor3",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "spider1",
        ...window.enemies.c004,
        name: "Spider ",
      },
      e2: {
        id: "mimic1",
        ...window.enemies.c003,
        name: "Mimic [1]",
      },
      e3: {
        id: "mimic2",
        ...window.enemies.c003,
        name: "Mimic [2] ",
      },
    },
  },
  Floor4: {
    // 740 de EXP 185 EXP para cada Heroi
    name: "Floor4",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "spider1",
        ...window.enemies.c004,
        name: "Spider ",
      },
      e2: {
        id: "skeleton1",
        ...window.enemies.c002,
        name: "Skeleton",
      },
      e3: {
        id: "miniDemon1",
        ...window.enemies.c005,
        name: "Mini Demon",
      },
    },
  },
  Floor5: {
    // 740 de EXP 185 EXP para cada Heroi
    name: "Floor5",
    music: "theme/Battle.mp3",
    enemies: {
      e1: {
        id: "miniDemon1",
        ...window.enemies.c005,
        name: "Mini Demon [1]",
      },
      e2: {
        id: "spider1",
        ...window.enemies.c004,
        name: "Spider ",
      },
      e3: {
        id: "miniDemon2",
        ...window.enemies.c005,
        name: "Mini Demon [2]",
      },
    },
  },

  House: {
    name: "House",
    music: "theme/bossTheme.mp3",
    musicVolume: 0.3,
    enemies: {
      m1: {
        id: "PegasusKnight",
        ...window.enemies.Mini_Boss001,
        name: "Pegasus Knight",
      },
      m2: {
        id: "Guardian",
        ...window.enemies.Mini_Boss002,
        name: "Guardian ",
      },
      m3: {
        id: "Reaper",
        ...window.enemies.Mini_Boss003,
        name: "Reaper",
      },
    },
  },
  Floor1_1: {
    name: "Floor1_1",
    music: "theme/bossTheme.mp3",
    musicVolume: 0.2,
    enemies: {
      m1: {
        id: "PegasusKnight",
        ...window.enemies.Mini_Boss001,
        name: "Pegasus Knight",
      },
      m2: {
        id: "Guardian",
        ...window.enemies.Mini_Boss002,
        name: "Guardian ",
      },
    },
  },
  Floor1_2: {
    name: "Floor1_2",
    music: "theme/bossTheme.mp3",
    musicVolume: 0.2,
    enemies: {
      m1: {
        id: "PegasusKnight",
        ...window.enemies.Mini_Boss001,
        name: "Pegasus Knight",
      },
      m2: {
        id: "Guardian",
        ...window.enemies.Mini_Boss002,
        name: "Guardian ",
      },
    },
  },
  Floor1_3: {
    name: "Floor1_3",
    music: "theme/bossTheme.mp3",
    musicVolume: 0.2,
    enemies: {
      m1: {
        id: "PegasusKnight",
        ...window.enemies.Mini_Boss001,
        name: "Pegasus Knight",
      },
      m2: {
        id: "Guardian",
        ...window.enemies.Mini_Boss002,
        name: "Guardian ",
      },
    },
  },

  Boss1: {
    name: "Gades",
    music: "theme/finalTheme.mp3",
    musicVolume: 0.4,
    enemies: {
      e1: {
        id: "Gades",
        ...window.enemies.Boss001,
      },
    },
  },
  Boss2: {
    name: "Amon",
    music: "theme/finalTheme.mp3",
    musicVolume: 0.4,
    enemies: {
      e1: {
        id: "Amon",
        ...window.enemies.Boss002,
      },
    },
  },
  Boss3: {
    name: "Erim",
    music: "theme/finalTheme.mp3",
    musicVolume: 0.4,
    enemies: {
      e1: {
        id: "Erim",
        ...window.enemies.Boss003,
      },
    },
  },
  Boss4: {
    name: "Daos",
    music: "theme/finalTheme.mp3",
    musicVolume: 0.4,
    enemies: {
      e1: {
        id: "Daos",
        ...window.enemies.Boss004,
      },
    },
  },
  Boss5: {
    name: "Felicia",
    music: "theme/feliciaTheme.mp3",
    musicVolume: 1,
    enemies: {
      b1: {
        id: "Felicia",
        ...window.enemies.Boss005,
      },
    },
  },
};
