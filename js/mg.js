function showMgCanvas() {
    save?.cheevStats
    $('.canvas-container').addClass('visible')
}

function hideMgCanvas() {
    $('.canvas-container').removeClass('visible')
}

const GB_GREEN = "#8bac0f"
const GB_BLACK = "#0f380f"

function mgInitCanvas() {
    let canvas, realCanvas, ctx, sw, sh, realCtx

    realCanvas = $('.mg-canvas')[0]
    canvas = makeOffscreenCanvas(realCanvas.width, realCanvas.height)
    realCtx = realCanvas.getContext('2d', { alpha: false, powerPreference: "high-performance" })
    ctx = canvas.getContext('2d', { alpha: false, powerPreference: "high-performance" })
    sw = canvas.width
    sh = canvas.height

    return { canvas, ctx, sw, sh, realCanvas, realCtx }
}

function mgDrawToReal(candt) {
    candt.realCtx.drawImage(candt.canvas, 0, 0)
}

function mgRealToCanvas(canvas, evt) {
    const rect = canvas.getBoundingClientRect()

    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    }
}

function mgDrawBG(can) {
    const { ctx, sw, sh } = can

    ctx.fillStyle = GB_GREEN
    ctx.fillRect(0, 0, sw, sh)
}

function mgDrawScreenBorder(can) {
    const { ctx, sw, sh } = can

    ctx.fillStyle = GB_BLACK
    ctx.strokeStyle = GB_BLACK
    ctx.strokeRect(0, 0, sw, sh)
}

function mgDrawMonoImage(can, img, x, y, rot) {
    const { ctx } = can

    ctx.fillStyle = GB_BLACK
    ctx.strokeStyle = GB_BLACK

    const dt = img.dt
    dt.forEach(cmd => {
        ctx.save()
        ctx.translate(x, y)
        if (rot) {
            //ctx.rotate((rot / 360) * (2 * Math.PI))
        }
        ctx.fillRect(cmd[0], cmd[1], cmd[2] - cmd[0] + 1, cmd[3] - cmd[1] + 1)
        ctx.restore()
    })
}

async function mgDelay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

let tickFunc = () => {}
function mgSetTickFunction(cb) {
    tickFunc = cb
}

function mgTick() {
    tickFunc()
    window.requestAnimationFrame(mgTick)
}

// mgMookbong
const mgMookbongLayg = {
    width: 12,
    height: 8,
    yields: -1,
    dt: [
        [0, 2, 0, 6],
        [1, 3, 1, 5],
        [2, 3, 2, 5],
        [2, 3, 2, 5],
        [3, 3, 3, 5],
        [4, 2, 4, 5],
        [5, 1, 5, 6],
        [6, 0, 6, 7],
        [7, 0, 7, 8],
        [8, 0, 8, 8],
        [9, 0, 9, 8],
        [10, 1, 10, 7],
        [11, 2, 11, 6],
        [12, 3, 12, 5],
    ],
}

const mgMookbongWing = {
    width: 12,
    height: 7,
    yields: 5,
    dt: [
        [0, 3, 0, 4],
        [1, 3, 1, 4],
        [2, 4, 2, 5],
        [3, 4, 3, 6],
        [4, 0, 4, 6],
        [5, 0, 5, 6],
        [6, 0, 6, 4],
        [7, 1, 7, 4],
        [8, 1, 8, 5],
        [9, 2, 9, 7],
        [10, 3, 10, 7],
        [11, 3, 11, 7],
        [12, 3, 12, 7],
    ],
}

const mgMookbongImgs = [mgMookbongLayg, mgMookbongWing]
const mgMookbongPositions = [0, 1, 2, 3]
function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

let mgMookbongNinjaPath = [0]
const mgMookbongSpawnData = []

mgMookbongSpawnData.push(50)
for (let i = 0; i < 120; i++) {
    mgMookbongSpawnData.push(randFloat(5, 60 - (i / 8)))
    mgMookbongSpawnData.push([ pickRandom(mgMookbongImgs), pickRandom(mgMookbongPositions) ])
}
mgMookbongSpawnData.push(150)

let mgMookbongObjects = []

function mgMookbongPutNinjaPathPoint(x, y) {
    mgMookbongNinjaPath.push([x, y])
    const cIndex = mgMookbongNinjaPath.length - 1
    setTimeout(() => {
        mgMookbongNinjaPath[0]++
        mgMookbongNinjaPath[cIndex] = null
    }, 200)
}

