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
function moureFantasma (Fantasma: Sprite, PacMan: Sprite) {
    pucMoureFantasma = false
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
    Fantasma.y += movY2 * 16
    pause(tempsActualitzacioFantasma)
    pucMoureFantasma = true
}
function mourePacMan (PacMan: Sprite) {
    pucMoure = false
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
    PacMan.y += movY * 16

    pause(tempsActualitzacio)
    
    pucMoure = true
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    PacManSprite,
    assets.animation`myAnim`,
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
    SuperMenjar = sprites.create(assets.image`SuperMenjar`, SpriteKind.Food)
    SuperMenjar.setPosition(randint(2, 8) * 16 + 8, randint(2, 5) * 16 + 8)
}
function CreaEnemig () {
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
let GhostSprite: Sprite = null
let SuperMenjar: Sprite = null
let FoodSprite: Sprite = null
let movY = 0
let movX = 0
let movY2 = 0
let movX2 = 0
let diferenciaY = 0
let diferenciaX = 0
let PacManSprite: Sprite = null
let tempsActualitzacioFantasma = 0
let tempsActualitzacio = 0
let pucMoureFantasma = false
let pucMoure = false
pucMoure = true
pucMoureFantasma = true
tempsActualitzacio = 200
tempsActualitzacioFantasma = 200
tiles.setCurrentTilemap(tilemap`nivel1`)
CreaPacMan()
CreaEnemig()
CreaMenjar()
CreaSuperMenjar()
// scene.cameraFollowSprite(PacManSprite)
game.onUpdate(function () {
    // controller.moveSprite(PacManSprite, -100, -100)
    if (pucMoure = true) {
        mourePacMan(PacManSprite)
    }
    if (pucMoureFantasma = true) {
        moureFantasma(GhostSprite, PacManSprite)
    }
})
