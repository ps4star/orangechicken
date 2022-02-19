makeScene('mainMenu')

addCurrent(
    $(`<pre class="mm-title">Amberlynn's <span class="ochicken">Orange Chicken</span> Quest</pre>`)
)
addCurrent(
    $(`<div class="mm-buttons-container">`)
        .append($(`<button class="mm-button mm-play-button">Play</button>`)
            .on('mousedown', function(e) {
                e.stopPropagation()
                e.stopImmediatePropagation()
                e.preventDefault()

                fadeoutToScene('chapter')
                return false
            })
        )
        .append($(`<button class="mm-button mm-options-button">Options</button>`))
        .append($(`<button class="mm-button mm-lynns-button">Lynns</button>`))
)

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
        setTimeout(resolve, 4000)
    })

    fadeoutToScene('dialog')
})
hook('unload', function () {
    $('#ch-text').removeClass('grow-border')
})

makeScene('dialog')

addCurrent(
    $(`<div class="dialog-scene">`)
        .append($(`<div id="actors">`))
        .append($(`<div id="diag-container">`)
            .append($(`<div id="diag-name">`))
            .append($(`<div id="diag">`)
                .append($(`<pre id="diag-text">`))
            )
        )
        .append($(`<div id="multi-box">`))
)

hook('load', function() {
    doCurrentDiagSequence()
})

loadScene('mainMenu')