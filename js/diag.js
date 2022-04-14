function fillArr(item, num) {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(item)
    }
    return arr
}

// Very small intentional lag to prevent too many inputs fucking everything up
const inputDelayTime = 25

// This doesn't really matter as long as it's sufficiently large
const NUM_USEFLAGS = 250
const DEFAULT_SAVE = {
    chapter: 1,
    // Chapter 1 always unlocked at start
    chapters: [true, ...fillArr(false, NUM_CHAPTERS - 1)],
    diag: "shortage",
    lynns: fillArr(false, window["NUM_LYNNS"] || 300), // closure pitches a fit about NUM_LYNNS not being defined otherwise...
    achievements: fillArr(false, NUM_ACHIEVEMENTS),

    inventory: [],

    beckyAffection: 20,
    wifeyAffection: 20,

    savedVars: {},

    affectionUseFlags: fillArr(false, NUM_USEFLAGS),
    moneyUseFlags: fillArr(false, NUM_USEFLAGS),
    invUseFlags: fillArr(false, NUM_USEFLAGS),

    visitCounts: fillArr(0, NUM_CHAPTERS),

    textSpeed: 10,
    volume: 50,

    money: 0,
    hasSaveensJar: false,
}

let save = DEFAULT_SAVE

const LS_KEY = "alrsavedata"

function writeSave() {
    localStorage[LS_KEY] = JSON.stringify(save)
}

if (!localStorage[LS_KEY]) {
    writeSave()
} else {
    try {
        save = JSON.parse(localStorage[LS_KEY])
    } catch(e) {
        writeSave()
    }
}

function clearStage() {
    $('#actors').empty()
}

// [name, position, (pose) ?? "normal"]
let currentStage = []

async function putStage(actorsList) {
    let hflip = false
    let position = "left_back"

    const actorsDiv = document.getElementById('actors')

    for (const actorItem of actorsList) {
        for (let i = 0; i < actorItem.length; i++) {
            // Is last; is char
            if (i === actorItem.length - 1) {
                currentStage.push([actorItem[i], position])

                let finalClasses = []
                if (hflip) {
                    finalClasses.push("hflip")
                }

                if (position === 'left_back' || position === 'left_front') {
                    finalClasses.push("float-left")
                } else if (position === 'right_front' || position === 'right_back') {
                    finalClasses.push("float-right")
                }

                const actorImg = document.createElement('img')
                actorImg.src = ACTORS[actorItem[i]]
                actorImg.classList.add('actor-img', 'animated')

                const actorEl = document.createElement('div')
                actorEl.classList.add('actor', ...finalClasses)
                actorEl.appendChild(actorImg)

                await new Promise((resolve, reject) => {
                    if (actorImg.complete) resolve()
                    else actorImg.onload = resolve
                })

                $(actorImg).hide()
                actorsDiv.appendChild(actorEl)
            } else {
                if (actorItem[i] === 'hflip') {
                    hflip = true
                } else {
                    position = actorItem[i]
                }
            }
        }
        position = "left_back"
        hflip = false
    }

    return Promise.resolve()
}

async function putBackgroundImage(imgUrl) {
    const diagScene = document.getElementById('dialog-scene')
    if (diagScene.style.backgroundImage === `url("${imgUrl}")`) {
        return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
        const bgImage = new Image()
        bgImage.src = imgUrl
        bgImage.onload = resolve
        if (bgImage.complete) resolve()
        diagScene.style.backgroundImage = `url("${bgImage.src}")`
    })
}


function getCustomPoseURL(character, pose) {
    // Get base URL; return base URL if normal pose; otherwise chop up URL and insert extension for pose
    const basename = ACTORS[character]
    if (pose === 'normal' || !pose) {
        return basename
    }

    let ext = basename.split('.'); ext = ext[ext.length - 1]
    const withoutExt = basename.split('.').slice(0, -1)
    return `${withoutExt}_${pose}.${ext}`
}

