namespace SpriteKind {
    export const SuperFood = SpriteKind.create()
    export const Wall = SpriteKind.create()
}
function CreaPacMan () {
    pacRight = [assets.image`PacManPetitR1`, assets.image`PacManPetitR2`]
    pacLeft = [assets.image`PacManPetitL1`, assets.image`PacManPetitL2`]
    pacUp = [assets.image`PacManPetitU1`, assets.image`PacManPetitU2`]
    pacDown = [assets.image`PacManPetitD1`, assets.image`PacManPetitD2`]
    pacManActual = pacRight
    PacManSprite = sprites.create(pacManActual[contadorMov], SpriteKind.Player)
    PacManSprite.setStayInScreen(true)
    PacManSprite.z = 100
    PacManSprite.setPosition(iniPacManPos[0] * pas + pas / 2, iniPacManPos[1] * pas + pas / 2)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    pacManActual = pacDown
    PacManSprite.setImage(pacManActual[contadorMov])
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    pacManActual = pacRight
    PacManSprite.setImage(pacManActual[contadorMov])
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    pacManActual = pacLeft
    PacManSprite.setImage(pacManActual[contadorMov])
})
function moureFantasma (Fantasma: Sprite, PacMan: Sprite) {
    Fantasma.setImage(FantasmaActual[contadorMovFantasma])
    movX2 = 0
    movY2 = 0
    teletransportFantasma = false
    let posTeleEsquerraX = pas / 2
    let posTeleEsquerraY = 7 * pas + pas / 2
    let posTeleDretaX = 19 * pas + pas / 2
    let posTeleDretaY = 7 * pas + pas / 2
    let CurrentX = Fantasma.x
    let CurrentY = Fantasma.y
    diferenciaX = PacMan.x - CurrentX
    diferenciaY = PacMan.y - CurrentY
    if (modeSuperSayanBlue) {
        if (Math.abs(diferenciaX) < Math.abs(diferenciaY)) {
            if (diferenciaX > 0) {
                if ((Fantasma.x == posTeleEsquerraX) && (Fantasma.y == posTeleEsquerraY)) {
                    teletransportFantasma = true
                }
                movX2 = -1
            } else {
                if ((Fantasma.x == posTeleDretaX) && (Fantasma.y == posTeleDretaY)) {
                    teletransportFantasma = true
                }
                movX2 = 1
            }

            newLocFantasmaX = Fantasma.x + movX2 * pas
            newLocFantasmaY = Fantasma.y + movY2 * pas

            indexX = (newLocFantasmaX - 4) / pas
            indexY = (newLocFantasmaY - 4) / pas
            if (mapa[indexY][indexX] == "1") {
                movX2 = 0
                if (diferenciaY > 0) {
                    movY2 = 1
                } else {
                    movY2 = -1
                }
            }
        } else {
            if (diferenciaY > 0) {
                movY2 = -1
            } else {
                movY2 = 1
            }
            newLocFantasmaX = Fantasma.x + movX2 * pas
            newLocFantasmaY = Fantasma.y + movY2 * pas

            indexX = (newLocFantasmaX - 4) / pas
            indexY = (newLocFantasmaY - 4) / pas
            if (mapa[indexY][indexX] == "1") {
                movY2 = 0
                if (diferenciaX > 0) {
                    if ((Fantasma.x == posTeleDretaX) && (Fantasma.y == posTeleDretaY)) {
                        teletransportFantasma = true
                    }
                    movX2 = 1
                } else {
                    if ((Fantasma.x == posTeleEsquerraX) && (Fantasma.y == posTeleEsquerraY)) {
                        teletransportFantasma = true
                    }
                    movX2 = -1
                }
            }
        }
    } else {
        if (Math.abs(diferenciaX) > Math.abs(diferenciaY)) {
            if (diferenciaX > 0) {
                if ((Fantasma.x == posTeleDretaX) && (Fantasma.y == posTeleDretaY)) {
                    teletransportFantasma = true
                }
                movX2 = 1
            } else {
                if ((Fantasma.x == posTeleEsquerraX) && (Fantasma.y == posTeleEsquerraY)) {
                    teletransportFantasma = true
                }
                movX2 = -1
            }

            newLocFantasmaX = Fantasma.x + movX2 * pas
            newLocFantasmaY = Fantasma.y + movY2 * pas

            indexX = (newLocFantasmaX - 4) / pas
            indexY = (newLocFantasmaY - 4) / pas
            if (mapa[indexY][indexX] == "1") {
                movX2 = 0
                if (diferenciaY > 0) {
                    movY2 = 1
                } else {
                    movY2 = -1
                }
            }
        } else {
            if (diferenciaY > 0) {
                movY2 = 1
            } else {
                movY2 = -1
            }
            newLocFantasmaX = Fantasma.x + movX2 * pas
            newLocFantasmaY = Fantasma.y + movY2 * pas

            indexX = (newLocFantasmaX - 4) / pas
            indexY = (newLocFantasmaY - 4) / pas
            if (mapa[indexY][indexX] == "1") {
                movY2 = 0
                if (diferenciaX > 0) {
                    if ((Fantasma.x == posTeleDretaX) && (Fantasma.y == posTeleDretaY)) {
                        teletransportFantasma = true
                    }
                    movX2 = 1
                } else {
                    if ((Fantasma.x == posTeleEsquerraX) && (Fantasma.y == posTeleEsquerraY)) {
                        teletransportFantasma = true
                    }
                    movX2 = -1
                }
            }
        } 
    }

    if (teletransportFantasma) {
        if (movX == 1) {
            newLocFantasmaX = posTeleEsquerraX
            newLocFantasmaY = Fantasma.y
        } else {
            newLocFantasmaX = posTeleDretaX
            newLocFantasmaY = Fantasma.y
        }
    } else {
        newLocFantasmaX = Fantasma.x + movX2 * pas
        newLocFantasmaY = Fantasma.y + movY2 * pas
    }
    
    indexX = (newLocFantasmaX - 4) / pas
    indexY = (newLocFantasmaY - 4) / pas
    if (mapa[indexY][indexX] != "1") {
        Fantasma.x = newLocFantasmaX
        Fantasma.y = newLocFantasmaY
    }
}
function crearParet (x: number, y: number) {
    wall = sprites.create(assets.image`Paret`, SpriteKind.Wall)
    wall.setPosition(x, y)
    wall.z = 100
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (PaMan, Fantasma) {
    if (modeSuperSayanBlue) {
        Fantasma.destroy()
        info.changeScoreBy(100)
        music.smallCrash.play()
    } else {
        PaMan.destroy()
        music.siren.play()
        game.over(false)
    }
})
function mourePacMan (PacMan: Sprite) {
    PacMan.setImage(pacManActual[contadorMov])
    movX = 0
    movY = 0
    teletransport = false
    let posTeleEsquerraX = pas / 2
    let posTeleEsquerraY = 7 * pas + pas / 2
    let posTeleDretaX = 19 * pas + pas / 2
    let posTeleDretaY = 7 * pas + pas / 2
    let CurrentX = PacMan.x
    let CurrentY = PacMan.y
    debugger
    if (controller.left.isPressed() && !(controller.right.isPressed()) && !(controller.up.isPressed()) && !(controller.down.isPressed())) {
        if ((PacMan.x == posTeleEsquerraX) && (PacMan.y == posTeleEsquerraY)) {
            teletransport = true
        }
        movX = -1
    }
    if (!(controller.left.isPressed()) && controller.right.isPressed() && !(controller.up.isPressed()) && !(controller.down.isPressed())) {
        if ((PacMan.x == posTeleDretaX) && (PacMan.y == posTeleDretaY)) {
            teletransport = true
        }
        movX = 1
    }
    if (!(controller.left.isPressed()) && !(controller.right.isPressed()) && controller.up.isPressed() && !(controller.down.isPressed())) {
        movY = -1
    }
    if (!(controller.left.isPressed()) && !(controller.right.isPressed()) && !(controller.up.isPressed()) && controller.down.isPressed()) {
        movY = 1
    }
    if (teletransport){
        if (movX == 1) {
            newLocPacManX = posTeleEsquerraX
            newLocPacManY = PacMan.y
        }else{
            newLocPacManX = posTeleDretaX
            newLocPacManY = PacMan.y
        }
    }else {
        newLocPacManX = PacMan.x + movX * pas
        newLocPacManY = PacMan.y + movY * pas
    }
    
    indexX2 = (newLocPacManX - 4) / pas
    indexY2 = (newLocPacManY - 4) / pas
    if (mapa[indexY2][indexX2] != "1") {
        PacMan.x = newLocPacManX
        PacMan.y = newLocPacManY
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    pacManActual = pacUp
    PacManSprite.setImage(pacManActual[contadorMov])
})
function CreaMenjar (x: number, y: number) {
    FoodSprite = null
    FoodSprite = sprites.create(assets.image`Moneda`, SpriteKind.Food)
    FoodSprite.setPosition(x, y)
    FoodSprite.z = 10
    return FoodSprite
}
function CreaSuperMenjar (x: number, y: number) {
    SuperMenjar = null
    SuperMenjar = sprites.create(assets.image`superMoneda`, SpriteKind.SuperFood)
    SuperMenjar.setPosition(x, y)
    SuperMenjar.z = 10
    return SuperMenjar
}
function CreaMapa () {
    mapa = [
    "11111111111111111111",
    "1......1.1.1.......1",
    "1.1111.1.1.1.11111.1",
    "1X1..............1X1",
    "1.1.1.11F  111.1.1.1",
    "1...1.11   1.1.1...1",
    "111....11111.....111",
    "....11.1.1.111.1....",
    "111..............111",
    "1...1111111.1111...1",
    "1.1......P.......1.1",
    "1X11.111..11.11111X1",
    "1.11.1....1.....11.1",
    "1......11...111....1",
    "11111111111111111111"
    ]
    for (let y = 0; y <= mapa.length - 1; y++) {
        for (let x = 0; x <= mapa[y].length - 1; x++) {
            if (mapa[y][x] == "1") {
                crearParet(x * pas + pas / 2, y * pas + pas / 2)
            }
            if (mapa[y][x] == ".") {
                let Menjars: Sprite[] = []
                Menjars.push(CreaMenjar(x * pas + pas / 2, y * pas + pas / 2))
            }
            if (mapa[y][x] == "X") {
                let SuperMenjars: Sprite[] = []
                SuperMenjars.push(CreaSuperMenjar(x * pas + pas / 2, y * pas + pas / 2))
            }
            if (mapa[y][x] == "P") {
                iniPacManPos = [x, y]
            }
            if (mapa[y][x] == "F") {
                iniFantasmaPos = [x, y]
            }
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.SuperFood, function (PacMan, SuperMenjar) {
    SuperMenjar.destroy()
    FantasmaActual = FantasmaPor
    GhostSprite.setImage(FantasmaActual[contadorMovFantasma])
    tempsPoder = 50
    modeSuperSayanBlue = true
    tempsActualitzacioFantasma = 500
    music.baDing.play()
    info.changeScoreBy(50)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (PaMan, Menjar) {
    Menjar.destroy()
    music.baDing.play()
    info.changeScoreBy(10)
})
function CreaEnemig () {
    // for (let i = 0; i <= 3; i++) {
    // ghosts.push(crearFantasma(i))
    // }
    Fantasma = [assets.image`FantasmaPetit1`, assets.image`FantasmaPetit2`]
    FantasmaPor = [assets.image`FantasmaPetitPor1`, assets.image`FantasmaPetitPor2`]
    FantasmaActual = Fantasma
    GhostSprite = sprites.create(FantasmaActual[contadorMovFantasma], SpriteKind.Enemy)
    PacManSprite.setBounceOnWall(true)
    GhostSprite.setPosition(iniFantasmaPos[0] * pas + pas / 2, iniFantasmaPos[1] * pas + pas / 2)
    GhostSprite.z = 100
}
let Fantasma: Image[] = []
let teletransport = false
let tempsPoder = 0
let teletransportFantasma = false
let GhostSprite: Sprite = null
let FantasmaPor: Image[] = []
let iniFantasmaPos: number[] = []
let indexY2 = 0
let indexX2 = 0
let newLocPacManY = 0
let newLocPacManX = 0
let movY = 0
let movX = 0
let wall: Sprite = null
let mapa: string[] = []
let indexY = 0
let indexX = 0
let newLocFantasmaY = 0
let newLocFantasmaX = 0
let modeSuperSayanBlue = false
let diferenciaY = 0
let diferenciaX = 0
let movY2 = 0
let movX2 = 0
let contadorMovFantasma = 0
let FantasmaActual: Image[] = []
let iniPacManPos: number[] = []
let contadorMov = 0
let PacManSprite: Sprite = null
let pacManActual: Image[] = []
let pacDown: Image[] = []
let pacUp: Image[] = []
let pacLeft: Image[] = []
let pacRight: Image[] = []
let tempsActualitzacioFantasma = 0
let pas = 0
let menjar2 = null
let FoodSprite: Sprite = null
let SuperMenjar: Sprite = null
pas = 8
tempsActualitzacioFantasma = 300
let tempsActualitzacio = 200
CreaMapa()
CreaPacMan()
CreaEnemig()
game.onUpdate(function () {
    if (sprites.allOfKind(SpriteKind.Food).length == 0 && sprites.allOfKind(SpriteKind.SuperFood).length == 0) {
        game.over(true, effects.confetti)
    }
})
game.onUpdateInterval(tempsActualitzacio, function () {
    if (modeSuperSayanBlue) {
        tempsPoder += -1
        if (tempsPoder <= 0) {
            modeSuperSayanBlue = false
            tempsActualitzacioFantasma = 200
            FantasmaActual = Fantasma
            GhostSprite.setImage(FantasmaActual[contadorMov])
            music.powerDown.play()
        }
    }
})
game.onUpdateInterval(tempsActualitzacio, function () {
    contadorMov = (contadorMov + 1) % 2
    if (controller.anyButton.isPressed()) {
        mourePacMan(PacManSprite)
    }
})
game.onUpdateInterval(tempsActualitzacioFantasma, function () {
    contadorMovFantasma = (contadorMovFantasma + 1) % 2
    moureFantasma(GhostSprite, PacManSprite)
})