function mgMookbongClearNinjaPath() {
    mgMookbongNinjaPath.splice(0, mgMookbongNinjaPath.length)
}

function mgMookbongAddObject(img, pos, vel, grav, rot, rotSpeed) {
    mgMookbongObjects.push([img, pos, vel, grav, rot, rotSpeed])
}

function mgMookbongDrawObjects(candt) {
    mgMookbongObjects = mgMookbongObjects.filter(obj => obj !== null)
    mgMookbongObjects.forEach((dt, idx) => {
        // dt[0] = img
        // dt[1] = pos
        // dt[2] = vel
        // dt[3] = grav
        // dt[4] = rot
        // dt[5] = rotSpeed

        // Apply grav to vel
        // mgMookbongObjects[idx][2][0] += mgMookbongObjects[idx][3][0]
        // mgMookbongObjects[idx][2][1] += mgMookbongObjects[idx][3][1]

        // Apply vel to pos
        mgMookbongObjects[idx][1][0] += mgMookbongObjects[idx][2][0]
        mgMookbongObjects[idx][1][1] += mgMookbongObjects[idx][2][1]

        // Update rot
        mgMookbongObjects[idx][4] += mgMookbongObjects[idx][5]

        // Out of canvas bounds
        if (mgMookbongObjects[idx][1][0] >= candt.sw + 40 || mgMookbongObjects[idx][1][0] <= -40 || mgMookbongObjects[idx][1][1] >= candt.sh + 40 || mgMookbongObjects[idx][1][1] <= -40) {
            mgMookbongObjects[idx] = null
        } else {
            // Draw
            const ctx = candt.ctx

            // ctx.save()
            // ctx.rotate((mgMookbongObjects[idx][4] / 360) * (2 * Math.PI))
            mgDrawMonoImage(candt, mgMookbongObjects[idx][0], mgMookbongObjects[idx][1][0], mgMookbongObjects[idx][1][1], mgMookbongObjects[idx][4])
            // ctx.restore()
        }
    })
}

function mgIsRectOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
}

function mgMookbongDrawNinjaPath(candt) {
    if (mgMookbongNinjaPath[0] >= mgMookbongNinjaPath.length) {
        mgMookbongNinjaPath = []
    }

    candt.ctx.fillStyle = GB_BLACK

    candt.ctx.beginPath()
    for (let i = 1 + mgMookbongNinjaPath[0]; i < mgMookbongNinjaPath.length; i += 2) {
        const from = mgMookbongNinjaPath[i]
        if (!from) {
            continue
        }
        const to = mgMookbongNinjaPath[i + 1] ?? from

        candt.ctx.lineTo(from[0], from[1])
        candt.ctx.lineTo(to[0], to[1])

        mgMookbongObjects.forEach((obj, idx) => {
            if (!obj) return
            const left = obj[1][0]
            const top = obj[1][1]
            const width = obj[0].width
            const height = obj[0].height

            let isOverlap = false

            let nx, ny, completion = 0
            nx = Math.floor(from[0])
            ny = Math.floor(from[1])

            while (true) {
                // check
                if (mgIsRectOverlap(nx, ny, 1, 1, left, top, width, height)) {
                    isOverlap = true
                    break
                }

                // lerp
                nx = nx + (to[0] - nx) * completion
                ny = ny + (to[1] - ny) * completion
                completion += 0.04

                if (completion >= 1) break
            }

            candt.ctx.lineWidth = 5
            if (isOverlap
            // if (candt.ctx.isPointInStroke(Math.floor(left + width/2), Math.floor(top + height/2)) ||
            //     candt.ctx.isPointInStroke(Math.floor(left), Math.floor(top + height/2)) ||
            //     candt.ctx.isPointInStroke(Math.floor(left), Math.floor(top)) || candt.ctx.isPointInStroke(Math.floor(left + width/2), Math.floor(top)) ||
            //     candt.ctx.isPointInStroke(Math.floor(left + width), Math.floor(top + height) ||
            //     mgIsRectOverlap(left, top, width, height, from[0], from[1], 1, 1))
                // candt.ctx.isPointInStroke(Math.floor(left), Math.floor(top + height)) ||
                // candt.ctx.isPointInStroke(left + width, top) || candt.ctx.isPointInStroke(left + width/3, top + height/3) ||
                // candt.ctx.isPointInStroke(left + width * (2/3), top + height * (2/3)) || candt.ctx.isPointInStroke(left + width/3, top + height * (2/3)) ||
                // candt.ctx.isPointInStroke(left + width * (2/3), top + height/3)) {
            ) {
                mgMookbongObjects[idx] = null
                doMoneyChange(obj[0].yields)

                if (Math.random() < 0.3) {
                    if (obj[0] === mgMookbongLayg) {
                        playSong("assets/sfx/fanofthelaygs.ogg", false, 0.8)
                    } else if (obj[0] === mgMookbongWing) {
                        playSong("assets/sfx/mmm.ogg", false, 0.8)
                    }
                }
            }
            candt.ctx.lineWidth = 1
        })
    }
    candt.ctx.stroke()
    candt.ctx.closePath()
}