async function updateActorPose(stageIndex, newPose, reanimate) {
    // Check if exited
    if (!currentStage[stageIndex]) return Promise.resolve()

    if (currentStage[stageIndex].length < 3) {
        currentStage[stageIndex].push(newPose)
    } else if (currentStage[stageIndex][2] === newPose) {
        // Do nothing
        return Promise.resolve()
    }

    // Now we know it's a new pose that should reanimate
    const actorImg = document.getElementsByClassName('actor-img')[stageIndex]
    const $actorImg = $(actorImg)
    if (!actorImg) return Promise.resolve()
    $actorImg.hide()
    actorImg.src = getCustomPoseURL(currentStage[stageIndex][0], newPose)

    // Update stage
    currentStage[stageIndex][2] = newPose

    if (reanimate) {
        actorImg.classList.remove('animated')

        $actorImg.show()
        actorImg.classList.add('animated')
    } else {
        $actorImg.show()
    }

    return new Promise((resolve, reject) => {
        actorImg.addEventListener('load', resolve)
    })
}

const $window = $(window)

let textScrollInt
let textInputMode = true

const TEXT_SPEED_INTERVAL = 5

async function putTextBox(speakerIndex, text) {
    const diag = document.getElementById('diag-text')
    const diagName = document.getElementById('diag-name')

    if (!diag) {
        $window.off('mousedown')
        $window.off('keydown')
        return Promise.resolve()
    }

    diag.innerHTML = ""
    diag.classList.remove('full')

    let speakerName
    if (Number.isNaN(speakerIndex)) {
        speakerName = "---"
    } else {
        if (typeof currentStage[speakerIndex] === 'undefined') return Promise.resolve()
        speakerName = currentStage[speakerIndex][0]
    }

    diagName.innerText = speakerName
    await new Promise((resolve, reject) => {
        if (typeof textScrollInt !== 'undefined') clearInterval(textScrollInt)

        let revealIndex = 0
        textScrollInt = setInterval(() => {
            if (diag.innerText.length >= text.length) {
                clearInterval(textScrollInt)
            } else {
                diag.innerText += text.charAt(revealIndex++)
                if (diag.innerText.length >= text.length) {
                    diag.classList.add('full')
                    diag.innerHTML += `<span></span>`
                }
            }
        }, TEXT_SPEED_INTERVAL)

        function handleAdvanceClick(e) {
            if (!textInputMode) return false
            // Commented out bc prevents F12/devmenu during dialog
            //e.preventDefault()

            if (e.key) {
                if (!(e.key === 'Enter' || e.key === ' ')) {
                    return
                }
            }

            // Advance all text
            if (textScrollInt) clearInterval(textScrollInt)
            if (diag.innerText.length < text.length) {
                diag.innerText = text
                diag.classList.add('full')
                diag.innerHTML += `<span></span>`
            } else {
                // Already has finished text; remove listener and resolve
                $window.off('mousedown')
                $window.off('keydown')
                resolve()
            }
        }

        $window.off('keydown')
        $window.off('mousedown')
        $window.on('mousedown keydown', handleAdvanceClick)
    })
}

let newScene, lastChoice, lastChapter
async function showMulti(options) {
    return new Promise((resolve, reject) => {
        let selected = 0, lastSelected = 0, isMouseOn = false

        const mbox = document.getElementById('multi-box')
        const $mbox = $(mbox)

        mbox.classList.remove('reverse-anim')
        mbox.classList.add('begin')

        let animationDone = false
        mbox.style.pointerEvents = 'none'
        mbox.onanimationend = () => {
            mbox.style.pointerEvents = 'all'
            updateSel()
            animationDone = true
            mbox.onanimationend = null
        }

        for (let i = 0; i < options.length; i += 2) {
            // Text
            const coption = document.createElement('pre')
            coption.tabindex = -1
            coption.innerHTML = options[i]

            const $coption = $(coption)

            $coption.on('mouseenter', function(e) {
                if (!animationDone) return
                $mbox.children().removeClass('selected')
                lastSelected = coption.index / 2
                selected = null
                isMouseOn = true
            })

            $coption.on('mousedown', function(e) {
                if (!animationDone) return
                $mbox.hide()
                mbox.classList.remove('begin')
                $mbox.show()
                mbox.classList.add('reverse-anim')

                mbox.onanimationend = () => {
                    $mbox.empty()
                    mbox.classList.remove('reverse-anim')
                    mbox.onanimationend = null
                    lastChoice = coption.index / 2
                    resolve()
                }

                newScene = coption.scene
            })

            $coption.on('mouseleave', function(e) {
                if (!animationDone) return
                selected = lastSelected
                isMouseOn = false
                updateSel()
            })

            coption.scene = options[i + 1]
            coption.index = i
            mbox.appendChild(coption)
        }

        function updateSel() {
            $mbox.children().removeClass('selected')
            mbox.children[selected].classList.add('selected')
        }

        updateSel()

        function handleKeyDown(e) {
            if (!animationDone) return
            if (isMouseOn) return

            if (e.key) {
                const key = e.key.toLowerCase()
                if (key.includes('arrow')) {
                    if (key === 'arrowup' && selected > 0) selected--
                    else if (key === 'arrowdown' && selected < mbox.children.length - 1) selected++

                    updateSel()
                } else if (key.includes('enter')) {
                    // Confirm
                    $($mbox.children()[selected]).trigger('mousedown')
                    $window.off('keydown')
                }
            }
        }

        $(window).on('keydown', handleKeyDown)
    })
}

