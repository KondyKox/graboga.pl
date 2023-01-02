let tab = [
    {name: "mucha",         chances: 1.5,           rarity: "legendary",    id: 1,      photo: "../img/cards/kartaMucha.png",       level: 1,   value: 1200,    upgrade: 7000   },
    {name: "smierc",        chances: 1.5,           rarity: "cursed",       id: 2,      photo: "../img/cards/kartaSmierc.png",      level: 1,   value: -666,    upgrade: 666    },
    {name: "nierychly",     chances: 10,            rarity: "epic",         id: 3,      photo: "../img/cards/kartaNierychly.png",   level: 1,   value: 500,     upgrade: 5000   },
    //{name: "sobczak",       chances: 10,            rarity: "epic",         id: 4,     photo: "../img/cards/kartaSobczak.png",      level: 1,   value: 75,      upgrade: 1000   },
    {name: "graczyk",       chances: 10,            rarity: "epic",         id: 5,      photo: "../img/cards/kartaGraczyk.png",     level: 1,   value: 500,     upgrade: 5000   },
    {name: "korzen",        chances: 10,            rarity: "epic",         id: 6,      photo: "../img/cards/kartaKorzen.png",      level: 1,   value: 500,     upgrade: 5000   },
    {name: "libner",        chances: 25,            rarity: "rare",         id: 7,      photo: "../img/cards/kartaLibner.png",      level: 1,   value: 200,     upgrade: 3000   },
    {name: "mgr",           chances: 25,            rarity: "rare",         id: 8,      photo: "../img/cards/kartaMgr.png",         level: 1,   value: 200,     upgrade: 3000   },
    {name: "musial",        chances: 50,            rarity: "common",       id: 9,      photo: "../img/cards/kartaMusial.png",      level: 1,   value: 75,      upgrade: 1000   },
    {name: "ciborowski",    chances: 50,            rarity: "common",       id: 10,     photo: "../img/cards/kartaCiborowski.png",  level: 1,   value: 75,      upgrade: 1000   },
    {name: "pulit",         chances: 50,            rarity: "common",       id: 11,     photo: "../img/cards/kartaPulit.png",       level: 1,   value: 75,      upgrade: 1000   },
    {name: "majewska",      chances: 50,            rarity: "common",       id: 12,     photo: "../img/cards/kartaMajewska.png",    level: 1,   value: 75,      upgrade: 1000   },
    {name: "mazurek",       chances: 50,            rarity: "common",       id: 13,     photo: "../img/cards/kartaMazurek.png",     level: 1,   value: 75,      upgrade: 1000   },
    {name: "piateczka",     chances: 20,            rarity: "special",      id: 14,     photo: "../img/cards/kartaPiateczka.png",   level: 1,   value: 350,     upgrade: 4000   },
    {name: "zelencik",      chances: 20,            rarity: "special",      id: 15,     photo: "../img/cards/kartaZelencik.png",    level: 1,   value: 350,     upgrade: 4000   },
    {name: "sobczak2",      chances: 10,            rarity: "epic",         id: 16,     photo: "../img/cards/kartaSobczak2.png",    level: 1,   value: 500,     upgrade: 5000   },
    {name: "korzen2",       chances: 10,            rarity: "epic",         id: 17,     photo: "../img/cards/kartaKorzen2.png",     level: 1,   value: 500,     upgrade: 5000   },
    {name: "kamera",        chances: 20,            rarity: "special",      id: 18,     photo: "../img/cards/kartaKamera.png",      level: 1,   value: 350,     upgrade: 4000   },
    {name: "mucha2",        chances: 1.5,           rarity: "legendary",    id: 19,     photo: "../img/cards/kartaMucha2.png",      level: 1,   value: 1200,    upgrade: 7000   },
    {name: "szatnia",       chances: 30,            rarity: "place",        id: 20,     photo: "../img/cards/kartaSzatnia.png",     level: 1,   value: 150,     upgrade: 2000   },
    {name: "drukarka3d",    chances: 20,            rarity: "special",      id: 21,     photo: "../img/cards/kartaDrukarka.png",    level: 1,   value: 350,     upgrade: 4000   },
    {name: "dzwonek",       chances: 20,            rarity: "special",      id: 22,     photo: "../img/cards/kartaDzwonek.png",     level: 1,   value: 350,     upgrade: 4000   },
    {name: "sala205",       chances: 30,            rarity: "place",        id: 23,     photo: "../img/cards/kartaSala205.png",     level: 1,   value: 150,     upgrade: 2000   },
    //{name: "cheater",       chances: 0,             rarity: "cheater",      id: 24,     photo: "../img/cards/kartaOszust.png",      level: 1,   value: 0,       upgrade: 0      },
    {name: "sala305",       chances: 30,            rarity: "place",        id: 25,     photo: "../img/cards/kartaSala306.png",     level: 1,   value: 150,     upgrade: 2000   },
    {name: "muchaPraga",    chances: 20,            rarity: "special",      id: 26,     photo: "../img/cards/kartaMuchaPraga.png",  level: 1,   value: 350,     upgrade: 4000   },
    {name: "grobMuchy",     chances: 30,            rarity: "place",        id: 27,     photo: "../img/cards/kartaGrobMuchy.png",   level: 1,   value: 150,     upgrade: 2000   },
    {name: "ottoMucha",     chances: 1.5,           rarity: "legendary",    id: 28,     photo: "../img/cards/kartaOttoMucha.png",   level: 1,   value: 1200,    upgrade: 7000   },
    {name: "szybkiMucha",   chances: 1.5,           rarity: "legendary",    id: 29,     photo: "../img/cards/kartaSzybkiMucha.png", level: 1,   value: 1200,    upgrade: 7000   },
    {name: "boskiMucha",    chances: 1.5,           rarity: "legendary",    id: 30,     photo: "../img/cards/kartaBoskiMucha.png",  level: 1,   value: 1200,    upgrade: 7000   },
    {name: "wolska",        chances: 10,            rarity: "epic",         id: 31,     photo: "../img/cards/kartaWolska.png",      level: 1,   value: 500,     upgrade: 5000   },
]

// VALUE: Level 2 - razy 3, Level 3 - razy 5
// UPGRADE: Level 2 - razy 2