let mgInitialScore
async function mgMookbong() {
    await new Promise((resolve, reject) => {
        // Make text instant and disable user input (for minigame text)
        textInputMode = false
        showMgCanvas()

        // Set initial score
        mgInitialScore = save.money

        let candt = mgInitCanvas()
        mgDrawBG(candt)
        mgDrawScreenBorder(candt)

        // Handlers
        candt.realCanvas.onmousedown = function(e) {
            e.stopPropagation()
        }

        candt.realCanvas.parentElement.onmousedown = (e) => e.stopPropagation()

        candt.realCanvas.onmousemove = function(e) {
            e.stopPropagation()
            const position = mgRealToCanvas(this, e)
            const last = mgMookbongNinjaPath[mgMookbongNinjaPath.length - 1]
            if (last)
                mgMookbongPutNinjaPathPoint(...last)
            mgMookbongPutNinjaPathPoint(position.x, position.y)
        }

        let fc = 0,
            localFc = 0,
            mookIndex = 0

        mgSetTickFunction(() => {
            // Draws all
            mgDrawBG(candt)
            mgDrawScreenBorder(candt)

            const positionBound = 60
            const minVel = 1.5
            const maxVel = 2.5

            const mookDt = mgMookbongSpawnData[mookIndex]
            if (typeof mookDt === 'undefined') {
                if (save.money - mgInitialScore >= 250) {
                    unlockCollectable('achievements', ACHIEVEMENTS, 'Rich Ninja')
                }

                hideMgCanvas()
                resolve()
            } else if (typeof mookDt === 'number') {
                if (localFc >= mookDt) {
                    mookIndex++
                    localFc = -1
                }
            } else if (Array.isArray(mookDt)) {
                // Is data
                let pos, vel, grav
                if (mookDt[1] === 0) {
                    // From top
                    pos = [randFloat(positionBound, candt.sw - positionBound), -5]
                    vel = [randFloat(-0.1, 0.1), randFloat(minVel, maxVel)]
                    grav = [0, randFloat(-1, -2)]
                } else if (mookDt[1] === 1) {
                    // From right
                    pos = [candt.sw + 5, randFloat(positionBound, candt.sh - positionBound)]
                    vel = [randFloat(-maxVel, -minVel), randFloat(-0.1, 0.1)]
                    grav = [randFloat(1, 2), 0]
                } else if (mookDt[1] === 2) {
                    // From bottom
                    pos = [randFloat(positionBound, candt.sw - positionBound), candt.sh + 5]
                    vel = [randFloat(-0.1, 0.1), randFloat(-maxVel, -minVel)]
                    grav = [0, randFloat(1, 2)]
                } else if (mookDt[1] === 3) {
                    // From left
                    pos = [-5, randFloat(positionBound, candt.sh - positionBound)]
                    vel = [randFloat(minVel, maxVel), randFloat(-0.1, 0.1)]
                    grav = [randFloat(-1, -2), 0]
                }

                vel[0] *= 0.55
                vel[1] *= 0.55

                mgMookbongAddObject(mookDt[0], pos, vel, grav, randInt(0, 359), randInt(-2, 2))
                mookIndex++
            }

            // Update object positoins
            mgMookbongDrawObjects(candt)

            // Draw path
            if (mgMookbongNinjaPath.length > 0)
                mgMookbongDrawNinjaPath(candt)

            fc++
            localFc++

            console.log(mgMookbongNinjaPath)

            mgDrawToReal(candt)
        })
        mgTick()

        // drawMonoImage(candt, mgMookbongLayg, 40, 40)
    })
}