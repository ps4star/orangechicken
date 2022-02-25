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

function loadScene(name, $root) {
    writeSave()

    let oldScene = cScene
    let newScene = name
    let $finalRoot = $root ?? $sroot

    tryHook(globalHooks, 'unload', newScene)
    tryHook(localHooks, 'unload', newScene)

    $finalRoot.empty()

    // Populate new children
    cScene = newScene
    scenes[name].forEach($child => {
        $finalRoot.append($child)
    })

    // Run hooks
    tryHook(globalHooks, 'load', oldScene)
    tryHook(localHooks, 'load', oldScene)
}

const FADE_TIME = 400
function fadeoutNoSceneChange(callback) {
    $('#s-cover').addClass('visible')
    setTimeout(() => {
        if (callback) callback()
        $('#s-cover').removeClass('visible')
    }, FADE_TIME)
}

function fadeoutToScene(name, $root) {
    fadeoutNoSceneChange(() => loadScene(name, $root))
}