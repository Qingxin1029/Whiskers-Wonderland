const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64*16;
canvas.height = 64*9;

let parsedCollisions
let collisionBlocks
let background
let doors
let start=Date.now();
function reset() {
    start=Date.now();
}
let x=0, y=0, dx=0, dy=0;

const player = new Player({
    collisionBlocks,
    imageSrc: './img/character/mouse_sprite.png',
    frameRate: 8,
    animations: {
        idleRight: {
            frameRate: 8,
            frameBuffer: 7,
            loop: true,
            imageSrc: './img/character/mouse_sprite.png',
        },
        idleLeft: {
            frameRate: 8,
            frameBuffer: 7,
            loop: true,
            imageSrc: './img/character/mouse_sprite.png',
        },
        runRight: {
            frameRate: 4,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/character/ratRight.png',
        },
        runLeft: {
            frameRate: 4,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/character/ratLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/character/mouse_sprite.png',
            onComplete: () => {
                overlay.opacity
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++

                        if (level === 4) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0,
                        })

                        reset()
                    }
                })
            }
        },
    }
});

let level = 1
let levels = {
    1: {
        init: () =>{
            parsedCollisions = collisionsLevel1.parsed2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false


            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/Level 1.png"
            })

            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
        },
    },
    2: {
        init: () =>{
            parsedCollisions = collisionsLevel2.parsed2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/Level 2.png"
            })

            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
        }
    },
    3: {
        init: () =>{
            parsedCollisions = collisionsLevel3.parsed2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 770
            player.position.y = 170

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: "./img/Level 3.png"
            })

            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 338,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
        }
    }
}




const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

const overlay = {
    opacity: 0,
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.draw()
    // })

    let seconds=Math.floor((Date.now()-start)/1000);
    let minutes=Math.floor(seconds/60);
    seconds%=60;
    let ctx=cnv.getContext("2d");
    ctx.fillStyle="#8080FF";

    ctx.fill();
    ctx.stroke();
    ctx.font = "20px Agency FB";
    ctx.clearRect(925,20,80,30);
    ctx.beginPath();
    ctx.strokeText(minutes.toString().padStart(2,"0")+":"+seconds.toString().padStart(2,"0"),945,42);

    doors.forEach((door) => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()
    if (player.position.y > canvas.height) levels[level].init()


    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()


}

levels[level].init()
animate();