function derefInheritance(dt) {
    if (dt.inherits) {
        const inherited = ALL_DIAGS[dt.inherits]
        dt.stage = inherited.stage
        dt.bg = inherited.bg
    }
}

const MUS_MULTIPLIER = 0.55
let audioInt, caudio = []

// If loops is falsy then initStart is actually the volume
function playSong(url, loops, initStart, start, end) {
    let newAudio = new Audio(url)
    newAudio.volume = (loops ? MUS_MULTIPLIER : initStart) * (save.volume / 100)
    newAudio.play()
    caudio.push(newAudio)

    if (loops) {
        newAudio.currentTime = initStart
        if (audioInt) clearInterval(audioInt)
        audioInt = setInterval(() => {
            if (newAudio.currentTime >= end) {
                newAudio.currentTime = start
            }
        }, 40)
        // window.onkeydown = (e) => {
        //     if (e.key === 'g') {
        //         newAudio.currentTime = end - 5.0
        //     }
        // }
    }
}

function stopMusic() {
    if (audioInt) clearInterval(audioInt)
    caudio.forEach(audio => audio.pause())
    caudio = []
}

function unlockSaveens() {
    save.hasSaveensJar = true
}

function updateSaveens() {
    if (!save.hasSaveensJar) {
        $('#saveens').hide()
    } else {
        $('#saveens').show()

        $('.saveens-amount').text(save.money.toLocaleString())
    }
}

async function prepareDialog(name) {
    const dt = ALL_DIAGS[name]
    derefInheritance(dt)
    stopMusic()

    // Saveens check
    updateSaveens()

    if (dt.music)
        playSong(...dt.music[0])

    clearStage()
    await putStage(dt.stage)
    await putBackgroundImage(`assets/scenes/${dt.bg}`)
    return Promise.resolve()
}

let hasTalked,
    dt,
    lines,
    iterator

function clearDiagState() {
    hasTalked = null
    dt = null
    lines = null
    iterator = -1

    currentStage = []
}

function clearDiagDOM() {
    $('#diag-name').text('')
    $('#diag-text').text('')
    $('#saveens').hide()
    if ($('#lynn-pop')[0]) {
        hideLynn($('#lynn-pop'))
    };

    const ds = document.getElementById('dialog-scene')

    if (ds) ds.style.backgroundImage = 'url("../assets/money.png")';

    stopMusic()
    endShake()

    $('.mg-canvas').removeClass('visible')

    const $mbox = $('#multi-box')
    $mbox.empty()
    $mbox.removeClass('reverse-anim').removeClass('begin')
}

function hideNotifs() {
    $('#lynn-pop-container').html("")
}

function hideLynn($lynnpop) {
    $lynnpop.remove()
}

// Originally only showed Lynn get texts, now general notif function
// Also has queue functionality
function showLynn(text) {
    // Shows lynn pop-down
    const $lynnpop = $('#lynn-pop-container')
    
    const $txt = $(`<div class="lynn-pop panel">`)
    $txt.append($(`<pre class="lynn-pop-text">${text}</pre>`))
    $lynnpop.append($txt)
    $txt.show()
    $txt.addClass('anim')
    $lynnpop.show()

    setTimeout(() => {
        if (!$txt.hasClass('anim')) return

        $txt.hide()
        $txt.removeClass('anim')
        $txt.show()
        $txt.addClass('anim-reverse')

        $txt[0].onanimationend = () => hideLynn($txt)
    }, 2100)
}

