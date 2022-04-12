var scenes = {},
    cScene = null,

    globalHooks = {},
    localHooks = {}

// Scene root
const $sroot = $('#root')

function makeScene(name) {
    scenes[name] = []
    cScene = name
}

function addCurrent($el) {
    scenes[cScene].push($el)
}

function hook(evtName, cb) {
    if (!localHooks[cScene]) localHooks[cScene] = {}
    localHooks[cScene][evtName] = cb
}

function hookGlobal(evtName, cb) {
    if (!globalHooks[cScene]) globalHooks[cScene] = {}
    globalHooks[cScene][evtName] = cb
}

function tryHook(hookLib, evtName, sceneChange) {
    if (!hookLib[cScene] || !hookLib[cScene][evtName]) return false
    hookLib[cScene][evtName](sceneChange)
}

async function loadScene(name, $root) {
    writeSave()

    let oldScene = cScene
    let newScene = name
    let $finalRoot = $root ?? $sroot

    tryHook(globalHooks, 'unload', oldScene)
    tryHook(localHooks, 'unload', oldScene)

    $finalRoot.empty()

    // Pre-buffer assets
    if (localHooks[newScene]['before']) {
        console.log(localHooks[newScene]['before'])
        await localHooks[newScene]['before']()
    }

    // Populate new children
    cScene = newScene
    scenes[name].forEach($child => {
        $finalRoot.append($child)
    })

    // Run hooks
    tryHook(globalHooks, 'load', newScene)
    tryHook(localHooks, 'load', newScene)
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function showLoadeen() {
    $('#loadeen').show()
}

function cycleLoadeen() {
    $('#loadeen').text( pickRandom(LOADEEN_TEXTS) )
}

function hideLoadeen() {
    $('#loadeen').hide()
}

const LOADEEN_INTERVAL = 1000
const LOADEEN_TEXTS = [
    "Waaaaaaaaaaiteeeeeeeeeeeeeeeeeen...",
    "Blaming Twinkie's weight on Eric & Rickie...",
    "Finding the right shoes...",
    "Eating too many sodiums...",
    "Sensing an understandment...",
    "Hiding Wifey...",
    "Getting drunk on Instagram live...",
    "Waiting until it's darktime...",
    "Looking for the wommart scooter...",
    "Spraying PAM on food...",
    "Abusing Becky...",
    "Jangling a loud thing...",
    "Using the wrong chease...",
    "Unplugging the freezer...",
    "Weighing in...",
    "Doing a coloreen book...",
    "Sailing earreens on Instagram...",
    "Advertising some art that Becky is sailing...",
    "Loadeen...",
    "Using the Grock Bot...",
    "Dealing with acid reflex...",
    "Rating Gabbie Hannah's poetry book 4 out of 5...",
    "Falleen toe-wurd the moon...",
    "Leaveen this planet...",
    "Calling FBI Frank...",
    "Deleteen mean comments...",
    "Buying a suckalint...",
    "Getting it standed on a cake platter...",
    "Rolling dice like knives on a platter...",
    "Hashing out propaGONda...",
    "Rain and petals eavesdropping...",
    "Writing slam poetry...",
    "Being a monster truck in the nightlife...",
    "Accusing ex of rain and petals eavesdrop...",
    "Petting the window seal...",
]
const FADE_TIME = 400
function fadeoutNoSceneChange(callback, noLoadingScreen) {
    $('#s-cover').addClass('visible')
    setTimeout(async () => {
        let lInterval

        if (!noLoadingScreen) {
            cycleLoadeen()
            showLoadeen()
            lInterval = setInterval(() => {
                cycleLoadeen()
            }, LOADEEN_INTERVAL)
        }

        if (callback) {
            await callback()
        }

        hideLoadeen()

        // Stops cycling loads
        clearInterval(lInterval)
        lInterval = null

        $('#s-cover').removeClass('visible')
    }, FADE_TIME)
}

function fadeoutToScene(name, $root) {
    fadeoutNoSceneChange(async () => { return loadScene(name, $root) })
}