window.Enemies = {
    "Forest1": {
      name: "Wolffs",
      enemies: { // Mantenha a estrutura correta
        "e1": {
          id: "wolff1",
          ...window.enemies.s006,
        },
        "e2": {
          id: "wolff2",
          ...window.enemies.s006,
        },
        "e3": {
          id: "wolff3",
          ...window.enemies.s006,
        }
      }
    },
    "Forest2": {
      name: "ForestEnemies",
      enemies: {
        "e1": {
          id: "wolff1",
          ...window.enemies.s001,
        },
        "e2": {
          id: "wolff2",
          ...window.enemies.s005,
        },
        "e3": {
          id: "slime1",
          ...window.enemies.s006, // Corrigido para s002
        }
      }
    },
    "Forest3": {
        name: "Wolff",
        enemies: {
            "e1": {
                id: "wolff1",
                ...window.enemies.s006,
            }
        }
    }
  };