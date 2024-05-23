window.Actions = {
    melee_attack: {
        name: "Attack",
        description: "Ataque normal",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "spin"},
            { type: "stateChange", damage: 10}
          ]
    },
    armorStatus: {
        name: "Armor",
        description: "Aumenta a armadura de um aliado",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "stateChange", status: {type: "armor", expiresIn: 4}}
        ]
    },
    sleepStatus: {
        name: "Sleep",
        description: "Aplica o efeito sleep em um alvo",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "animation", animation: "createOrb" },
            { type: "stateChange", status: {type: "sleep", expiresIn: 4}},
            { type: "textMessage", text: "{TARGET} está com sono!"},
        ]
    },
    burnStatus: {
        name: "Burn",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
            { type: "stateChange", status: {type: "burn", expiresIn: 4}}
        ]
    },
    // Items
    Potion1: {
        name: "Potion",
        description: "Cura 50 de vida",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses a {ACTION}!"},
            { type: "stateChange", recover: 50},
            { type: "textMessage", text: "{CASTER} recuperou 50 de vida!"},
        ]
    }
}

