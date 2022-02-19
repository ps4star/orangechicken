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

function loadScene(name) {
    tryHook(globalHooks, 'unload')
    tryHook(localHooks, 'unload')

    $sroot.empty()

    // Populate new children
    cScene = name
    scenes[name].forEach($child => {
        $sroot.append($child)
    })

    // Run hooks
    tryHook(globalHooks, 'load')
    tryHook(localHooks, 'load')
}

function fadeoutToScene(name) {
    $('#s-cover').addClass('visible')
    console.log(document.getElementById('s-cover'))
    setTimeout(() => {
        loadScene(name)
        $('#s-cover').removeClass('visible')
    }, 650)
}