namespace SpriteKind {
    export const SuperFood = SpriteKind.create()
}
function CreaPacMan () {
    PacManSprite = sprites.create(assets.image`PacMan`, SpriteKind.Player)
    animation.runImageAnimation(
    PacManSprite,
    assets.animation`myAnim`,
    200,
    true
    )
    PacManSprite.z = 100
    PacManSprite.setPosition(randint(2, 8) * 16 + 8, randint(2, 5) * 16 + 8)
}
function CreaEnemig() {
    // for (let i = 0; i <= 3; i++) {
    // ghosts.push(crearFantasma(i))
    // }
    GhostSprite = sprites.create(assets.image`Fantasma`, SpriteKind.Enemy)
    animation.runImageAnimation(
        GhostSprite,
        assets.animation`FantasmaAnim`,
        200,
        true
    )
    GhostSprite.setPosition(randint(2, 8) * 16 + 8, randint(2, 5) * 16 + 8)
    GhostSprite.z = 100
}
function CreaMenjar() {
    for (let índiceColumna = 0; índiceColumna <= 7; índiceColumna++) {
        for (let índiceFila = 0; índiceFila <= 4; índiceFila++) {
            FoodSprite = sprites.create(assets.image`Menjar`, SpriteKind.Food)
            FoodSprite.setPosition((índiceColumna + 1) * 16 + 8, (índiceFila + 1) * 16 + 8)
        }
    }
}
function CreaSuperMenjar() {
    SuperMenjar = sprites.create(assets.image`SuperMenjar`, SpriteKind.SuperFood)
    SuperMenjar.setPosition(randint(2, 8) * 16 + 8, randint(2, 5) * 16 + 8)
}
function mourePacMan(PacMan: Sprite) {
    if (controller.left.isPressed() && !(controller.right.isPressed()) && !(controller.up.isPressed()) && !(controller.down.isPressed())) {
        movX = -1
    }
    if (!(controller.left.isPressed()) && controller.right.isPressed() && !(controller.up.isPressed()) && !(controller.down.isPressed())) {
        movX = 1
    }
    if (!(controller.left.isPressed()) && !(controller.right.isPressed()) && controller.up.isPressed() && !(controller.down.isPressed())) {
        movY = -1
    }
    if (!(controller.left.isPressed()) && !(controller.right.isPressed()) && !(controller.up.isPressed()) && controller.down.isPressed()) {
        movY = 1
    }
    PacMan.x += movX * 16
    PacMan.x += movY * 16
}
function moureFantasma (Fantasma: Sprite, PacMan: Sprite) {
    diferenciaX = PacMan.x - Fantasma.x
    diferenciaY = PacMan.y - Fantasma.y
    if (Math.abs(diferenciaX) > Math.abs(diferenciaY)) {
        if (diferenciaX > 0) {
            movX2 = 1
        } else {
            movX2 = -1
        }
    } else {
        if (diferenciaY > 0) {
            movY2 = 1
        } else {
            movY2 = -1
        }
    }
    Fantasma.x += movX2 * 16
    Fantasma.x += movY2 * 16
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (PaMan, Menjar) {
    Menjar.destroy()
    music.baDing.play()
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.SuperFood, function (PaMan, SuperMenjar) {
    SuperMenjar.destroy()
    animation.runImageAnimation(
        GhostSprite,
        assets.animation`FantasmaAnimPor`,
        200,
        true
    )
    modeSuperSayanBlue = true
    tempsActualitzacioFantasma = 250
    music.baDing.play()
    info.changeScoreBy(50)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    PacManSprite,
    assets.animation`myAnim`,
    200,
    true
    )
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
        PacManSprite,
        assets.animation`myAnim`,
        200,
        true
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
        PacManSprite,
        assets.animation`myAnim`,
        200,
        true
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
        PacManSprite,
        assets.animation`myAnim`,
        200,
        true
    )
})

let tempsPoder = 0
let GhostSprite: Sprite = null
let SuperMenjar: Sprite = null
let FoodSprite: Sprite = null
let movY = 0
let movX = 0
let modeSuperSayanBlue = false
let movY2 = 0
let movX2 = 0
let diferenciaY = 0
let diferenciaX = 0
let PacManSprite: Sprite = null
let tempsActualitzacioFantasma = 0
let pucMoure = true
let pucMoureFantasma = true
let tempsActualitzacio = 200
tempsActualitzacioFantasma = 200
tiles.setCurrentTilemap(tilemap`nivel1`)
CreaPacMan()
CreaEnemig()
CreaMenjar()
CreaSuperMenjar()
game.onUpdate(function () {
    if (sprites.allOfKind(SpriteKind.Food).length == 0 && sprites.allOfKind(SpriteKind.SuperFood).length == 0) {
        game.over(true)
    }
})
game.onUpdateInterval(tempsActualitzacio, function () {
    if (modeSuperSayanBlue) {
        tempsPoder += -1
        if (tempsPoder <= 0) {
            modeSuperSayanBlue = false
            tempsActualitzacioFantasma = 200
            animation.runImageAnimation(
            GhostSprite,
            assets.animation`FantasmaAnim`,
            200,
            true
            )
            music.powerDown.play()
        }
    }
})
game.onUpdateInterval(tempsActualitzacio, function () {
    mourePacMan(PacManSprite)
})
game.onUpdateInterval(tempsActualitzacioFantasma, function () {
    moureFantasma(GhostSprite, PacManSprite)
})
