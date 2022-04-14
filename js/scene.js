let scenes = {}
let cScene = null

let globalHooks = {}
let localHooks = {}

// Scene root
const $sroot = $('#root')

const makeScene = function(name) {
    scenes[name] = []
    cScene = name
}

const addCurrent = function($el) {
    scenes[cScene].push($el)
}

const hook = function(evtName, cb) {
    if (!localHooks[cScene]) localHooks[cScene] = {}
    localHooks[cScene][evtName] = cb
}

const hookGlobal = function(evtName, cb) {
    if (!globalHooks) {
        window.globalHooks = {}
    }

    if (!globalHooks[evtName]) globalHooks[evtName] = {}
    globalHooks[evtName] = cb
}

const tryHook = function(hookLib, evtName, sceneChange) {
    if (!hookLib) return false
    const func = hookLib === localHooks ? hookLib[cScene][evtName] : hookLib[evtName]
    if (!func) return false
    func(sceneChange)
}

const loadScene = async function(name, $root) {
    writeSave()

    let oldScene = cScene
    let newScene = name
    let $finalRoot = $root ?? $sroot

    tryHook(globalHooks, 'unload', newScene)
    tryHook(localHooks, 'unload', newScene)

    $finalRoot.empty()

    // Pre-buffer assets
    if (localHooks[newScene]['before']) {
        await localHooks[newScene]['before']()
    }

    // Populate new children
    cScene = newScene
    scenes[name].forEach($child => {
        $finalRoot.append($child)
    })

    // Run hooks
    tryHook(globalHooks, 'load', oldScene)
    tryHook(localHooks, 'load', oldScene)
}

const pickRandom = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

const showLoadeen = function() {
    $('#loadeen').toggleClass('visible', true)
}

const cycleLoadeen = function() {
    $('#lt1').text( pickRandom(LOADEEN_TEXTS) )
}

const hideLoadeen = function() {
    $('#loadeen').toggleClass('visible', false)
}

const LOADEEN_INTERVAL = 1400
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
    "Flying freely like a bird, maybe a pigeon...",
    "Finding a sign in your teeth to show high blood pressure...",
    "Making up lahs...",
    "Giving Becky almost none of the lah-stream money...",
    "Ignoring 30 superchats...",
    "Eating 9th mill of the day...",
    "Using the treadmeal...",
    "Being a dainty gorl...",
    "Waking up overnight...",
]
const FADE_TIME = 400
const fadeoutNoSceneChange = function(callback, noLoadingScreen) {
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

const fadeoutToScene = function(name, $root) {
    fadeoutNoSceneChange(async () => { return loadScene(name, $root) })
}