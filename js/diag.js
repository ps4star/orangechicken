function fillArr(item, num) {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(item)
    }
    return arr
}

// Very small intentional lag to prevent too many inputs fucking everything up
const inputDelayTime = 5

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
    if (currentStage[stageIndex].length < 3) {
        currentStage[stageIndex].push(newPose)
    } else if (currentStage[stageIndex][2] === newPose) {
        // Do nothing
        return Promise.resolve()
    }

    // Now we know it's a new pose that should reanimate
    const $actorImg = $($('.actor-img')[stageIndex])
    if (!$actorImg[0]) return Promise.resolve()
    $actorImg[0].src = getCustomPoseURL(currentStage[stageIndex][0], newPose)

    // Update stage
    currentStage[stageIndex][2] = newPose

    await new Promise((resolve, reject) => {
        if ($actorImg[0].complete) resolve()
        else $actorImg[0].onload = resolve
    })

    if (reanimate) {
        $actorImg.hide()
        $actorImg.removeClass('animated')

        $actorImg.show()
        $actorImg.addClass('animated')
    }

    return Promise.resolve()
}

let textScrollInt
async function putTextBox(speakerIndex, text) {
    const diag = document.getElementById('diag-text')
    if (!diag) return Promise.resolve()

    diag.innerText = ""
    $(diag).toggleClass('full', false)
    let speakerName
    if (Number.isNaN(speakerIndex)) {
        speakerName = "---"
    } else {
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
        }, save.textSpeed)

        function handleAdvanceClick(e) {
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
                $(window).off('mousedown keydown', handleAdvanceClick)
                resolve()
            }
        }

        $(window).on('mousedown keydown', handleAdvanceClick)
    })
}

let newScene
async function showMulti(options) {
    return new Promise((resolve, reject) => {
        const $mbox = $('#multi-box')
        $mbox.removeClass('reverse-anim')
        $mbox.toggleClass('begin', true)
        for (let i = 0; i < options.length; i += 2) {
            // Text
            const $coption = $(`<pre>${options[i]}</pre>`)
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
    })
}

function derefInheritance(dt) {
    if (dt.inherits) {
        const inherited = ALL_DIAGS[dt.inherits]
        dt.stage = inherited.stage
        dt.bg = inherited.bg
    }
}

const MUS_MULTIPLIER = 0.65
let audioInt, caudio = []
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

async function prepareDialog(name) {
    const dt = ALL_DIAGS[name]
    derefInheritance(dt)
    stopMusic()

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

function showLynn(name) {
    // Shows lynn pop-down
    const $lynnpop = $('#lynn-pop')
    $lynnpop.show()
    $lynnpop.addClass('anim')
    $('.lynn-pop-text').html(`You unlocked a new Lynn: <span class="ochicken">${name}</span>`)

    setTimeout(() => {
        $lynnpop.hide()
        $lynnpop.removeClass('anim')
        $lynnpop.show()
        $lynnpop.addClass('anim-reverse')

        $lynnpop[0].onanimationend = () => {
            $lynnpop[0].onanimationend = null
            $lynnpop.hide()
            $lynnpop.removeClass('anim-reverse')
            $('.lynn-pop-text').html('')
        }
    }, 2500)
}

async function doDialog(name) {
    // Delay 100ms
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 100)
    })

    hasTalked = false
    dt = ALL_DIAGS[name]

    lines = dt.diag.split("\n")
    for (iterator = 0; iterator < lines.length; iterator++) {
        if (!lines) return Promise.resolve()

        const line = lines[iterator]
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
            iterator = -1
            dt = ALL_DIAGS[newScene]
            lines = dt.diag.split("\n")
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
            // register lynn
            let index = -1
            let j = 0
            for (const lynn of LYNNS) {
                if (lynn[0].toLowerCase().includes(args[1].toLowerCase())) {
                    index = j
                }
                j++
            }

            if (save.lynns[index])
                continue

            if (index < 0) {
                // invalid lynn
                console.error("Invalid internal Lynn name provided: " + args[1])
            } else {
                save.lynns[index] = true

                // Lynn pop-down
                showLynn(LYNNS[index][0])
            }
        }
    }
}

function getChapterScene() {
    return CHAPTERS[save.chapter][0]
}

async function doCurrentDiagSequence() {
    await prepareDialog(getChapterScene())
    await doDialog(getChapterScene())
}