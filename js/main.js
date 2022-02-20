const debug = true
makeScene('mainMenu')

addCurrent(
    $(`<pre class="mm-title">Amberlynn's <span class="ochicken">Orange Chicken</span> Quest</pre>`)
)
addCurrent(
    $(`<div class="mm-buttons-container">`)
        .append($(`<button class="mm-button mm-play-button">Play</button>`)

        )
        .append($(`<button class="mm-button mm-options-button">Options</button>`)

        )
        .append($(`<button class="mm-button mm-lynns-button">Lynns</button>`)

        )
)
hook('load', function() {
    $('.mm-play-button').on('mousedown', function(e) {
        console.log('susoriginal')
        e.stopPropagation()
        e.stopImmediatePropagation()
        e.preventDefault()

        fadeoutToScene('chapter')
        return false
    })

    $('.mm-options-button').on('mousedown', function(e) {
        e.stopPropagation()
        e.stopImmediatePropagation()
        e.preventDefault()

        fadeoutToScene('options')
        return false
    })

    $('.mm-lynns-button').on('mousedown', function(e) {
        e.stopPropagation()
        e.stopImmediatePropagation()
        e.preventDefault()

        fadeoutToScene('lynns')
        return false
    })

    if (debug) {
        let listener
        listener = (e) => {
            if (e.key === 'g') {
                loadScene('dialog')
                window.removeEventListener('keydown', listener)
            }
        }
        window.addEventListener('keydown', listener)
    }
})

makeScene('options')
addCurrent(
    $(`<div id="options-container">`)
)

makeScene('lynns')
addCurrent(
    $(`<div id="lynns-container">`)
        .append($(`<pre id="lynns-amount-header"></pre>`))
        .append($(`<div id="lynns-main">`))
        .append($(`<div id="lynns-controls">`)
            .append($(`<button id="lynn-page-previous" class="lynn-page-control">&lt;</button>`))
            .append($(`<pre id="lynn-page-text"></pre>`))
            .append($(`<button id="lynn-page-next" class="lynn-page-control">&gt;</button>`))
        )
)
hook('load', function() {
    // load up header
    $('#lynns-amount-header').text(`You have ${save.lynns.reduce((prev, current) => prev + Number(current) )} lynns out of 151!`)

    // load up legit lynns
    const $lynnMain = $('#lynns-main')
    let i = 0
    let $page
    for (; i < NUM_LYNNS; i++) {
        if (i % 20 === 0) {
            if ($page) {
                $lynnMain.append($page)
            }
            $page = $(`<div class="lynns-page">`)
            $page.hide()
        }
        let url, name
        if (i >= LYNNS.length) {
            url = "assets/actors/amberlynn_shadow.png"
            name = "???"
        } else {
            url = LYNNS[i][1]
            name = LYNNS[i][0]
        }

        const $legitLynn = $(`<div class="lynn">`)
            .append($(`<img class="lynn-img" alt="" src="${url}">`))
            .append($(`<pre class="lynn-text">${name}</pre>`))

        $page.append($legitLynn)
    }

    // fill up until NUM_LYNNS with ???

})

makeScene('chapter')

addCurrent(
    $(`<div id="chapter-container">`)
        .append($(`<pre id="ch-text">`))
        .append($(`<pre id="ch-name">`))
)

hook('load', async function() {
    setTimeout(() => $('#ch-text').addClass('grow-border'), 100)
    $('#ch-text').text(`Chapter ${save.chapter.toString()}`)
    $('#ch-name').text(CHAPTER_NAMES[save.chapter])

    await new Promise((resolve, reject) => {
        setTimeout(resolve, 3750)
    })

    fadeoutToScene('dialog')
})
hook('unload', function () {
    $('#ch-text').removeClass('grow-border')
})

makeScene('dialog')

addCurrent(
    $(`<div id="dialog-scene">`)
        .append($(`<div id="actors">`))
        .append($(`<div id="diag-container">`)
            .append($(`<div id="diag-name">`))
            .append($(`<div id="diag">`)
                .append($(`<pre id="diag-text">`))
            )
            .append($(`<div id="diag-options">`)
                .append($(`<button id="diag-quit" class="diag-button">Quit</button>`)

                )
            )
        )
        .append($(`<div id="multi-box">`))
)

hook('load', function() {
    $('#diag-quit').on('mousedown', function(e) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()

        stopMusic()
        fadeoutToScene('mainMenu')

        return false
    })

    doCurrentDiagSequence()
})

loadScene('mainMenu')