// function clearNotifs() {
//     //$('#lynn-pop-container').html("")
// }

// function showNotifs() {
//     // const $lynnpop = $('#lynn-pop-container')
//     // $lynnpop.show()
//     // $lynnpop.addClass('anim')

//     // setTimeout(() => {
//     //     if (!$lynnpop.hasClass('anim')) return

//     //     $lynnpop.hide()
//     //     $lynnpop.removeClass('anim')
//     //     $lynnpop.show()
//     //     $lynnpop.addClass('anim-reverse')

//     //     $lynnpop[0].onanimationend = () => hideLynn($lynnpop)
//     // }, 2000)
// }

function startNewScene() {
    iterator = -1
    dt = ALL_DIAGS[newScene]
    lines = dt.diag.split("\n")
}

function randInt(s, e) {
    return Math.floor(Math.random() * (e - s + 1) + s)
}

function randFloat(s, e) {
    return Math.random() * (e - s + 1) + s
}

function handleFlaggedEvent(index, useFlagPrefix, cb) {
    const combinedName = `${useFlagPrefix}UseFlags`

    // -1 = bypass all checks
    if (index === -1) {
        cb()
        return
    }

    if (save[combinedName][index]) {
        return
    }

    save[combinedName][index] = true
    cb()
}

function doMoneyChange(amount) {
    save.money += amount

    const $el = $(`<pre class="money-change">`)
    if (amount <= 0) {
        $el.html(`<span style="color: darkred;">${amount.toLocaleString()}</span>`)
    } else {
        $el.html(`<span style="color: darkgreen;">+${amount.toLocaleString()}</span>`)
    }

    updateSaveens()

    $('#saveens-text').append($el)

    $el[0].onanimationend = () => {
        $el.remove()
    }
}

let oldPos, oldOff, $actor, offInt
function startShake(speakerIndex) {
    $actor = $($('.actor')[speakerIndex])
    oldPos = $actor.css('position')
    oldOff = $actor.offset()

    $actor.css('position', 'absolute')
    offInt = setInterval(() => {
        $actor.offset({
            top: randInt(-20, 20) + oldOff.top,
            left: randInt(-20, 20) + oldOff.left,
        })
    }, 16)
}

function endShake() {
    if (!oldPos) return
    $actor.css('position', oldPos)
    $actor.offset(oldOff)

    clearInterval(offInt)

    oldPos = null
    oldOff = null
    $actor = null
    offInt = null
}

// dictName: STRING name of dict on save to check
// dict: ARRAY actual array to use/search
// name: collectable to unlock
// Goes through dict, finds index of thing to try to unlock, unlocks it if not already unlocked
function unlockCollectable(dictName, dict, name) {
    let index = -1
    let j = 0
    for (const item of dict) {
        if (item[0].toLowerCase().includes(name.toLowerCase())) {
            index = j
        }
        j++
    }

    if (save[dictName][index])
        return

    if (index < 0) {
        // invalid lynn
        console.error("Invalid internal Lynn name provided: " + name)
        return
    }

    save[dictName][index] = true

    // Lynn pop-down
    if (dictName.endsWith('s')) {
        dictName = dictName.slice(0, -1)
    }

    showLynn(`New ${dictName.charAt(0).toUpperCase() + dictName.slice(1)}: <span class="ochicken">${dict[index][0]}</span>`)
}

let inlineVarDict = {}
function derefInlineVariable(name) {
    if (Object.keys(save).indexOf(name) > -1) return save[name]
    if (name in inlineVarDict) return inlineVarDict[name]
    if (name === 'lastChoice') return lastChoice
    if (name === 'lastChapter') return lastChapter
    if (name in save.savedVars) return save.savedVars[name]
    if (name.includes(" ")) return name // is assumed to be string

    // If not defined as a var, assumed to be int
    try {
        const asInt = parseInt(name)
        return Number.isNaN(asInt) ? name : asInt
    } catch(e) {
        return name
    }
}

function doAffectionChange(character, amount) {
    // If the index has already been used, return
    save[`${character.toLowerCase()}Affection`] += amount
    const isNeg = amount <= 0
    showLynn(`${character} Affection: <span style="color: ${isNeg ? "red" : "lime"};">${isNeg ? "" : "+"}${amount.toString()}</span>`)
}

