const ALL_DIAGS = {
    "shortage": {
        bg: "cf.png",
        stage: [ ["left_back", "Amberlynn"], ["left_front", "Becky"], ["hflip", "right_front", "C.F. Waitress"] ],
        diag: `
pose 0 bored
talk - (Amberlynn & Becky are waiting at a table in Cheesecake Factory)
talk - ... ... ...
pose 0 excited
talk 0 "Finally the waiter is heeere, I'm getting so hongry..."
talk 2 "Hi, welcome to Cheesecake Factory, what will you guys be having today?"
talk 0 "Yeah I'll get 4 orders of the Orange Chicken..."
talk 2 "I'm sorry, we ran out of that yesterday. Something about a national shortage."
talk 0 "But you always have it here! We drove like 2 hourssss!"
talk 1 "Babe calm down, we can just go by Panda Express on the way back."
talk 0 "But I don't like Panda Express Beckyyy it's all like not authentic-ey."
talk - (Amberlynn is visibly furious)
talk 2 "From what I heard I don't think anywhere has it right now."
talk 2 "Your best bet would just be to make some at home."
talk 0 "But I don't know any cookeeen recipes for Orange Chicken!"
talk 2 *shrugs*
talk 1 "Look babe we can just look up some recipes online."
talk 0 "Ughhhhhhhh I'm literally dyeeeeen right nooooww."
talk 0 "Even if we do find a recipe it won't taste as good as theiirss."
talk 2 "Um, well, is there anything else I can get you guys?"

multi
Stay and let Becky eat
shortage_stay
Leave immediately
shortage_leave
`,
    },

    "shortage_stay": {
        inherits: "shortage",
        diag: `
talk 0 "Ughh okayyy fine."
talk - (waitress takes Amber & Becky's orders; they're silent for several minutes)
talk 1 "Look, I found this Orange Chicken recipe on Facebook."
talk - (Necky shows phone to Amber)
talk - (video of a girl making orange chicken in her kitchen plays)
talk - (Amber doesn't pay attention and stays quiet, still pissed, and with a frown on her face)
talk 1 "See, it looks just like the Orange Chicken they have here."
talk 0 "But it's not the saaaaaame!"
`,

    },
}

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
    "Amberlynn": "assets/actors/cfwaitress.png",
    "Becky": "assets/actors/cfwaitress.png",
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

                let finalStyle = ""
                if (hflip) {
                    finalStyle += `transform: scaleX(-1);`
                }

                if (position === 'left_back') {
                    finalStyle += `float: left;`
                } else if (position === 'left_front') {
                    finalStyle += `float: left;`
                } else if (position === 'right_front') {
                    finalStyle += `float: right;`
                } else if (position === 'right_back') {
                    finalStyle += `float: right;`
                }

                const $actorImg = $(`<img class="actor-img animated" src="${ACTORS[actorItem[i]]}" alt="">`)
                const $actorEl = $(`<div class="actor" style="${finalStyle}">`)
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

function updateActorPose(stageIndex, newPose, reanimate) {
    if (currentStage[stageIndex].length < 3) {
        currentStage[stageIndex].push(newPose)
    }

    if (currentStage[stageIndex][2] === newPose) {
        // Do nothing
        return
    }

    // Now we know it's a new pose that should reanimate
    const $actorImg = $($('.actor-img')[stageIndex])
    $actorImg.src = getCustomPoseURL(currentStage[stageIndex][0], newPose)

    if (reanimate) $actorImg.removeClass('animated').addClass('animated')
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
                console.log(e.key)
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
    const $mbox = $('#multi-box')
    $mbox.toggleClass('begin', true)
    let $coption
    for (let i = 0; i < options.length; i++) {
        if (i % 2 === 0) {
            // Text
            $coption = $(`<pre>${options[i]}</pre>`)
        } else {
            $coption[0].scene = options[i]
            $mbox.append($coption)
        }
    }

    await new Promise((resolve, reject) => {

    })
    return Promise.resolve()
}

async function prepareDialog(name) {
    clearActors()
    await putStage(ALL_DIAGS[name].stage)
    return Promise.resolve()
}

async function doDialog(name) {
    // Delay 100ms
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 100)
    })

    let hasTalked = false
    const dt = ALL_DIAGS[name]

    const lines = dt.diag.split("\n")
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const args = line.split(" ")
        if (args[0] === 'pose') {
            const person = parseInt(args[1])
            const pose = args[2]

            // Only reanimate if we have talked
            updateActorPose(person, pose, hasTalked)
        } else if (args[0] === 'talk') {
            hasTalked = true

            let speakerIndex = parseInt(args[1])
            const text = args.slice(2).join(" ")

            // Magnify speaker
            const $actorImg = $('.actor-img')
            $actorImg.removeClass('magnified')
            if (!Number.isNaN(speakerIndex)) $actorImg[speakerIndex].classList.add('magnified')

            await putTextBox(speakerIndex, text)
        } else if (args[0] === 'multi') {
            // Multichoice box
            const options = []
            i++
            for (; i < lines.length; i++) {
                options.push(lines[i])
            }
            await showMulti(options)
        }
    }
}

async function doCurrentDiagSequence() {
    await prepareDialog(save.diag)
    await doDialog(save.diag)
}