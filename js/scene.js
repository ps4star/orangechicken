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

const FADE_TIME = 400
function fadeoutNoSceneChange(callback) {
    $('#s-cover').addClass('visible')
    setTimeout(async () => {
        if (callback) await callback()
        $('#s-cover').removeClass('visible')
    }, FADE_TIME)
}

function fadeoutToScene(name, $root) {
    fadeoutNoSceneChange(async () => await loadScene(name, $root))
}