function doInventoryPush(itemName) {
    save.inventory.push(itemName)
}

async function handleTalk(args) {
    hasTalked = true

    let speakerIndex = parseInt(args[1])
    const text = args.slice(2).join(" ")

    // Magnify speaker
    const $actors = $('.actor')
    $actors.removeClass('magnified')

    if (!Number.isNaN(speakerIndex)) {
        if (!$actors[speakerIndex]) return Promise.resolve()
        $actors[speakerIndex].classList.add('magnified')
    }

    await putTextBox(speakerIndex, text)
    await new Promise((resolve, reject) => {
        setTimeout(resolve, inputDelayTime)
    })
}

function addJournals() {
    save.journals += parseInt(inlineVarDict['_journal_increase'], 10)
}

let isTransition = false
let requireCondition = true
async function doDialog(name) {
    // Delay 100ms
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 120)
    })

    hasTalked = false
    dt = ALL_DIAGS[name]

    lines = dt.diag.split("\n")
    for (iterator = 0; iterator < (lines?.length ?? 99999); iterator++) {
        if (!lines) return Promise.resolve()
        writeSave()

        const line = lines[iterator]
        if (line.startsWith('#')) continue
        const args = line.split(" ")

        if (args[0] === 'pose') {
            const person = parseInt(args[1])
            const pose = args[2]

            // Only reanimate if we have talked
            updateActorPose(person, pose, hasTalked)
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 0)
            })
        } else if (args[0] === 'talk') {
            await handleTalk(args)
        } else if (args[0] === 'talknoconfirm') {
            handleTalk(args)
        } else if (args[0] === 'multi') {
            // Multichoice box
            const options = []
            iterator++
            for (; iterator < lines.length; iterator++) {
                if (!lines[iterator]) continue
                options.push(lines[iterator])
            }
            await showMulti(options)

            // Reset loop state
            startNewScene()
        } else if (args[0] === 'if') {
            const com = args[1]
            const variable = args[2]
            let condition

            if (com === 'gt') {
                condition = derefInlineVariable(variable) > derefInlineVariable(args[3])
            } else if (com === 'lt') {
                condition = derefInlineVariable(variable) < derefInlineVariable(args[3])
            } else if (com === 'eq') {
                condition = derefInlineVariable(variable) === derefInlineVariable(args[3])
            } else if (com === 'gteq') {
                condition = derefInlineVariable(variable) >= derefInlineVariable(args[3])
            } else if (com === 'lteq') {
                condition = derefInlineVariable(variable) <= derefInlineVariable(args[3])
            } else if (com === 'bounded') {
                const parsedVar = derefInlineVariable(variable)
                condition = parsedVar >= derefInlineVariable(args[3]) && parsedVar <= derefInlineVariable(args[4])
            } else if (com === 'inventoryhas') {
                condition = save.inventory.includes(args.slice(2).join(" "))
            } else if (com === 'inventoryhasnot') {
                condition = !(save.inventory.includes(args.slice(2).join(" ")))
            } else if (com === 'firstvisit') {
                condition = save.visitCounts[save.chapter] < 1
            } else if (com === 'notfirstvisit') {
                condition = save.visitCounts[save.chapter] > 0
            }

            if (!condition) {
                while (lines[iterator] !== 'endif' && iterator < lines.length) iterator++
                iterator--
                // newScene = lines[iterator + 1]
                // startNewScene()
            }
        } else if (args[0] === 'randint') {
            // randint <var> <s> <e>
            inlineVarDict[args[1]] = randInt(parseInt(args[2]), parseInt(args[3]))
        } else if (args[0] === 'affectionchange') {
            // Do affection change
            handleFlaggedEvent(derefInlineVariable(args[1]), `affection`, () => {
                doAffectionChange(args[2], derefInlineVariable(args[3]))
            })
        } else if (args[0] === 'setvar') {
            inlineVarDict[args[1]] = derefInlineVariable(args.slice(2).join(" "))
        } else if (args[0] === 'setglobal') {
            save.savedVars[args[1]] = derefInlineVariable(args.slice(2).join(" "))
        } else if (args[0] === 'copyvarnegative') {
            inlineVarDict[args[1]] = (-1) * derefInlineVariable(args.slice(2).join(" "))
        } else if (args[0] === 'moneychange') {
            handleFlaggedEvent(derefInlineVariable(args[1]), `money`, () => {
                doMoneyChange(derefInlineVariable(args.slice(2).join(" ")))
            })
        } else if (args[0] === 'pushinv') {
            // Push item (string) into inventory
            // function handleFlaggedEvent(index, useFlagPrefix, cb)
            handleFlaggedEvent(derefInlineVariable(args[1]), `inv`, () => {
                doInventoryPush(args[1], args.slice(2).join(" "))
            })
        } else if (args[0] === 'goto') {
            newScene = args[1]
            startNewScene()
        } else if (args[0] === 'leave') {
            const idx = parseInt(args[1])
            const $img = $($('.actor-img')[idx])
            $img.hide()
            $img.removeClass('animated')

            if (hasTalked) {
                $img.show()
                $img.addClass('animated').addClass('anim-reverse')
                if (args.length > 2) {
                    $img.hide().removeClass('anim-reverse')
                } else {
                    $img[0].onanimationend = () => {
                        $img.hide().removeClass('anim-reverse')
                        $img[0].onanimationend = null
                    }
                }
            }
        } else if (args[0] === 'incvisit') {
            save.visitCounts[save.chapter]++
        } else if (args[0] === 'enter') {
            const idx = parseInt(args[1])
            const $img = $($('.actor-img')[idx])

            $img.toggleClass('animated', true).show()
        } else if (args[0] === 'sfx') {
            playSong(args[1], false, parseFloat(args[2] || "1.0"))
        } else if (args[0] === 'lynn') {
            unlockCollectable('lynns', LYNNS, args[1])
            // let index = -1
            // let j = 0
            // for (const lynn of LYNNS) {
            //     if (lynn[0].toLowerCase().includes(args[1].toLowerCase())) {
            //         index = j
            //     }
            //     j++
            // }
            //
            // if (save.lynns[index])
            //     continue
            //
            // if (index < 0) {
            //     // invalid lynn
            //     console.error("Invalid internal Lynn name provided: " + args[1])
            // } else {
            //     save.lynns[index] = true
            //
            //     // Lynn pop-down
            //     showLynn(LYNNS[index][0], `New Lynn`)
            // }
        } else if (args[0] === 'gotofade') {
            newScene = args[1]
            startNewScene()
            await new Promise((resolve, reject) => {
                fadeoutNoSceneChange(() => {
                    hideNotifs()
                    updateSaveens()
                    resolve()
                })
            })
        } else if (args[0] === 'gotofadenewchapter') {
            lastChapter = save.chapter
            save.chapter = parseInt(args[1])

            fadeoutNoSceneChange(async () => {
                clearStage()
                currentStage = []
                await loadScene('mainMenu')
                await loadScene('dialog')
            })
        } else if (args[0] === 'chapter') {
            let finalVal

            try {
                finalVal = parseInt(args[1])
            } catch (e) {
                finalVal = save.chapter
            }

            save.chapter = finalVal
            save.chapters[finalVal - 1] = true
        } else if (args[0] === 'call') {
            // Calls sync func by string name
            window[args[1]]()
        } else if (args[0] === 'callawait') {
            // Calls async func by string name and awaits it
            await window[args[1]]()
        } else if (args[0] === 'setbg') {
            await putBackgroundImage(args.slice(1).join(" "))
        } else if (args[0] === 'shakestart') {
            const speakerIndex = parseInt(args[1])
            startShake(speakerIndex)
        } else if (args[0] === 'shakeend') {
            endShake()
        } else if (args[0] === 'error') {
            handleTalk(["talk", "-", `INTERNAL ERROR; VAR STATES: ${inlineVarDict} VARS WHICH HAVE RESPECTIVE VALUES ${args.slice(1).map(el => eval(el))}`])
        }
        // Deprecated; no distinction between save and workingSave anymore due to Chapters section removal (bc redundancy)
        // } else if (args[0] === 'copymoneytoreal') {

        // }
    }
}

function getChapterScene() {
    return CHAPTERS[save.chapter - 1][0]
}

async function doCurrentDiagSequence() {
    await prepareDialog(getChapterScene())
    await doDialog(getChapterScene())
}