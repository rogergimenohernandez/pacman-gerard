namespace SpriteKind {
    export const SuperFood = SpriteKind.create()
}
function CreaPacMan () {
    PacManSprite = sprites.create(assets.image`PacMan`, SpriteKind.Player)
    animation.runImageAnimation(
    PacManSprite,
    assets.animation`PacManAnimR`,
    200,
    true
    )
    PacManSprite.z = 100
    PacManSprite.setPosition(randint(1, 8) * 16 + 8, randint(1, 5) * 16 + 8)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    PacManSprite,
    assets.animation`PacManAnimD`,
    200,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    PacManSprite,
    assets.animation`PacManAnimR`,
    200,
    true
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    PacManSprite,
    assets.animation`PacManAnimL`,
    200,
    true
    )
})
function moureFantasma (Fantasma: Sprite, PacMan: Sprite) {
    movX2 = 0
    movY2 = 0
    diferenciaX = PacMan.x - Fantasma.x
    diferenciaY = PacMan.y - Fantasma.y
    if (modeSuperSayanBlue) {
        if (Math.abs(diferenciaX) < Math.abs(diferenciaY)) {
            if (diferenciaX > 0) {
                movX2 = -1
            } else {
                movX2 = 1
            }
        } else {
            if (diferenciaY > 0) {
                movY2 = -1
            } else {
                movY2 = 1
            }
        }
    } else {
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
    }
    novaPosicioFantasmaX = Fantasma.x + movX2 * 16
    novaPosicioFantasmaY = Fantasma.y + movY2 * 16
    if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(novaPosicioFantasmaX / 16, novaPosicioFantasmaY / 16)))) {
        Fantasma.x = novaPosicioFantasmaX
        Fantasma.y = novaPosicioFantasmaY
    } else {
        Fantasma.x = Fantasma.x
        Fantasma.y = Fantasma.y
    }
}
function mourePacMan (PacMan: Sprite) {
    movX = 0
    movY = 0
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
    novaPosicioPacManX = PacMan.x + movX * 16
    novaPosicioPacManY = PacMan.y + movY * 16
    if (!(tiles.tileAtLocationIsWall(tiles.getTileLocation(novaPosicioPacManX / 16, novaPosicioPacManY / 16)))) {
        PacMan.x = novaPosicioPacManX
        PacMan.y = novaPosicioPacManY
    } else {
        PacMan.x = PacMan.x
        PacMan.y = PacMan.y
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    PacManSprite,
    assets.animation`PacManAnimU`,
    200,
    true
    )
})
function CreaMenjar () {
    for (let índiceColumna = 0; índiceColumna <= 7; índiceColumna++) {
        for (let índiceFila = 0; índiceFila <= 4; índiceFila++) {
            FoodSprite = sprites.create(assets.image`Menjar`, SpriteKind.Food)
            FoodSprite.setPosition((índiceColumna + 1) * 16 + 8, (índiceFila + 1) * 16 + 8)
        }
    }
}
function CreaSuperMenjar () {
    SuperMenjar = sprites.create(assets.image`SuperMenjar`, SpriteKind.SuperFood)
    SuperMenjar.setPosition(randint(1, 8) * 16 + 8, randint(1, 5) * 16 + 8)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (PacMan, Menjar) {
    Menjar.destroy()
    music.baDing.play()
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.SuperFood, function (PacMan, SuperMenjar) {
    SuperMenjar.destroy(effects.spray, 500)
    animation.runImageAnimation(
    GhostSprite,
    assets.animation`FantasmaAnimPor`,
    200,
    true
    )
    tempsPoder = 50
    modeSuperSayanBlue = true
    tempsActualitzacioFantasma = 500
    music.baDing.play()
    info.changeScoreBy(50)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (PacMan, Fantasma) {
    if (modeSuperSayanBlue) {
        Fantasma.destroy()
        info.changeScoreBy(100)
        music.smallCrash.play()
    } else {
        PacMan.destroy()
        music.siren.play()
        game.over(false)
    }
})
function CreaEnemig () {
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
    GhostSprite.z = 100
    GhostSprite.setPosition(randint(1, 8) * 16 + 8, randint(1, 5) * 16 + 8)
}
let GhostSprite: Sprite = null
let SuperMenjar: Sprite = null
let FoodSprite: Sprite = null
let novaPosicioPacManY = 0
let novaPosicioPacManX = 0
let movY = 0
let movX = 0
let novaPosicioFantasmaY = 0
let novaPosicioFantasmaX = 0
let diferenciaY = 0
let diferenciaX = 0
let movY2 = 0
let movX2 = 0
let PacManSprite: Sprite = null
let tempsPoder = 0
let tempsActualitzacioFantasma = 0
let modeSuperSayanBlue = false
modeSuperSayanBlue = false
tempsActualitzacioFantasma = 300
let tempsActualitzacio = 200
tempsPoder = 0
tiles.setCurrentTilemap(tilemap`nivel1`)
CreaPacMan()
CreaEnemig()
CreaMenjar()
CreaSuperMenjar()
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
            tempsActualitzacioFantasma = 300
            animation.runImageAnimation(
            GhostSprite,
            assets.animation`FantasmaAnim`,
            200,
            true
            )
            music.powerDown.play()
        }
    }
    mourePacMan(PacManSprite)
})
game.onUpdateInterval(tempsActualitzacioFantasma, function () {
    moureFantasma(GhostSprite, PacManSprite)
})
