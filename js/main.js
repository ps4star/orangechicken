const debug = true

function splashHandler(s) {
    fadeoutToScene(s)
    $(window).off('mousedown')
    $(window).off('keydown')
}

makeScene('splash1')
addCurrent(
    $(`<div class="splash-container" tabindex="-1">`)
        .append($(`<pre class="disclaimer-large">DISCLAIMER TYPE DEAL</pre>`))
        .append($(`<p class="disclaimer-medium cursive">This game is for sailing and entertainment purposes only. Any names, or persons featured here, that may seem similar to anyone in real life, are purely coincidental, or otherwise parodic.</p>`))
        .append($(`<pre class="disclaimer-medium">This game is free to play at <a target="_blank" style="cursor: pointer;" href="https://ps4star.com/orangechicken">this link</a>.<br>If you paid for this, you have been scammed.</pre>`))
        .append($(`<p class="press-key">Click or press any key to continue</p>`))
)
hook('load', function() {
    $('a').on('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); return false })
    $(window).on('mousedown keydown', () => splashHandler('mainMenu'))
})

makeScene('mainMenu')

// 0 = Chapters
// 1 = Lynns
// 2 = Achievements
let whichLynnScene = 0
addCurrent(
    $(`<div id="title-container">`)
        .append($(`<pre class="mm-title">Amberlynn's <span class="ochicken">Orange Chicken</span> Quest</pre>`))
        .append($(`<div class="mm-buttons-container">`)
            .append($(`<button class="mm-button mm-play-button">Play</button>`)

            )
            .append($(`<button class="mm-button mm-lynns-button">Lynns</button>`)

            )
            .append($(`<button class="mm-button mm-achievements-button">Achievements</button>`)

            )
            .append($(`<button class="mm-button mm-options-button">Options</button>`)

            )
        )
)
hook('load', function(oldScene) {
    // Play mm music
    if (!(oldScene === 'lynns' || oldScene === 'options')) {
        stopMusic()
        playSong(...RIZO_ISLAND_MUSIC_DT)
    }

    $('.mm-options-button').on('mousedown', function(e) {
        e.stopPropagation()
        e.stopImmediatePropagation()
        e.preventDefault()

        fadeoutToScene('options')
        return false
    })

    function toLynns(e) {
        e.stopPropagation()
        e.stopImmediatePropagation()
        e.preventDefault()

        fadeoutToScene('lynns')
        return false
    }

    $('.mm-play-button').on('mousedown', function(e) {
        whichLynnScene = 0
        toLynns(e)
    })

    $('.mm-lynns-button').on('mousedown', function(e) {
        whichLynnScene = 1
        toLynns(e)
    })

    $('.mm-achievements-button').on('mousedown', function(e) {
        whichLynnScene = 2
        toLynns(e)
    })

    // if (debug) {
    //     let listener
    //     listener = (e) => {
    //         if (e.key === 'g') {
    //             loadScene('dialog')
    //             window.removeEventListener('keydown', listener)
    //         }
    //     }
    //     window.addEventListener('keydown', listener)
    // }
})

makeScene('options')
addCurrent(
    $(`<div id="options-container" class="ochicken-bg">`)
        .append($(`<div class="options-range-container">`)
            .append($(`<pre class="options-range-text">Volume <span class="mus-volume"></span></pre>`))
            .append($(`<input type="range" class="options-range" id="volume" min="0" max="100">`))
        )
        .append($(`<button class="options-button c-red" id="wipe-save-button">Wipe Save Data</button>`))
        .append($(`<button class="back-button control-button">X</button>`))
)
hook('load', function() {
    // Back button
    $('.back-button').on('mousedown', () => { fadeoutToScene('mainMenu') })

    $('.mus-volume').text(save.volume)[0].value = save.volume
    $('#volume')[0].value = save.volume.toString()
    $('#volume').on('input', function(e) {
        save.volume = parseInt(this.value)
        $('.mus-volume').text(save.volume)

        caudio.forEach(song => {
            song.volume = MUS_MULTIPLIER * (save.volume / 100)
        })

        writeSave()
    })

    $('#wipe-save-button').on('mousedown', () => { localStorage[LS_KEY] = ""; window.location.reload() })
})

makeScene('lynns')
addCurrent(
    $(`<div id="lynns-container" class="ochicken-bg">`)
        .append($(`<pre id="lynns-amount-header"></pre>`))
        .append($(`<div id="lynns-main">`))
        .append($(`<div id="lynns-controls">`)
            .append($(`<button id="lynn-page-previous" class="lynn-page-control control-button">&lt;</button>`))
            .append($(`<pre id="lynn-page-text"></pre>`))
            .append($(`<button id="lynn-page-next" class="lynn-page-control control-button">&gt;</button>`))
        )
        .append($(`<button class="back-button control-button">X</button>`))
)

const PAGE_CUT = 9

// Returns a fake save file used for static chapters (from lynns screen)
function fabricateStaticChapterSave(_save, chapterNumber) {
    let finalSave = {..._save}
    finalSave.chapter = chapterNumber
    return finalSave
}

hook('load', function() {
    // Back button
    $('.back-button').on('mousedown', () => { fadeoutToScene('mainMenu') })

    let numPages, haveItems, itemText, numItems, itemList, placeholderImage, dict
    if (whichLynnScene === 0) {
        dict = CHAPTERS
        numItems = NUM_CHAPTERS
        itemList = save.chapters
        itemText = "Chapters"
        placeholderImage = "assets/missing_chapter.png"
    } else if (whichLynnScene === 1) {
        dict = LYNNS
        numItems = NUM_LYNNS
        itemList = save.lynns
        itemText = "Lynns"
        placeholderImage = "assets/actors/amberlynn_shadow.png"
    } else if (whichLynnScene === 2) {
        dict = ACHIEVEMENTS
        numItems = NUM_ACHIEVEMENTS
        itemList = save.achievements
        itemText = "Achievements"
        placeholderImage = "assets/missing_chapter.png"
    }

    haveItems = itemList.reduce((prev, current) => prev + Number(current) )
    numPages = Math.ceil(numItems / (PAGE_CUT * 2))

    let cpage = 0

    // load up header
    $('#lynns-amount-header').text(`${haveItems} / ${numItems} ${itemText} Unlocked`)

    // load up legit lynns
    const $lynnMain = $('#lynns-main')
    $lynnMain.empty()
    let i = 0
    let $page, $subpage

    for (; i < numItems; i++) {
        const isLast = (i === numItems - 1)
        if (i === 0) {
            $page = $(`<div class="lynns-page">`)
            $subpage = $(`<div class="lynns-subpage left">`)
        } else if (i % PAGE_CUT === 0 || isLast) {
            // 2nd condition triggers if we're actually working on left page
            if (i % (PAGE_CUT * 2) === 0 || (isLast && !(i % (PAGE_CUT * 2) >= PAGE_CUT))) {
                // Full sep
                $page.append($subpage)
                $page.hide()
                $lynnMain.append($page)

                if (!isLast) {
                    $page = $(`<div class="lynns-page">`)
                    $subpage = $(`<div class="lynns-subpage left">`)
                }
            } else {
                // Right page
                $page.append($subpage)
                if (!isLast)
                    $subpage = $(`<div class="lynns-subpage right">`)

                if (isLast) {
                    $page.hide()
                    $lynnMain.append($page)
                }
            }
        }

        let url, name
        if (i >= dict.length || !itemList[i]) {
            url = placeholderImage
            name = "???"
        } else {
            url = dict[i][1]
            name = dict[i][0]
        }

        const $legitLynn = $(`<div class="lynn">`)
            .append($(`<pre class="lynn-dot"></pre>`))
            .append($(`<img class="lynn-img ${itemList[i] ? "" : "locked"}" alt="" src="${url}">`))
            .append($(`<p class="lynn-text">${name}</p>`))

        // On chapter scene, make elements clickable if unlocked
        if (whichLynnScene === 0 && itemList[i]) {
            $legitLynn[0].chapterIndex = i + 1

            // For chapters, do click events
            $legitLynn.addClass('clickable')
            $legitLynn.on('mousedown', () => {
                save.chapter = $legitLynn[0].chapterIndex
                fadeoutToScene('dialog')
            })
        }

        $subpage.append($legitLynn)
    }

    let animHappening = false

    function slide(oldPage, newPage) {
        animHappening = true

        const $pageDOM = $('.lynns-page')
        const $oldPage = $($pageDOM[oldPage])
        const $newPage = $($pageDOM[newPage])
        if (oldPage === newPage) {
            // Only un-hides
            $oldPage.show()
            $oldPage.addClass('anim')
            $oldPage[0].onanimationend = () => {
                $oldPage[0].onanimationend = null
                $oldPage.removeClass('anim')

                animHappening = false
            }
        } else {
            let oldClass, newClass
            if (newPage > oldPage) {
                // Right
                oldClass = 'anim-left'
                newClass = 'anim'
            } else {
                oldClass = 'anim-reverse'
                newClass = 'anim-left-reverse'
            }

            $oldPage.addClass(oldClass)
            $oldPage[0].onanimationend = () => {
                $oldPage[0].onanimationend = null
                $oldPage.hide()
                $oldPage.removeClass('anim-left').removeClass('anim').removeClass('anim-left-reverse').removeClass('anim-reverse')

                $newPage.show()
                $newPage.addClass(newClass)
                $newPage[0].onanimationend = () => {
                    $newPage[0].onanimationend = null
                    $newPage.removeClass('anim-left').removeClass('anim').removeClass('anim-left-reverse').removeClass('anim-reverse')

                    animHappening = false
                }
            }
        }

        // Update text
        const lynnpage = document.getElementById('lynn-page-text')
        lynnpage.innerText = `${(cpage + 1).toString()} / ${numPages.toString()}`
    }

    $('#lynn-page-previous').on('mousedown', function(e) {
        // Go back
        if ((cpage > 0) && !animHappening) {
            let old = cpage
            cpage--

            slide(old, cpage)
        }
    })

    $('#lynn-page-next').on('mousedown', function(e) {
        // Go forwards
        if ((cpage < numPages - 1) && !animHappening) {
            let old = cpage
            cpage++

            slide(old, cpage)
        }
    })

    $('#lynn-page-text').text(`${cpage + 1} / ${numPages}`)

    slide(cpage, cpage)
})

makeScene('chapter')

addCurrent(
    $(`<div id="chapter-container" class="ochicken-bg">`)
        .append($(`<pre id="ch-text">`))
        .append($(`<pre id="ch-name">`))
)

hook('load', async function() {
    setTimeout(() => $('#ch-text').addClass('grow-border'), 100)
    $('#ch-text').text(`Chapter ${save.chapter.toString()}`)
    $('#ch-name').text(CHAPTERS[save.chapter - 1][0])

    await new Promise((resolve, reject) => {
        setTimeout(resolve, 3250)
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
        .append($(`<div id="diag-container" class="panel">`)
            .append($(`<div id="diag-name" class="panel">`))
            .append($(`<div id="diag">`)
                .append($(`<pre id="diag-text">`))
            )
            .append($(`<div id="diag-options">`)
                .append($(`<button id="diag-quit" class="diag-button">Quit</button>`)

                )
            )
        )
        .append($(`<div id="multi-box" class="panel">`))
        .append($(`<div id="lynn-pop" class="panel">`)
            .append($(`<pre class="lynn-pop-text"></pre>`))
        )
        .append($(`<div id="saveens" class="panel">`)
            .append($(`<pre id="saveens-text"><span class="saveens-dollar">$</span><span class="saveens-amount"></span></pre>`))
        )
        .append($(`<div class="canvas-container">`)
            .append($(`<canvas class="mg-canvas" width="160" height="90" tabindex="-1">`))
            .append($(`<div class="gg-image">`))
        )
)
hook('unload', function() {
    clearDiagDOM()
})

function diagLeaveen(e) {
    if (e) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
    }

    // stopMusic()
    clearDiagState()
    fadeoutToScene('mainMenu')

    return false
}
hook('load', function() {
    $('#diag-quit').on('mousedown', diagLeaveen)
    clearDiagDOM()

    doCurrentDiagSequence()
})

loadScene('splash1')