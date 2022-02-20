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

function tryHook(hookLib, evtName) {
    if (!hookLib[cScene] || !hookLib[cScene][evtName]) return false
    hookLib[cScene][evtName]()
}

function loadScene(name, $root) {
    writeSave()

    let $finalRoot = $root ?? $sroot

    tryHook(globalHooks, 'unload')
    tryHook(localHooks, 'unload')

    $finalRoot.empty()

    // Populate new children
    cScene = name
    scenes[name].forEach($child => {
        $finalRoot.append($child)
    })

    // Run hooks
    tryHook(globalHooks, 'load')
    tryHook(localHooks, 'load')
}

function fadeoutToScene(name, $root) {
    $('#s-cover').addClass('visible')
    setTimeout(() => {
        loadScene(name, $root)
        $('#s-cover').removeClass('visible')
    }, 400)
}