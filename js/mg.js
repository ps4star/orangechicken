function mgShowCanvasContainer(can) {
    can.addClass('visible')

    // Disable Quit
    $('#diag-quit').css('pointer-events', 'none')
}

function mgHideCanvasContainer(can) {
    can.removeClass('visible')

    // Enable Quit
    $('#diag-quit').css('pointer-events', 'unset')
}

const GB_GREEN = "#000000"
const GB_BLACK = "#000"

function mgInitCanvas(can) {
    let canvas, realCanvas, ctx, sw, sh, realCtx

    realCanvas = can[0]
    canvas = window.makeOffscreenCanvas(realCanvas.width, realCanvas.height)
    realCtx = realCanvas.getContext('2d', { alpha: false, powerPreference: "high-performance" })
    ctx = canvas.getContext('2d', { alpha: false, powerPreference: "high-performance" })
    sw = canvas.width
    sh = canvas.height

    return { canvas, ctx, sw, sh, realCanvas, realCtx }
}

function mgNullifyEvent(e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
}

function mgNullifyKeyEvents(candt) {
    candt.realCanvas.onkeydown = (e) => {
        mgNullifyEvent(e)
        return false
    }
    candt.realCanvas.onkeyup = candt.realCanvas.onkeydown

    candt.realCanvas.parentElement.onkeydown = (e) => {
        mgNullifyEvent(e)
        return false
    }
    candt.realCanvas.parentElement.onkeyup = candt.realCanvas.parentElement.onkeydown
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

function mgDrawBG(can, color) {
    color = color ?? GB_GREEN
    const { ctx, sw, sh } = can

    ctx.fillStyle = color
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

function mgDrawImage(can, img, x, y, rot) {
    const { ctx } = can

    const url = img.dt
    ctx.save()
    ctx.translate(x, y)
    if (rot) {
        //
    }
    ctx.drawImage(mgBooksGetImage(url), 0, 0, img.width, img.height)
    ctx.restore()
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

let mgExit = null
function mgTick() {
    tickFunc()
    if (mgExit !== false) {
        window.requestAnimationFrame(mgTick)
    }
}

// mgMookbong
const mgMookbongLayg = {
    width: 12 * 4,
    height: 10 * 4,
    yields: -1,
    dt: "assets/chicken1.png",
}

const mgMookbongWing = {
    width: 12 * 4,
    height: 9 * 4,
    yields: 5,
    dt: "assets/chicken2.png",
}

const mgMookbongImgs = [mgMookbongLayg, mgMookbongWing]
const mgMookbongPositions = [0, 1, 2, 3]

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
    }, 150)
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
            mgDrawImage(candt, mgMookbongObjects[idx][0], mgMookbongObjects[idx][1][0], mgMookbongObjects[idx][1][1], mgMookbongObjects[idx][4])
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

                // The -1 bypasses index check
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

const platePic = mgBooksGetImage("assets/plate.png")
function mgMookbongDrawPlate(candt) {
    candt.ctx.drawImage(platePic, 0, 0, candt.sw, candt.sh)
}

function mgTouch2Mouse(e)
{
  var theTouch = e.changedTouches[0];
  var mouseEv;

  switch(e.type)
  {
    case "touchstart": mouseEv="mousedown"; break;  
    case "touchend":   mouseEv="mouseup"; break;
    case "touchmove":  mouseEv="mousemove"; break;
    default: return;
  }

  var mouseEvent = document.createEvent("MouseEvent");
  mouseEvent.initMouseEvent(mouseEv, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
  theTouch.target.dispatchEvent(mouseEvent);

  e.preventDefault();
}

let mgInitialScore
async function mgMookbong() {
    await new Promise((resolve, reject) => {
        // Make text instant and disable user input (for minigame text)
        textInputMode = false
        mgShowCanvasContainer($('#mookbong-canvas-container'))

        // Set initial score
        mgInitialScore = save.money

        const $can = $('#mookbong-canvas')

        let candt = mgInitCanvas($can)
        mgNullifyKeyEvents(candt)
        mgDrawBG(candt, GB_GREEN)
        mgDrawScreenBorder(candt)

        // Handlers
        const $realCan = $(candt.realCanvas)
        $realCan.on('mousedown', function(e) {
            e.stopPropagation()
        })

        candt.realCanvas.parentElement.onmousedown = (e) => e.stopPropagation()

        $realCan.on('mousemove', function(e) {
            e.stopPropagation()
            const position = mgRealToCanvas(this, e)
            const last = mgMookbongNinjaPath[mgMookbongNinjaPath.length - 1]
            if (last) {
                mgMookbongPutNinjaPathPoint(...last)
            }
            mgMookbongPutNinjaPathPoint(position.x, position.y)
        })

        $realCan.on('touchstart', function(e) {
            $realCan.trigger(mgTouch2Mouse(e))
        })

        $realCan.on('touchmove', function(e) {
            $realCan.trigger(mgTouch2Mouse(e))
        })

        $realCan.on('touchend', function(e) {
            $realCan.trigger(mgTouch2Mouse(e))
        })

        let fc = 0,
            localFc = 0,
            mookIndex = 0

        mgSetTickFunction(() => {
            // Draws all
            mgDrawBG(candt)
            mgMookbongDrawPlate(candt)
            mgDrawScreenBorder(candt)

            const positionBound = 60
            const minVel = 1.5
            const maxVel = 2.5

            const mookDt = mgMookbongSpawnData[mookIndex]
            if (typeof mookDt === 'undefined') {
                if (save.money - mgInitialScore >= 250) {
                    unlockCollectable('achievements', ACHIEVEMENTS, 'Rich Ninja')
                }

                mgHideCanvasContainer($('#mookbong-canvas-container'))
                textInputMode = true
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

                vel[0] *= 1.25
                vel[1] *= 1.25

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

            mgDrawToReal(candt)

            if (mgExit) return false
        })
        mgTick()

        // drawMonoImage(candt, mgMookbongLayg, 40, 40)
    })
}

const MUTED_WHITE = '#eeeeee'

function mgBooksGetImage(src) {
    const img = new Image()
    img.src = src
    return img
}

const mgBooksGoodForTheBrainBooks = [
    mgBooksGetImage("assets/readerlynn/benotfar.jpg"),
    mgBooksGetImage("assets/readerlynn/falleen_toewurd.jpg"),
    mgBooksGetImage("assets/readerlynn/loneliest.jpg"),
    mgBooksGetImage("assets/readerlynn/lucid.jpg"),
    mgBooksGetImage("assets/readerlynn/ontheisland.jpg"),
    mgBooksGetImage("assets/readerlynn/species.jpg"),
    mgBooksGetImage("assets/readerlynn/tripleshotbettys.jpg"),
]

const mgBooksBadForTheBrainBooks = [
    mgBooksGetImage("assets/readerlynn/weightloss1.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss2.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss3.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss4.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss5.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss6.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss7.jpg"),
]

let mgBooksCurrent = []
let mgBooksMX, mgBooksMY, mgBooksClicked
function mgBooksPush(candt, book) {
    book._xpos = randInt(200, candt.sw - 200)
    book._ypos = randInt(-400, -300)
    book._vel = randFloat(3.0, 8.5)

    mgBooksCurrent.push(book)
}

const mgBooksBadDt =  [ "assets/sfx/books_uh.ogg", false, 0.8 ]
const mgBooksGoodDt = [ "assets/sfx/books.ogg", false, 0.8 ]

function mgBooksDrawBooks(candt) {
    $('canvas').css('cursor', 'default')

    let didClick, clickedIdx

    for (let idx = 0; idx < mgBooksCurrent.length; idx++) {
        const book = mgBooksCurrent[idx]

        book._ypos += book._vel
        candt.ctx.drawImage(book, 0, 0, book.width, book.height, book._xpos, book._ypos, 150, 300)

        if (mgIsRectOverlap(mgBooksMX, mgBooksMY, 1, 1, book._xpos, book._ypos, 128, 300)) {
            $('canvas').css('cursor', 'pointer')
            if (mgBooksClicked) {
                didClick = true
                clickedIdx = idx
            }
        } else if (book._ypos > candt.sh * 2) {
            mgBooksCurrent.splice(idx, 1)
            idx--
        }
    }

    if (didClick) {
        mgBooksClicked = false
        let book = mgBooksCurrent[clickedIdx]

        // Determine if bad or good
        let isBad = false
        mgBooksBadForTheBrainBooks.every(badBook => {
            if (badBook.src == book.src) {
                isBad = true
                return false
            }
            return true
        })

        if (isBad) {
            // bad
            doMoneyChange(-2)
            if (Math.random() > 0.8) playSong(...mgBooksBadDt)
        } else {
            // good
            doMoneyChange(4)
            if (Math.random() > 0.8) playSong(...mgBooksGoodDt)
        }

        mgBooksCurrent.splice(clickedIdx, 1)
    }
}

async function mgBooks() {
    await new Promise((resolve, reject) => {
        textInputMode = false
        mgShowCanvasContainer($('#books-canvas-container'))

        const $books = $('#books-canvas')
        let candt = mgInitCanvas($books)
        mgNullifyKeyEvents(candt)

        candt.realCanvas.onmousemove = (e) => {
            mgBooksMX = e.offsetX * (candt.sw / window.innerWidth)
            mgBooksMY = e.offsetY * (candt.sh / window.innerHeight)

            // if (window.location.href.includes("127.0.0.1")) {
            //     mgExit = true
            //     mgHideCanvasContainer($('#books-canvas-container'))
            //     textInputMode = true
            //     resolve()
            // }
        }

        candt.realCanvas.onmousedown = (e) => {
            mgBooksClicked = true
        }

        let fc = 0
        let nextBookTime = 40
        let bookSelectionArr, nextBook, stopSpawning

        mgSetTickFunction(() => {
            // Draws all
            mgDrawBG(candt, MUTED_WHITE)

            // Draw books
            // Decide next book
            if (fc >= nextBookTime && !stopSpawning) {
                nextBookTime += randInt(16, 60)
                bookSelectionArr = Math.random() < 0.6 ? mgBooksGoodForTheBrainBooks : mgBooksBadForTheBrainBooks
                nextBook = pickRandom(bookSelectionArr)

                let copy = new Image()
                copy._xpos = nextBook._xpos
                copy._ypos = nextBook._ypos
                copy._vel = nextBook._vel
                copy.src = nextBook.src

                mgBooksPush(candt, copy)
            }

            if (fc >= 2800) {
                stopSpawning = true
            }

            if (fc >= 3000) {
                mgExit = true
                mgHideCanvasContainer($('#books-canvas-container'))
                textInputMode = true
                resolve()
            }

            mgBooksDrawBooks(candt)
            mgBooksClicked = false

            // Draw to real
            mgDrawToReal(candt)
            fc++
        })
        mgTick()

        // drawMonoImage(candt, mgMookbongLayg, 40, 40)
    })
}

const mgCommentsSeqs = [
    null, // 0
    [ // 1 - mookbong comments
        `Ooops:Amberlynn: I want to lose weight. Also Amberlynn: *does mookbong of whole rotiserie chicken*`,
        `Jade Francis:"I'm trying to eat lean meats" you ate a whole ass chicken.`,
        `AmBaby:Our girl looking fabulous today ✨`,
        `Julia Hardin:Stop doing these mukbangs and lose some weight!!!`,
        `Nature Lover:I really wanna see more cooking videos, I use all your recipes!`,
        `KindaGoodKindaHootenberry:Girl you can't be serious...`,
        `ItsJustWaterWeight:Dainty gorl eats entire chicken.`,
        `Amanda Haskell:Love you Amber!! plz do more cooking vids.`,
    ],    
]

const mgCommentsTimings = []
for (let i = 0; i < 100; i++) {
    mgCommentsTimings.push(Math.floor((i * 40) + (20 * randFloat(1.01, 1.99))))
}

console.log(mgCommentsTimings)

function mgCommentsShowComment($parent, seq, id) {
    if (id > mgCommentsSeqs[seq]) {
        return null
    }
    const comdt = mgCommentsSeqs[seq][id]
    $parent.append($(`<div class="yt-comment"><pre class="username">${comdt.split(":")[0]}</pre><pre class="text">${comdt.split(":").slice(1).join(":")}</pre></div>`))
}

async function mgComments() {
    await new Promise((resolve, reject) => {
        textInputMode = false
        const $phoneCan = $('#phone-canvas-container')
        const $phoneCanNonContainer = $($phoneCan[0].children[0])
        mgShowCanvasContainer($phoneCan)

        let fc = 0
        let ccom = 0
        let isDone = false

        mgSetTickFunction(() => {
            if (isDone === true) {
                isDone = 2
                setTimeout(resolve, 250)
            } else if (isDone === 2) { return }

            if (fc === mgCommentsTimings[ccom]) {
                ccom++
                if (mgCommentsShowComment($phoneCanNonContainer, this._com_seq, ccom) === null) {
                    isDone = true
                }
            }
            fc++
        })
        mgTick()

        // drawMonoImage(candt, mgMookbongLayg, 40, 40)
    })
}

async function mgDDR() {
    await new Promise((resolve, reject) => {
        textInputMode = false
        const $can = $('#ddr-canvas-container')
        mgShowCanvasContainer($can)

        let fc = 0

        mgSetTickFunction(() => {
            fc++
        })
        mgTick()

        // drawMonoImage(candt, mgMookbongLayg, 40, 40)
    })
}