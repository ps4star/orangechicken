const CHAPTER_NAMES = [
    null,
    "Shortage",
]

const NUM_LYNNS = 151
const DEFAULT_SAVE = {
    chapter: 1,
    diag: "shortage",
    lynns: ([]).fill(false, 0, NUM_LYNNS),
    textSpeed: 30,
}

let save = DEFAULT_SAVE

const LS_KEY = "alrsavedata"
if (!localStorage[LS_KEY]) {
    localStorage[LS_KEY] = DEFAULT_SAVE
} else {
    try {
        save = JSON.parse(localStorage[LS_KEY])
    } catch(e) {
        localStorage[LS_KEY] = DEFAULT_SAVE
    }
}

const ACTORS = {
    "Amberlynn": "assets/actors/amberlynn.png",
    "Becky": "assets/actors/becky.png",
    "C.F. Waitress": "assets/actors/cfwaitress.png",
}

function clearActors() {
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
        return
    }

    // Now we know it's a new pose that should reanimate
    console.log(currentStage[stageIndex], newPose)
    const $actorImg = $($('.actor-img')[stageIndex])
    $actorImg[0].src = getCustomPoseURL(currentStage[stageIndex][0], newPose)

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

async function showMulti(options) {
    return new Promise((resolve, reject) => {
        const $mbox = $('#multi-box')
        $mbox.removeClass('reverse-anim')
        $mbox.toggleClass('begin', true)
        for (let i = 0; i < options.length; i += 2) {
            // Text
            const $coption = $(`<pre>${options[i]}</pre>`)
                .on('mousedown', function(e) {
                    $mbox.removeClass('begin')
                    setTimeout(() => {
                        $mbox.addClass('reverse-anim')
                        $mbox[0].onanimationend = () => {
                            $mbox.empty()
                            $mbox.removeClass('reverse-anim')
                            resolve()
                        }
                    }, 0)
                    save.diag = this.scene
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

let audioInt
function playSong(url, initStart, start, end) {
    let audio = new Audio(`assets/music/${url}.mp3`)
    audio.volume = 0.65
    audio.play()
    audio.currentTime = initStart
    if (audioInt) clearInterval(audioInt)
    audioInt = setInterval(() => {
        if (audio.currentTime >= end) {
            audio.currentTime = start
        }
    }, 40)
    window.onkeydown = (e) => {
        if (e.key === 'g') {
            audio.currentTime = end - 5.0
        }
    }
}

async function prepareDialog(name) {
    const dt = ALL_DIAGS[name]
    derefInheritance(dt)

    playSong(...dt.music[0])

    clearActors()
    await putStage(dt.stage)
    await putBackgroundImage(`assets/scenes/${dt.bg}`)
    return Promise.resolve()
}

async function doDialog(name) {
    // Delay 100ms
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 100)
    })

    let hasTalked = false
    let dt = ALL_DIAGS[name]

    let lines = dt.diag.split("\n")
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
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
            if (speakerIndex === 2) {
                console.log($actors[2])
            }
            if (!Number.isNaN(speakerIndex)) $actors[speakerIndex].classList.add('magnified')

            await putTextBox(speakerIndex, text)
        } else if (args[0] === 'multi') {
            // Multichoice box
            const options = []
            i++
            for (; i < lines.length; i++) {
                if (!lines[i]) continue
                options.push(lines[i])
            }
            await showMulti(options)

            // Reset loop state
            i = -1
            hasTalked = false
            dt = ALL_DIAGS[save.diag]
            lines = dt.diag.split("\n")
        }
    }
}

async function doCurrentDiagSequence() {
    await prepareDialog(save.diag)
    await doDialog(save.diag)
}