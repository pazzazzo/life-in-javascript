const ctx = document.getElementsByTagName("canvas")[0].getContext("2d")
let particles = []

let physic = {  //Physics rules
    "gravity": 1,
    "particle": {
        "min_distance": 5,
        "max_detect": 80
    }
}

function draw(x, y, c, s, ss) {
    ctx.fillStyle = c
    if (ss) {
        ctx.fillRect(x, y, s, s)
    } else {
        ctx.beginPath();
        ctx.arc(x, y, s, 0, 2 * Math.PI, false)
        ctx.fill()
    }
}

function particle(x, y, c) {
    return { x, y, "vx": 0, "vy": 0, "color": c, "active": false }
}

function random() {
    return Math.random() * 400 + 50
}

function create(number, color) {
    let group = []
    for (let i = 0; i < number; i++) {
        group.push(particle(random(), random(), color))
        particles.push(group[i])
    }
    return group
}

function rule(part1, part2, g) {
    for (let i = 0; i < part1.length; i++) {
        let fx = 0
        let fy = 0

        for (let j = 0; j < part2.length; j++) {
            var a = part1[i]
            var b = part2[j]
            let dx = a.x - b.x
            let dy = a.y - b.y
            let d = Math.sqrt(dx * dx + dy * dy)
            if (d > 0 && d < physic.particle.max_detect) {
                let F = -g * physic.gravity / d
                fx += (F * dx)
                fy += (F * dy)
            }
            if (d < physic.particle.min_distance && a != b && part1 === part2) {
                let F = 3 * physic.gravity / d
                fx += (F * dx)
                fy += (F * dy)
            }
        }
        a.vx = (a.vx + fx) * 0.5
        a.vy = (a.vy + fy) * 0.5
        a.x += a.vx
        a.y += a.vy
        if (a.x <= 0 || a.x >= 500 - 5) {
            a.vx *= -5
        }
        if (a.y <= 0 || a.y >= 500 - 5) {
            a.vy *= -5
        }
    }
}

let yellow = create(200, "yellow")
let red = create(300, "red")
let green = create(300, "green")

/**
 * [x, y, z]
 * if z > 0: x love y
 * if z < 0: x hate y
 */
let rules = [   //Rule x'y-z (x(green) and y(yellow) hate z(red))
    [green, green, -0.01],
    [yellow, yellow, -0.01],
    [red, red, 0.05],
    [red, yellow, 0.05],
    [yellow, red, -0.05],
    [yellow, green, 0.05],
    [green, yellow, -0.05],
    [green, red, -0.05]
]
function update() {
    rules.forEach(r => {
        rule(...r)
    })
    ctx.clearRect(0, 0, 500, 500)
    draw(0, 0, "black", 500, true)
    for (let i = 0; i < particles.length; i++) {
        if (particles[i].active) {
            draw(particles[i].x, particles[i].y, "white", 7)
        }
        draw(particles[i].x, particles[i].y, particles[i].color, 5)
    }
    requestAnimationFrame(update)
}

update()


ctx.canvas.addEventListener("click", (ME) => {
    let rct = ctx.canvas.getBoundingClientRect()
    let y = ME.clientY - rct.top
    let x = ME.clientX - rct.left
    if (x >= 0 && x <= ctx.canvas.width && y >= 0 && y <= ctx.canvas.height) {
        let found = false
        for (let i = 0; i < particles.length && !found; i++) {
            if (x >= particles[i].x - 5 && x <= particles[i].x + 5 && y >= particles[i].y - 5 && y <= particles[i].y + 5) {
                console.log(particles[i].color);
                for (let i = 0; i < particles.length && !found; i++) {
                    particles[i].active = false
                }
                particles[i].active = true
                found = true
            }
        }
    }
})