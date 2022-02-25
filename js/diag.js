function fillArr(item, num) {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(item)
    }
    return arr
}

// Very small intentional lag to prevent too many inputs fucking everything up
const inputDelayTime = 50

const NUM_LYNNS = 151
const NUM_ACHIEVEMENTS = 2
const NUM_CHAPTERS = 89
const DEFAULT_SAVE = {
    chapter: 1,
    chapters: fillArr(false, NUM_CHAPTERS),
    diag: "shortage",
    lynns: fillArr(false, NUM_LYNNS),
    achievements: fillArr(false, NUM_ACHIEVEMENTS),

    textSpeed: 30,
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

const ACTORS = {
    "Amberlynn": "assets/actors/amberlynn.png",
    "Becky": "assets/actors/becky.png",
    "C.F. Waitress": "assets/actors/cfwaitress.png",
}

function clearStage() {
    $('#actors').empty()
}

// The save we're actually going to use
let workingSave = save

// [name, position, (pose) ?? "normal"]
let currentStage = []

async function putStage(actorsList) {
    let hflip = false
    let position = "left_back"
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

                const $actorImg = $(`<img class="actor-img animated" src="${ACTORS[actorItem[i]]}" alt="">`)
                const $actorEl = $(`<div class="actor ${finalClasses.join(" ")}">`)
                    .append($actorImg)

                await new Promise((resolve, reject) => {
                    if ($actorImg[0].complete) resolve()
                    else $actorImg[0].onload = resolve
                })

                $actorImg.hide()

                $('#actors').append($actorEl)
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
    const $actorImg = $($('.actor-img')[stageIndex])
    if (!$actorImg[0]) return Promise.resolve()
    $actorImg.hide()
    $actorImg[0].src = getCustomPoseURL(currentStage[stageIndex][0], newPose)

    // Update stage
    currentStage[stageIndex][2] = newPose

    await new Promise((resolve, reject) => {
        if ($actorImg[0].complete) resolve()
        else $actorImg[0].onload = resolve
    })

    if (reanimate) {
        $actorImg.removeClass('animated')

        $actorImg.show()
        $actorImg.addClass('animated')
    } else {
        $actorImg.show()
    }

    return Promise.resolve()
}

let textScrollInt
let textInputMode = true
async function putTextBox(speakerIndex, text) {
    const diag = document.getElementById('diag-text')
    if (!diag) {
        $(window).off('mousedown')
        $(window).off('keydown')
        return Promise.resolve()
    }

    diag.innerText = ""
    $(diag).toggleClass('full', false)
    let speakerName
    if (Number.isNaN(speakerIndex)) {
        speakerName = "---"
    } else {
        if (typeof currentStage[speakerIndex] === 'undefined') return Promise.resolve()
        speakerName = currentStage[speakerIndex][0]
    }

    $('#diag-name').text(speakerName)
    await new Promise((resolve, reject) => {
        if (typeof textScrollInt !== 'undefined') clearInterval(textScrollInt)

        let revealIndex = 0
        textScrollInt = setInterval(() => {
            if (diag.innerText.length >= text.length) {
                clearInterval(textScrollInt)
            } else {
                diag.innerText += text.charAt(revealIndex++)
                if (diag.innerText.length >= text.length) {
                    $(diag).toggleClass('full', true)
                }
            }
        }, 6)

        function handleAdvanceClick(e) {
            e.preventDefault()

            if (e.key) {
                if (!(e.key === 'Enter' || e.key === ' ')) {
                    return
                }
            }

            // Advance all text
            if (textScrollInt) clearInterval(textScrollInt)
            if (diag.innerText.length < text.length) {
                diag.innerText = text
                $(diag).toggleClass('full', true)
            } else {
                // Already has finished text; remove listener and resolve
                $(window).off('mousedown')
                $(window).off('keydown')
                resolve()
            }
        }

        $(window).off('keydown')
        $(window).off('mousedown')
        $(window).on('mousedown keydown', handleAdvanceClick)
    })
}

let newScene
async function showMulti(options) {
    return new Promise((resolve, reject) => {
        let selected = 0
        const $mbox = $('#multi-box')
        $mbox.removeClass('reverse-anim')
        $mbox.toggleClass('begin', true)
        for (let i = 0; i < options.length; i += 2) {
            // Text
            const $coption = $(`<pre tabindex="-1">${options[i]}</pre>`)
                .on('mouseenter', function(e) {
                    $mbox.children().removeClass('selected')
                    selected = null
                })
                .on('mousedown', function(e) {
                    $mbox.hide()
                    $mbox.removeClass('begin')
                    $mbox.show()
                    $mbox.addClass('reverse-anim')
                    $mbox[0].onanimationend = () => {
                        $mbox.empty()
                        $mbox.removeClass('reverse-anim')
                        $mbox[0].onanimationend = null
                        resolve()
                    }
                    newScene = $coption[0].scene
                })

            $coption[0].scene = options[i + 1]
            $mbox.append($coption)
        }
        $mbox.children()[selected].classList.add('selected')

        function handleKeyDown(e) {
            if (e.key) {
                if (e.key.includes('Arrow')) {
                    if (e.key === 'ArrowUp' && selected > 0) selected--
                    else if (e.key === 'ArrowDown' && selected < $mbox[0].children.length - 1) selected++

                    $mbox.children().removeClass('selected')
                    $mbox.children()[selected].classList.add('selected')
                } else if (e.key === 'Enter') {
                    // Confirm
                    $($mbox.children()[selected]).trigger('mousedown')
                    $(window).off('keydown')
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

const MUS_MULTIPLIER = 0.6
let audioInt, caudio = []
function playSong(url, loops, initStart, start, end) {
    let newAudio = new Audio(url)
    newAudio.volume = (loops ? MUS_MULTIPLIER : initStart) * (workingSave.volume / 100)
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
        window.onkeydown = (e) => {
            if (e.key === 'g') {
                newAudio.currentTime = end - 5.0
            }
        }
    }
}

function stopMusic() {
    if (audioInt) clearInterval(audioInt)
    caudio.forEach(audio => audio.pause())
}

function updateSaveens() {
    if (!workingSave.hasSaveensJar) {
        $('#saveens').hide()
    } else {
        $('#saveens').show()

        $('.saveens-amount').text(workingSave.money.toLocaleString())
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
    }

    endShake()

    $('.mg-canvas').removeClass('visible')

    const $mbox = $('#multi-box')
    $mbox.empty()
    $mbox.removeClass('reverse-anim').removeClass('begin')
}

function hideLynn($lynnpop) {
    $lynnpop[0].onanimationend = null
    $lynnpop.hide()
    $lynnpop.removeClass('anim-reverse').removeClass('anim')
    $('.lynn-pop-text').html('')
}

function showLynn(name, text) {
    // Shows lynn pop-down
    const $lynnpop = $('#lynn-pop')
    $lynnpop.show()
    $lynnpop.addClass('anim')
    $('.lynn-pop-text').html(`${text}: <span class="ochicken">${name}</span>`)

    setTimeout(() => {
        if (!$lynnpop.hasClass('anim')) return

        $lynnpop.hide()
        $lynnpop.removeClass('anim')
        $lynnpop.show()
        $lynnpop.addClass('anim-reverse')

        $lynnpop[0].onanimationend = () => hideLynn($lynnpop)
    }, 2000)
}

function startNewScene() {
    iterator = -1
    dt = ALL_DIAGS[newScene]
    lines = dt.diag.split("\n")
    console.log(lines[1])
}

function randInt(s, e) {
    return Math.floor(Math.random() * (e - s + 1) + s)
}

function randFloat(s, e) {
    return Math.random() * (e - s + 1) + s
}

function doMoneyChange(amount) {
    workingSave.money += amount
    if (workingSave.money < 0) {
        workingSave.money = 0
    }

    const $el = $(`<pre class="money-change">`)
    if (amount <= 0) {
        $el.html(`<span style="color: darkred;">${amount.toLocaleString()}</span>`)
    } else {
        $el.html(`<span class="ochicken">+${amount.toLocaleString()}</span>`)
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

function unlockCollectable(dictName, dict, name) {
    let index = -1
    let j = 0
    for (const item of dict) {
        if (item[0].toLowerCase().includes(name.toLowerCase())) {
            index = j
        }
        j++
    }

    if (workingSave[dictName][index])
        return

    if (index < 0) {
        // invalid lynn
        console.error("Invalid internal Lynn name provided: " + name)
    } else {
        workingSave[dictName][index] = true

        // Lynn pop-down
        showLynn(dict[index][0], `New ${dictName.charAt(0).toUpperCase() + dictName.slice(1)}`)
    }
}

let isTransition = false
async function doDialog(name) {
    // Delay 100ms
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 100)
    })

    hasTalked = false
    dt = ALL_DIAGS[name]

    lines = dt.diag.split("\n")
    for (iterator = 0; iterator < (lines?.length ?? 99999); iterator++) {
        if (!lines) return Promise.resolve()
        if (workingSave === save) {
            writeSave()
        }

        const line = lines[iterator]
        if (line.startsWith('#')) continue
        const args = line.split(" ")
        if (args[0] === 'pose') {
            const person = parseInt(args[1])
            const pose = args[2]

            // Only reanimate if we have talked
            await updateActorPose(person, pose, hasTalked)
        } else if (args[0] === 'talk') {
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
        } else if (args[0] === 'enter') {
            const idx = parseInt(args[1])
            const $img = $($('.actor-img')[idx])

            $img.toggleClass('animated', true).show()
        } else if (args[0] === 'sfx') {
            playSong(args[1], false, 1.0)
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
            // if (workingSave.lynns[index])
            //     continue
            //
            // if (index < 0) {
            //     // invalid lynn
            //     console.error("Invalid internal Lynn name provided: " + args[1])
            // } else {
            //     workingSave.lynns[index] = true
            //
            //     // Lynn pop-down
            //     showLynn(LYNNS[index][0], `New Lynn`)
            // }
        } else if (args[0] === 'gotofade') {
            hideLynn($('#lynn-pop'))

            newScene = args[1]
            startNewScene()
            await new Promise((resolve, reject) => {
                fadeoutNoSceneChange(() => {
                    updateSaveens()
                    resolve()
                })
            })
        } else if (args[0] === 'gotofadenewchapter') {
            hideLynn($('#lynn-pop'))

            workingSave.chapter = parseInt(args[1])

            fadeoutNoSceneChange(() => {
                loadScene('mainMenu')
                loadScene('dialog')
            })
        } else if (args[0] === 'chapter') {
            let finalVal

            try {
                finalVal = parseInt(args[1])
            } catch (e) {
                finalVal = workingSave.chapter
            }

            workingSave.chapter = finalVal
            workingSave.chapters[finalVal - 1] = true
        } else if (args[0] === 'call') {
            // Calls sync func by string name
            window[args[1]]()
        } else if (args[0] === 'callawait') {
            // Calls async func by string name and awaits it
            await window[args[1]]()
        } else if (args[0] === 'unlocksaveens') {
            // Unlock the saveens jar
            workingSave.hasSaveensJar = true
        } else if (args[0] === 'shakestart') {
            const speakerIndex = parseInt(args[1])
            startShake(speakerIndex)
        } else if (args[0] === 'shakeend') {
            endShake()
        } else if (args[0] === 'copymoneytoreal') {
            save.money = workingSave.money
        }
    }
}

function getChapterScene() {
    return CHAPTERS[workingSave.chapter - 1][0]
}

async function doCurrentDiagSequence() {
    await prepareDialog(getChapterScene())
    await doDialog(getChapterScene())
}