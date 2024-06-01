window.Actions = {

    // Enemies Moves
    bite: {
        name: "Bite",
        description: "Mordida",
        success: [
            { type: "textMessage", text: "{CASTER} ataca com {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 5, attackModifier: 0.5,}
          ]
    },
    poisonBite: {
        name: "Bite",
        description: "Mordida Venenosa",
        success: [
            { type: "textMessage", text: "{CASTER} ataca com {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 5, attackModifier: 0.5,}
          ]
    },
    absorbBat: {
        name: "Absorb",
        description: "Drena hp do inimigo",
        success: [
            { type: "textMessage", text: "{CASTER} usa {ACTION}!"},
            { type: "animation", animation: "drain"},
            { type: "stateChange", MagicDamage: 5, absorbPercent: 0.5, magicModifier: 0.5 },
        ]
    },
    berserker: {
        name: "Berserker",
        description: "Causa dano fisico com a arma",
        success: [
            { type: "textMessage", text: "{CASTER} ataca com {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 40, attackModifier: 1.5, berserk: 0.1}
          ]
    },

    // Gades Boss Moves
    gadesSword: {
        name: "Sword",
        description: "",
        success: [
            { type: "textMessage", text: "{CASTER} ataca com {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 35, attackModifier: 1.0,}
          ]
    },
    destroy: {
        name: "Destroy",
        description: "",
        success: [
            { type: "textMessage", text: "{CASTER} ataca com {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 40, attackModifier: 1.3,}
          ]
    },

    champion: {
        name: "Champion",
        description: "",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} usa {ACTION}!"},
            { type: "stateChange", recover: 120},
            { type: "textMessage", text: "{CASTER} recupera 120 de HP"},

        ]
    },

    // Amon Boss Moves

    amonStaff: {
        name: "Staff",
        description: "",
        success: [
            { type: "textMessage", text: "{CASTER} ataca com {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 30, attackModifier: 0.8,}
          ]
    },

    //Erim Boss Moves
    waterSpear: {
        name: "Spear",
        description: "",
        success: [
            { type: "textMessage", text: "{CASTER} ataca com {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 40, attackModifier: 1.0,}
          ]
    },
    erimFlood: {
        name: "Flood",
        description: "",
        success: [
            { type: "textMessage", text: "{CASTER} usa {ACTION}!"},
            { type: "animation", animation: "flood"},
            { type: "stateChange", MagicDamageX: 30, magicModifier: 0.5, },
        ]
    },
    erimThunder: {
        name: "Thunder",
        description: "",
        success: [
            { type: "textMessage", text: "{CASTER} usa {ACTION}!"},
            { type: "animation", animation: "thunder"},
            { type: "stateChange", MagicDamageX: 26, magicModifier: 0.55, },
        ]
    },
    erimFlash: {
        name: "Flash",
        description: "",
        success: [
            { type: "textMessage", text: "{CASTER} usa {ACTION}!"},
            { type: "animation", animation: "flash"},
            { type: "stateChange", MagicDamage: 50, magicModifier: 1.0, },
        ]
    },
    erimWater: {
        name: "Water",
        description: "",
        success: [
            { type: "textMessage", text: "{CASTER} usa {ACTION}!"},
            { type: "animation", animation: "water"},
            { type: "stateChange", MagicDamage: 45, magicModifier: 1.05, },
        ]
    },
    

    // Hero Moves

    // Physical Moves 
    melee_attack: {
        name: "Attack",
        description: "Causa dano fisico com a arma",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 10, attackModifier: 0.75}
          ]
    },
    // Magic Moves
    absorb: {
        name: "Absorb",
        description: "Causa dano Magico no inimigo e 50% do dano causado ao alvo é convertido em vida para o Caster",
        mpCost: 5,
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "drain"},
            { type: "stateChange", MagicDamage: 30, absorbPercent: 0.5, magicModifier: 0.5, mpCost: 5},
        ]
    },
    fire: {
        name: "Fire",
        description: "Causa dano Magico de fogo a um inimigo",
        mpCost: 10,
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "fire" },
            { type: "stateChange", MagicDamage: 20, magicModifier: 0.70,mpCost: 10},
        ]
    },
    water: {
        name: "Water",
        description: "Causa dano Magico de água a um inimigo",
        mpCost: 10,
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "water" },
            { type: "stateChange", MagicDamage: 25, magicModifier: 0.65,mpCost: 10},
        ]
    },
    ice: {
        name: "Ice",
        description: "Causa dano Magico de gelo a um inimigo",
        mpCost: 10,
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "ice" },
            { type: "stateChange", MagicDamage: 18, magicModifier: 0.74,mpCost: 10},
        ]
    },
    bolt: {
        name: "Bolt",
        description: "Causa dano Magico de raio a um inimigo",
        mpCost: 10,
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "bolt" },
            { type: "stateChange", MagicDamage: 22, magicModifier: 0.68,mpCost: 10},
        ]
    },

    // Status Moves
    armorStatus: {
        name: "Armor",
        description: "Aumenta a armadura de um aliado",
        targetType: "friendly",    
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "stateChange", status: {type: "armor", expiresIn: 5}},
        ]
    },
    sleepStatus: {
        name: "Sleep",
        description: "Aplica o efeito de sono em um alvo, 33% de chance de dormir ao efetuar um move",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "sleep" },
            { type: "stateChange", status: {type: "sleep", expiresIn: 5}},
            { type: "textMessage", text: "{TARGET} está com sono!"},
        ]
    },
    // Items
    Potion1: {
        name: "Potion",
        description: "Cura 50 de vida de todos da equipe",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses a {ACTION}!"},
            { type: "stateChange", potionRecover: 50},
            { type: "textMessage", text: " Todos os membros da equipe recuperaram 50 de vida!"},
        ]
    }
}

