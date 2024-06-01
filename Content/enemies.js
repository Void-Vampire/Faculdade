window.Enemies = {
    "Forest1": {
      name: "Forest1",
      enemies: { 
        "e1": {
          id: "bat1",
          ...window.enemies.s001,
          name: "Bat [1]"
        },
        "e2": {
          id: "rat1",
          ...window.enemies.s002,
          name: "Rat"
        },
        "e3": {
          id: "bat2",
          ...window.enemies.s001,
          name: "Bat [2]"
        }
      }
    },
    "Forest2": {
      name: "Forest2",
      enemies: {
        "e1": {
          id: "slime1",
          ...window.enemies.s004,
          name: "Slime [1]",
        },
        "e2": {
          id: "slime2",
          ...window.enemies.s004,
          name: "Slime [2]",
        },
        "e3": {
          id: "mushroom1",
          ...window.enemies.s005, 
          name: "Mushroom",
        }
      }
    },
    "Forest3": {
        name: "Forest3",
        enemies: {
            "e1": {
                id: "crab1",
                ...window.enemies.s006,
                name: "Crab [1]",
            },
            "e2": {
              id: "crab2",
              ...window.enemies.s006,
              name: "Crab [2]",
            },
            "e3": {
              id: "mushroom1",
              ...window.enemies.s005, 
              name: "Mushroom",
            }
        }
    },
    "Forest4": {
      name: "Forest4",
      enemies: {
          "e1": {
              id: "salamandra1",
              ...window.enemies.s007,
              name: "Salamandra [1]",
          },
          "e2": {
            id: "crab1",
            ...window.enemies.s006,
            name: "Crab",
          },
          "e3": {
            id: "salamandra2",
            ...window.enemies.s007, 
            name: "Salamandra [2]",
          }
      }
  },
  "Forest5": {
    name: "Forest5",
    enemies: {
        "e1": {
            id: "worm1",
            ...window.enemies.s008,
            name: "Worm [1]",
        },
        "e2": {
          id: "worm2",
          ...window.enemies.s008,
          name: "Worm [2]",
        },
        "e3": {
          id: "worm3",
          ...window.enemies.s008, 
          name: "Worm [3]",
        }
    }
},
"Forest6": {
  name: "Forest6",
  enemies: {
      "e1": {
          id: "anemone1",
          ...window.enemies.s009,
          name: "Anemone ",
      },
      "e2": {
        id: "worm1",
        ...window.enemies.s008,
        name: "Worm ",
      },
      "e3": {
        id: "slime1",
        ...window.enemies.s004, 
        name: "Slime",
      }
  }
},

"House": {
  name: "House",
  enemies: {
      "m1": {
          id: "PegasusKnight",
          ...window.enemies.Mini_Boss001,
          name: "Pegasus Knight",
      },
      "m2": {
        id: "Guardian",
        ...window.enemies.Mini_Boss002,
        name: "Guardian ",
      },
      "m3": {
        id: "Reaper",
        ...window.enemies.Mini_Boss003,
        name: "Reaper",
      },
  }
},
"Floor1_1": {
  name: "Floor1_1",
  enemies: {
      "m1": {
          id: "PegasusKnight",
          ...window.enemies.Mini_Boss001,
          name: "Pegasus Knight",
      },
      "m2": {
        id: "Guardian",
        ...window.enemies.Mini_Boss002,
        name: "Guardian ",
      },
  }
},
"Floor1_2": {
  name: "Floor1_2",
  enemies: {
      "m1": {
          id: "PegasusKnight",
          ...window.enemies.Mini_Boss001,
          name: "Pegasus Knight",
      },
      "m2": {
        id: "Guardian",
        ...window.enemies.Mini_Boss002,
        name: "Guardian ",
      },
  }
},
"Floor1_3": {
  name: "Floor1_3",
  enemies: {
      "m1": {
          id: "PegasusKnight",
          ...window.enemies.Mini_Boss001,
          name: "Pegasus Knight",
      },
      "m2": {
        id: "Guardian",
        ...window.enemies.Mini_Boss002,
        name: "Guardian ",
      },
  }
},

    "Boss1": {
      name: "Gades",
      enemies: {
        "e1": {
          id: 'Gades',
          ...window.enemies.Boss001
        }
      }
    },
    "Boss2": {
      name: "Amon",
      enemies: {
        "e1": {
          id: 'Amon',
          ...window.enemies.Boss002
        }
      }
    },
    "Boss3": {
      name: "Erim",
      enemies: {
        "e1": {
          id: 'Erim',
          ...window.enemies.Boss003
        }
      }
    },
    "Boss4": {
      name: "Daos",
      enemies: {
        "e1": {
          id: 'Daos',
          ...window.enemies.Boss004
        }
      }
    },
    "Boss5": {
      name: "Felicia",
      enemies: {
        "b1": {
          id: 'Felicia',
          ...window.enemies.Boss005
        }
      }
    },
  };