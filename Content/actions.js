window.Actions = {
  // Status Negativos = 6 Turnos
  // Status Positivos = 7 Turnos

  // Enemies Moves
  demonSpear: {
    name: "Demon Spear",
    description: "Causa dano fisico com Machado",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 77, attackModifier: 0.85 },
    ],
  },
  axe: {
    name: "Axe",
    description: "Causa dano fisico com Machado",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 50, attackModifier: 0.9 },
    ],
  },
  powerAxe: {
    name: "Power Axe",
    description: "Causa dano fisico com Machado",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damageX: 44, attackModifier: 0.4 },
    ],
  },
  skeletonSword: {
    name: "Sword",
    description: "Causa dano fisico com Espada",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 50, attackModifier: 1.0 },
    ],
  },
  blow: {
    name: "Blow",
    description: "Causa dano fisico com a arma",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 14, attackModifier: 0.9 },
    ],
  },
  bite: {
    name: "Bite",
    description: "Mordida",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 16, attackModifier: 0.8 },
    ],
  },
  scissor: {
    name: "Scissor",
    description: "Tesoura",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 23, attackModifier: 0.85 },
    ],
  },
  poisonBite: {
    name: "Poison Bite",
    description: "Mordida Venenosa",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 40, attackModifier: 0.5 },
      {
        type: "textMessage",
        text: "Além do dano da mordida, Veneno causa 20% da vida de {TARGET}",
      },
      { type: "stateChange", healthDamage: 20 },
    ],
  },
  poisonBite2: {
    name: "Poison Bite",
    description: "Mordida Venenosa",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 60, attackModifier: 0.5 },
      {
        type: "textMessage",
        text: "Além do dano da mordida, Veneno causa 30% da vida de {TARGET}",
      },
      { type: "stateChange", healthDamage: 30 },
    ],
  },
  absorbBat: {
    name: "Absorb",
    description: "Drena hp do inimigo",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "drain" },
      {
        type: "stateChange",
        MagicDamage: 22,
        absorbPercent: 0.5,
        magicModifier: 0.9,
      },
    ],
  },
  mobSleepStatus: {
    name: "Sleep",
    description:
      "Aplica o efeito de sono em um alvo, 33% de chance de dormir ao efetuar um move",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "sleeps" },
      { type: "stateChange", status: { type: "sleep", expiresIn: 6 } },
      { type: "textMessage", text: "{TARGET} está com sono!" },
    ],
  },
  mobFire: {
    name: "Fire",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "fire" },
      { type: "stateChange", MagicDamage: 20, magicModifier: 0.9 },
    ],
  },
  mobWater: {
    name: "Water",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "water" },
      { type: "stateChange", MagicDamage: 24, magicModifier: 0.8 },
    ],
  },
  mobIce: {
    name: "Ice",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "fire" },
      { type: "stateChange", MagicDamage: 26, magicModifier: 1.1 },
    ],
  },
  mobThunder: {
    name: "Thunder",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "thunder" },
      { type: "stateChange", MagicDamageX: 18, magicModifier: 0.7 },
    ],
  },

  // Mini Bosses Moves

  // Pegasus Knight Moves

  lance: {
    name: "Lance",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 40, attackModifier: 1.0 },
    ],
  },
  chargeLance: {
    name: "Charge",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damageX: 25, attackModifier: 0.6 },
    ],
  },
  blackShield: {
    name: "Black Shield",
    description: "",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      {
        type: "stateChange",
        status: { type: "armor", expiresIn: 7, armor: 25 },
      },
    ],
  },

  // Guardian Moves

  halberd: {
    name: "Halberd",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 40, attackModifier: 1.0 },
    ],
  },
  bloodHalberd: {
    name: "Blood Halberd",
    description: "",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "stateChange", berserk: 0.1 },
      {
        type: "textMessage",
        text: "{CASTER} encanta sua Halberd com seu proprio sangue trocando 10% de sua vida por poder!",
      },
      {
        type: "stateChange",
        status: { type: "attackBoost", expiresIn: 7, attackBoost: 40 },
      },
    ],
  },

  // Reaper Moves

  scythe: {
    name: "Scythe",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 50, attackModifier: 1.0 },
    ],
  },
  soulDestruction: {
    name: "Soul Reaper",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "sleep" },
      { type: "stateChange", healthDamage: 35 },
      { type: "textMessage", text: "{CASTER} drena 35% de vida de {TARGET}" },
    ],
  },

  // Bosses Moves

  // Gades Boss Moves
  gadesSword: {
    name: "Sword",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 65, attackModifier: 1.0 },
    ],
  },
  destroy: {
    name: "Destroy",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 105, attackModifier: 1.5 },
    ],
  },

  champion: {
    name: "Champion",
    description: "",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "stateChange", recover: 220 },
      { type: "textMessage", text: "{CASTER} recupera 220 de HP" },
    ],
  },

  // Amon Boss Moves

  amonStaff: {
    name: "Staff",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 50, attackModifier: 0.8 },
    ],
  },
  amonBlast: {
    name: "Blast",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "blast" },
      { type: "stateChange", MagicDamageX: 55, magicModifier: 0.7 },
    ],
  },
  magicBlessing: {
    name: "Magic Blessing",
    description: "",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "stateChange", berserk: 0.15 },
      {
        type: "textMessage",
        text: "{CASTER} encanta seu Staff em troca de 15% da sua vida por poder",
      },
      {
        type: "stateChange",
        status: { type: "magicBoost", expiresIn: 7, magicAttackBoost: 80 },
      },
    ],
  },

  //Erim Boss Moves
  waterSpear: {
    name: "Spear",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 55, attackModifier: 1.0 },
    ],
  },
  erimFlood: {
    name: "Flood",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "flood" },
      { type: "stateChange", MagicDamageX: 60, magicModifier: 0.7 },
    ],
  },
  erimThunder: {
    name: "Thunder",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "thunder" },
      { type: "stateChange", MagicDamageX: 51, magicModifier: 0.5 },
    ],
  },
  erimFlash: {
    name: "Flash",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "flash" },
      { type: "stateChange", MagicDamage: 80, magicModifier: 1.0 },
    ],
  },
  erimWater: {
    name: "Water",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "water" },
      { type: "stateChange", MagicDamage: 56, magicModifier: 1.3 },
    ],
  },

  // Daos Boss Moves
  daosHand: {
    name: "Hand Destruction",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 80, attackModifier: 0.7 },
    ],
  },
  daosVulcan: {
    name: "Vulcan",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "vulcan" },
      { type: "stateChange", MagicDamageX: 60, magicModifier: 0.6 },
    ],
  },
  attackFullBoost: {
    name: "Hand Blessing",
    description: "Aumenta o ataque e o ataque mágico de um aliado",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      {
        type: "stateChange",
        status: {
          type: "attackFullBoost",
          expiresIn: 7,
          attackBoost: 85,
          magicAttackBoost: 90,
        },
      },
    ],
  },
  // Felicia Boss Moves
  darknessHand: {
    name: "Darkness",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "sleep" },
      { type: "stateChange", MagicDamage: 44, magicModifier: 1.2 },
      { type: "textMessage", text: "{CASTER}: Durma para mim " },
      { type: "animation", animation: "sleeps" },
      { type: "stateChange", status: { type: "sleep", expiresIn: 6 } },
      { type: "textMessage", text: "{TARGET} está com sono!" },
    ],
  },
  cyrstalRain: {
    name: "Crystal Rain",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "crystal" },
      { type: "stateChange", MagicDamageX: 55, magicModifier: 0.7 },
    ],
  },
  cyrstalFelicia: {
    name: "Darkness Crystal",
    description: "",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "crystal" },
      { type: "stateChange", healthDamage: 70 },
      {
        type: "textMessage",
        text: "{CASTER} congela 70% da vida de {TARGET} com {ACTION}!",
      },
    ],
  },

  // Hero Moves

  // Ishtar Moves

  ishtarSword: {
    name: "Sword",
    description: "Causa dano fisico com a Espada",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 10, attackModifier: 0.85 },
    ],
  },
  ishtarDualBlade: {
    name: "Dual Blade",
    mpCost: 6,
    description: "Causa dano fisico com as 2 Espadas",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 9, attackModifier: 0.5, mpCost: 3 },
      {
        type: "textMessage",
        text: "{CASTER} executa o segundo golpe de {ACTION}!",
      },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 19, attackModifier: 0.95, mpCost: 3 },
    ],
  },

  ishtarSonicBlade: {
    name: "Sonic Blade",
    description: "Causa dano fisico ignorando a defesa",
    mpCost: 19,
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "textMessage", text: "{CASTER} ultrapassa os limite da velocidade ignorando a defesa de {TARGET}" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damageBreak: 18, attackModifier: 0.45, mpCost: 19 },
    ],
  },

  ishtarFireSword: {
    name: "Fire Sword",
    description: "Causa Dano Fisico e dano Magico de fogo a um inimigo",
    mpCost: 10,
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "animation", animation: "fireSword" },
      {
        type: "stateChange",
        magic: 12,
        physical: 18,
        attackModifier: 0.8,
        magicModifier: 0.7,
        mpCost: 10,
      },
    ],
  },

  ishtarSleep: {
    name: "Sleep",
    description:
      "Aplica o efeito de sono em um alvo, 33% de chance de dormir ao efetuar um move",
    mpCost: 12,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "sleeps" },
      {
        type: "stateChange",
        status: { type: "sleep", expiresIn: 6 },
        mpCost: 12,
      },
      { type: "textMessage", text: "{TARGET} está com sono!" },
    ],
  },

  ishtarDanceofSword: {
    name: "Dance of Sword",
    mpCost: 110,
    description: "Ishtar ultrapassa os limites da luz e corta seu alvo 7 VEZES",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "textMessage", text: "{CASTER}: UN!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 10, attackModifier: 0.2, mpCost: 30 },
      { type: "textMessage", text: "{CASTER}: DEUX" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 24, attackModifier: 0.35, mpCost: 30 },
      { type: "textMessage", text: "{CASTER}: TROIS" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 31, attackModifier: 0.5, mpCost: 30 },
      { type: "textMessage", text: "{CASTER}: QUATRE" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 38, attackModifier: 0.6, mpCost: 30 },
      { type: "textMessage", text: "{CASTER}: CINQ" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 42, attackModifier: 0.8, mpCost: 15 },
      { type: "textMessage", text: "{CASTER}: SIX" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 45, attackModifier: 1.0, mpCost: 10 },
      { type: "textMessage", text: "{CASTER}: SEPT" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 50, attackModifier: 2.0, mpCost: 5 },
      { type: "textMessage", text: "{CASTER}: Ao menos tente me acompanhar" },
    ],
  },

  blessHero: {
    name: "Hero Aura",
    description:
      "Aura da Heroina que recupera seu HP, Aumenta seu Ataque e sua Defesa",
    mpCost: 40,
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "stateChange", recover: 130 },
      { type: "textMessage", text: "{CASTER} recupera 130 de HP" },
      {
        type: "stateChange",
        status: { type: "armor", expiresIn: 7, armor: 30, mpCost: 40 },
      },
      {
        type: "stateChange",
        status: { type: "attackBoost", expiresIn: 7, attackBoost: 30 },
      },
    ],
  },

  blessHero2: {
    name: "Hero Aura 2",
    description:
      "Aura da Heroina que recupera seu HP, Aumenta seu Ataque e sua Defesa drasticamente",
    mpCost: 70,
    targetType: "friendly",
    success: [
      { type: "stateChange", recover: 400 },
      { type: "textMessage", text: "{CASTER} recupera 400 de HP" },
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      {
        type: "stateChange",
        status: { type: "armor", expiresIn: 7, armor: 75, mpCost: 70 },
      },
      {
        type: "stateChange",
        status: { type: "attackBoost", expiresIn: 7, attackBoost: 75 },
      },

    ],
  },

  // Freya Moves

  freyaStaff: {
    name: "Staff",
    description: "Causa dano fisico com o Cajado",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 21, attackModifier: 0.7 },
    ],
  },

  freyaRainofBlades: {
    name: "Rain of Blades",
    description: "Freya usa sua magia de invocação, invocando varias facas em seus alvos causando dano fisico a TODOS os inimigos",
    mpCost: 17,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "arrow" },
      { type: "stateChange", damageX: 22, attackModifier: 1.3, mpCost: 17 },
    ],
  },

  freyaMeditate: {
    name: "Meditate",
    targetType: "friendly",
    description: "Freya Medita recuperando MP de acordo com seu Magic Attack",
    success: [
        { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
        { type: "animation", animation: "spin" },
        { type: "stateChange", manaRecover: 7, magicModifier: 0.05 },
        { type: "textMessage", text: "{CASTER} recuperou Mana " },
        
    ]
},

  freyaWater: {
    name: "Water",
    description: "Causa dano Magico de água a um inimigo",
    mpCost: 6,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "water" },
      { type: "stateChange", MagicDamage: 40, magicModifier: 0.77, mpCost: 6 },
    ],
  },

  freyaFire: {
    name: "Fire",
    description: "Causa dano Magico de fogo a um inimigo",
    mpCost: 7,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "fire" },
      { type: "stateChange", MagicDamage: 20, magicModifier: 0.96, mpCost: 7 },
    ],
  },
  freyaVulcan: {
    name: "Vulcan",
    description: "Causa dano Magico de fogo a TODOS os inimigos",
    mpCost: 16,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "vulcan" },
      { type: "stateChange", MagicDamageX: 14, magicModifier: 0.7, mpCost: 16 },
    ],
  },
  freyaFlood: {
    name: "Flood",
    mpCost: 14,
    description: "Causa dano Magico de Água a TODOS os inimigos",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "flood" },
      { type: "stateChange", MagicDamageX: 30, magicModifier: 0.58, mpCost: 14 },
    ],
  },

  freyaHeal: {
    name: "Heal",
    mpCost: 23,
    description: "Recupera pouca vida de todos os aliados",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", RecoverX: 50, magicModifier: 0.6, mpCost: 23 },
      {
        type: "textMessage",
        text: "Todos os membros da equipe recuperaram um pouco de vida!",
      },
    ],
  },

  freyaHeal2: {
    name: "Heal 2",
    mpCost: 50,
    description: "Recupera vida de todos os aliados",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", RecoverX: 140, magicModifier: 0.85, mpCost: 50 },
      {
        type: "textMessage",
        text: "Todos os membros da equipe recuperaram vida!",
      },
    ],
  },
  freyaMagicZone: {
    name: "Magic Zone",
    description: "Aumenta a defesa magica e o ataque mágico de Freya",
    targetType: "friendly",
    mpCost: 22,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "stateChange", status: { type: "magicBoost", expiresIn: 7, magicAttackBoost: 60,},mpCost: 11,},
      { type: "stateChange", status: { type: "magicDefenseBoost", expiresIn: 7, magicDefenseBoost: 45,},mpCost: 11,},

    ],
  },

  // Celestia Moves

  celestiaDarkStaff: {
    name: "Dark Staff",
    description:
      "Embui o Cajado com um pouco de magia de Trevas e causa Dano Fisico e Magico ao alvo",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 14, attackModifier: 0.5 },
      { type: "animation", animation: "sleep" },
      { type: "stateChange", MagicDamage: 16, magicModifier: 0.6 },
    ],
  },

  celestiaSoulBreak: {
    name: "Soul Break",
    mpCost: 11,
    description: "Causa dano magico além de causar 12% da vida atual do alvo",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", MagicDamage: 19, magicModifier: 0.65, mpCost: 11 },
      {
        type: "textMessage",
        text: "{CASTER} destroi um pedaço da alma de {TARGET} causando 12% da vida atual",
      },
      { type: "animation", animation: "sleep" },
      { type: "stateChange", healthDamage: 12 },
    ],
  },

  celestiaAbsorb: {
    name: "Absorb",
    description:
      "Causa dano Magico no inimigo e 50% do dano causado ao alvo é convertido em vida para Celestia",
    mpCost: 7,
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "drain" },
      {
        type: "stateChange",
        MagicDamage: 21,
        absorbPercent: 0.5,
        magicModifier: 0.8,
        mpCost: 7,
      },
    ],
  },
  celestiaVampirism: {
    name: "Vampirism",
    description: "Troca 10% da vida maxima por 50 de Mana",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "vampirism" },
      { type: "stateChange", VampirismHP: 10, VampirismMP: 50 },
      {
        type: "textMessage",
        text: "{CASTER} sacrificou 10% de HP por 50 de mana",
      },
    ],
  },

  celestiaIce: {
    name: "Ice",
    description: "Causa dano Magico de gelo a um inimigo",
    mpCost: 5,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "ice" },
      { type: "stateChange", MagicDamage: 22, magicModifier: 0.95, mpCost: 5 },
    ],
  },

  celestiaMagicDrain: {
    name: "Magic Drain",
    description: "Celestia rouba uma pequena quantidade de Ataque Magico do alvo para si até o FIM DA BATALHA",
    mpCost: 50,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "sleep" },
      { type: "stateChange", magicDrain: 5, magicModifier:0.05, mpCost: 50 },
      { type: "textMessage", text: "{CASTER} roubou (5 + 5%) da magia de Celestia. De {TARGET} até o fim da batalha!" },
    ],
  },

  celestiaBlizzard: {
    name: "Blizzard",
    mpCost: 13,
    description: "Causa dano Magico de gelo a TODOS os inimigos",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "blizzard" },
      {
        type: "stateChange",
        MagicDamageX: 17,
        magicModifier: 0.79,
        mpCost: 13,
      },
    ],
  },

  celestiaShield: {
    name: "Shield",
    mpCost: 25,
    description: "Aumenta a armadura de Celestia",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      {
        type: "stateChange",
        status: { type: "armor", expiresIn: 7, armor: 60, mpCost: 25 },
      },
    ],
  },

  // Aerin Moves

  aerinRapier: {
    name: "Rapier",
    description: "Causa dano fisico com a Rapieira",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 18, attackModifier: 0.7 },
    ],
  },

  aerinMagicDagger: {
    name: "Magic Dagger",
    mpCost: 4,
    description: "Causa dano magico com a Adaga Magica",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", MagicDamage: 20, magicModifier: 0.85, mpCost: 4 },
    ],
  },

  aerinInfusionBlade: {
    name: "Infusion Blade",
    mpCost: 28,
    description: "Aerin combina sua Adaga Magica e Rapieira para um ataque duplo que ignora DEFESA MAGICA e DEFESA do alvo",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "textMessage",text: "{CASTER} executa o golpe com a Rapier {ACTION}!",},
      { type: "animation", animation: "spin" },
      { type: "stateChange", damageBreak: 14, attackModifier: 0.3, mpCost: 14 },
      { type: "textMessage",text: "{CASTER} executa o golpe com a Magic Dagger",},
      { type: "animation", animation: "spin" },
      { type: "stateChange", magicDamageBreak: 19, magicModifier: 0.4, mpCost: 14 },
    ],
  },

  aerinBattleDance: {
    name: "Dance of Rapier",
    mpCost: 150,
    description:
      "Aerin dança com sua rapieira e adaga magica atacando 4 vezes com elementos diferentes, causando Dano Fisico e Magico MASSIVO",
    success: [
      { type: "textMessage", text: "{CASTER} ataca com {ACTION}!" },
      { type: "textMessage", text: "{CASTER}: Fogo!" },
      { type: "animation", animation: "spin" },
      { type: "animation", animation: "fireSword" },
      {
        type: "stateChange",
        magic: 20,
        physical: 25,
        attackModifier: 0.5,
        magicModifier: 0.6,
        mpCost: 40,
      },
      { type: "textMessage", text: "{CASTER}: Água!" },
      { type: "animation", animation: "spin" },
      { type: "animation", animation: "waterSword" },
      {
        type: "stateChange",
        magic: 32,
        physical: 31,
        attackModifier: 0.6,
        magicModifier: 0.75,
        mpCost: 40,
      },
      { type: "textMessage", text: "{CASTER}: Gelo!" },
      { type: "animation", animation: "spin" },
      { type: "animation", animation: "iceSword" },
      {
        type: "stateChange",
        magic: 40,
        physical: 42,
        attackModifier: 0.8,
        magicModifier: 0.9,
        mpCost: 40,
      },
      { type: "textMessage", text: "{CASTER}: Raio!" },
      { type: "animation", animation: "spin" },
      { type: "animation", animation: "boltSword" },
      {
        type: "stateChange",
        magic: 55,
        physical: 60,
        attackModifier: 1.0,
        magicModifier: 1.2,
        mpCost: 30,
      },
      {
        type: "textMessage",
        text: "{CASTER}: Sinta a alma dos elementos e uma linda dança!",
      },
    ],
  },
  aerinElfSecretBlessing: {
    name: "Elf Blessing",
    description: "Aumenta levemente o ataque e o ataque mágico de Aerin",
    targetType: "friendly",
    mpCost: 16,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      {
        type: "stateChange",
        status: {
          type: "attackFullBoost",
          expiresIn: 7,
          attackBoost: 25,
          magicAttackBoost: 15,
        },
        mpCost: 16,
      },
    ],
  },

  aerinElfSecretBlessing2: {
    name: "Elf Blessing 2",
    description:
      "Aumenta consideravelmente o ataque e o ataque mágico de Aerin",
    targetType: "friendly",
    mpCost: 40,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      {
        type: "stateChange",
        status: {
          type: "attackFullBoost",
          expiresIn: 7,
          attackBoost: 70,
          magicAttackBoost: 40,
        },
        mpCost: 40,
      },
    ],
  },

  aerinBolt: {
    name: "Bolt",
    description: "Causa dano Magico de raio a um inimigo",
    mpCost: 9,
    success: [
      { type: "textMessage", text: "{CASTER} usa {ACTION}!" },
      { type: "animation", animation: "bolt" },
      { type: "stateChange", MagicDamage: 28, magicModifier: 1.25, mpCost: 9 },
    ],
  },
  // Items
  Potion1: {
    name: "Potion",
    description: "Cura 50 de vida de todos da equipe",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", potionRecover: 50 },
      {
        type: "textMessage",
        text: " Todos os membros da equipe recuperaram 50 de vida!",
      },
    ],
  },
  Potion2: {
    name: "Great Potion",
    description: "Cura 200 de vida de todos da equipe",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", potionRecover: 200 },
      {
        type: "textMessage",
        text: " Todos os membros da equipe recuperaram 200 de vida!",
      },
    ],
  },
  Potion3: {
    name: "Full Potion",
    description: "Cura 500 de vida de todos da equipe",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", potionRecover: 500 },
      {
        type: "textMessage",
        text: " Todos os membros da equipe recuperaram 500 de vida!",
      },
    ],
  },
  Elixir1: {
    name: "Elixir",
    description: "Cura 50 de mana de todos da equipe",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", potionManaRecover: 50 },
      {
        type: "textMessage",
        text: " Todos os membros da equipe recuperaram 50 de mana!",
      },
    ],
  },
  Elixir2: {
    name: "Great Elixir",
    description: "Cura 150 de mana de todos da equipe",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", potionManaRecover: 150 },
      {
        type: "textMessage",
        text: " Todos os membros da equipe recuperaram 150 de mana!",
      },
    ],
  },
  Elixir3: {
    name: "Full Elixir",
    description: "Cura 350 de mana de todos da equipe",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", potionManaRecover: 350 },
      {
        type: "textMessage",
        text: " Todos os membros da equipe recuperaram 350 de mana!",
      },
    ],
  },
};
