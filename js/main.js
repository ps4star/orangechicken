var $ = window.$ || window.jQuery

const debug = true

const MM_ASSETS_LIST = [
    "assets/titlescreen.jpg",
    "css/HelveCursive.ttf",
    "assets/music/cf.ogg",
]

const SPLASH_ASSETS_LIST = MM_ASSETS_LIST

const DIAG_ASSETS_LISTS = [
    [ //    "Ch 0" - composites these into other chapter loads
    //      i.e. these assets are the most universally-used
        "assets/actors/amberlynn.png",
        "assets/actors/becky.png",

        "assets/gamegorl.png",

        // "assets/music/alrtheme.ogg",
        // "assets/music/cald.ogg",
        // "assets/music/cf.ogg",

        "assets/menupointer.png",
        "assets/money.png",
        "assets/orangechicken.png",
    ],

    [ // Ch 1
        "assets/music/cf.ogg",
        "assets/sfx/leaveen.aac",

        "assets/scenes/cf.png",

        "assets/actors/amberlynn_bored.png",
        "assets/actors/amberlynn_leaveen.png",
        "assets/actors/amberlynn_pissed.png",
        "assets/actors/amberlynn_cacklelynn.png",
        "assets/actors/cfwaitress.png",
    ],

    [ // Ch 2
        "assets/music/alrtheme.ogg",

        "assets/actors/piggybank.png",

        "assets/actors/amberlynn_gasp.png",
        "assets/actors/amberlynn_laser.png",
        "assets/actors/amberlynn_shocked.png",
        "assets/actors/amberlynn_bored.png",
        "assets/actors/amberlynn_pissed.png",
    ],

    [ // Ch 3
        "assets/music/cf.ogg",

        "assets/torrid.png",

        "assets/actors/amberlynn_wifeycowprint.png",
        "assets/actors/amberlynn_confused.png",
        "assets/actors/amberlynn_heyguys.png",
        "assets/actors/amberlynn_leaveen.png",
        "assets/actors/amberlynn_pissed.png",
        "assets/actors/amberlynn_backwards.png",
    ],

    [ // Ch 4
        "assets/music/alrtheme.ogg",

        "assets/actors/amberlynn_mook-bong.png",
        "assets/chicken1.png",
        "assets/chicken2.png",
    ],

    [ // Ch 5
        "assets/music/cald.ogg",

        "assets/actors/amberlynn_heyguys.png",
        "assets/actors/amberlynn_books.png",
        "assets/actors/becky_useless.png",

        // Readerlynn assets
        "assets/readerlynn/benotfar.jpg",
        "assets/readerlynn/falleen_toewurd.jpg",
        "assets/readerlynn/farfromthetree.jpg",
        "assets/readerlynn/loneliest.jpg",
        "assets/readerlynn/lucid.jpg",
        "assets/readerlynn/ontheisland.jpg",
        "assets/readerlynn/species.jpg",
        "assets/readerlynn/tripleshotbettys.jpg",
        "assets/readerlynn/weightloss1.jpg",
        "assets/readerlynn/weightloss2.jpg",
        "assets/readerlynn/weightloss3.jpg",
        "assets/readerlynn/weightloss4.jpg",
        "assets/readerlynn/weightloss5.jpg",
        "assets/readerlynn/weightloss6.jpg",
        "assets/readerlynn/weightloss7.jpg",
    ],

    [ // Ch 6

    ],

    [ // Ch 7

    ],

    [ // Ch 8

    ],

    [ // Ch 9

    ],

    [ // Ch 10

    ],

    [ // Ch 11

    ],

    [ // Ch 12

    ],

    [ // Ch 13

    ],

    [ // Ch 14

    ],

    [ // Ch 15

    ],

    [ // Ch 16

    ],

    [ // Ch 17

    ],
]

// MG DOM
const $mgDOM = $(`<div>`)
    .append($(`<div class="canvas-container" id="mookbong-canvas-container">`)
        .append($(`<canvas class="mg-canvas" id="mookbong-canvas" width="320" height="180" tabindex="-1">`))
        .append($(`<div class="mg-image gg">`))
    )
    .append($(`<div class="canvas-container" id="books-canvas-container">`)
        .append($(`<canvas class="mg-canvas" id="books-canvas" width="960" height="600">`))
        .append($(`<div class="mg-image">`))
    )
    .append($(`<div class="canvas-container" id="phone-canvas-container">`)
        .append($(`<div class="mg-canvas" id="phone-canvas">`))
        .append($(`<button class="phone-ok-button">OK</button>`))
    )
    .append($(`<div class="dom-counter-container">`)
        .append($(`<div id="saveens" class="panel">`)
            .append($(`<pre id="saveens-text"><span class="saveens-dollar">$</span><span class="saveens-amount"></span></pre>`))
        )
        .append($(`<div id="calories" class="panel dom-counter">`)
            .append($(`<pre id="calories-text"><span class="calories-amount">0</span><span class="calories-calories-text"> Calories</span>`))
        )
    )

const LYNNS_ASSETS_LIST = [
    "assets/journalynn.png",
    "assets/actors/amberlynn_shadow.png",
    // "assets/actors/amberlynn_leaveen.png",
    // "assets/actors/amberlynn_angry.png",
]

function splashHandler(s) {
    fadeoutToScene(s)
    $(window).off('mousedown')
    $(window).off('keydown')
}

function nullifyEvent(e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    return false
}

// UNUSED; rel="prefetch" is the successor
async function bufferAssets(list) {
    if (!list) return Promise.resolve()
    // return Promise.resolve()
    for (const item of list) {
        await new Promise((resolve, reject) => {
            $('#lt2').text(`${item}`)

            let img, loadedEvent
            if (item.endsWith('.png') || item.endsWith('.jpg') || item.endsWith('.bmp')) {
                img = new Image()
                loadedEvent = 'onload'
            } else if (item.endsWith('.ogg') || item.endsWith('.mp3')) {
                img = new Audio()
                loadedEvent = 'oncanplaythrough'
            } else if (item.endsWith('.ttf') || item.endsWith('.woff')) {
                fetch(item).then(resolve)
                loadedEvent = null
            } else {
                resolve()
                return
            }

            if (loadedEvent !== null) {
                img.src = item
                img[loadedEvent] = resolve
                // console.log('iter ' + item)
            }
        })
    }
}

hookGlobal('load', function() {
    $('img').on('dragstart', (e) => nullifyEvent(e))
})

makeScene('splash1')
hook('before', async function() {
    await bufferAssets( SPLASH_ASSETS_LIST )
})
addCurrent(
    $(`<div class="splash-container" tabindex="-1">`)
        .append($(`<pre class="disclaimer-large">DISCLAIMER TYPE DEAL</pre>`))
        .append($(`<p class="disclaimer-medium cursive">This game is for sailing and entertainment purposes only. Any names, or persons featured here, that may seem similar to anyone in real life, are purely coincidental, or otherwise parodic.</p>`))
        .append($(`<pre class="disclaimer-medium">This game is free to play at <a target="_blank" style="cursor: pointer;" href="https://ps4star.com/orangechicken">this link</a>.<br>If you paid for this, you have been scammed.</pre>`))
        .append($(`<pre class="disclaimer-small">@ps4star
GNU GPL v2.0</pre>`))
        .append($(`<p class="press-key">Click anywhere to continue</p>`))
)
hook('load', function() {
    save.nextScene = null
    
    $('a').on('mousedown', (e) => { e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); return false })
    $(window).on('mousedown', () => splashHandler('mainMenu'))
})

makeScene('mainMenu')

hook('before', async function() {
    await bufferAssets( MM_ASSETS_LIST )
})

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
            .append($(`<button class="mm-button mm-options-button">Options</button>`)

            )
            .append($(`<button class="mm-button mm-lynns-button">Lynns</button>`)

            )
            .append($(`<button class="mm-button mm-achievements-button">Achievements</button>`)

            )
            .append($(`<button class="mm-button mm-arcade-button">Becky's Arcade</button>`)

            )
        )
)
hook('load', function(oldScene) {
    // Play mm music
    if (!(oldScene === 'lynns' || oldScene === 'options')) {
        stopMusic()
        playSong(RIZO_ISLAND_MUSIC_DT)
    }

    if (save.hasUnlockedArcade) {
        $('.mm-arcade-button').addClass('visible')
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

    $('.mm-arcade-button').on('mousedown', function(e) {
        whichLynnScene = 3
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

    $('#wipe-save-button').on('mousedown', () => { window.localStorage[LS_KEY] = ""; window.location.reload() })
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

hook('before', async function() {
    await bufferAssets( LYNNS_ASSETS_LIST )
})

const PAGE_CUT = 9

// Returns a fake save file used for static chapters (from lynns screen)
function fabricateStaticChapterSave(_save, chapterNumber) {
    let finalSave = {..._save}
    finalSave.chapter = chapterNumber
    return finalSave
}

let nextArcade = null
hook('load', function() {
    // Back button
    $('.back-button').on('mousedown', () => { fadeoutToScene('mainMenu') })

    let numPages, haveItems, itemText, numItems, itemList, placeholderImage, dict
    if (whichLynnScene === 0) {
        dict = CHAPTERS
        numItems = NUM_CHAPTERS
        itemList = save.chapters
        itemText = "Hootenberries"
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
    } else if (whichLynnScene === 3) {
        dict = ARCADE_GAMES
        numItems = NUM_ARCADE_GAMES
        itemList = save.arcades
        itemText = "Arcade Games"
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
    
    function ensureLynnItems(pageNumber) {
        while (Array.from($lynnMain[0].children).length <= Math.floor(pageNumber / 2)) {
            $lynnMain.append(
                $(`<div class="lynns-page">`)
                    .append($(`<div class="lynns-subpage left">`))
                    .append($(`<div class="lynns-subpage right">`))
            )
        }

        $('.lynns-page').hide()
    }

    function findLynnSubpage(itemNumber) {
        const pageNumber = Math.floor(itemNumber / PAGE_CUT)
        return $($('.lynns-subpage')[pageNumber])
    }

    for (; i < numItems; i++) {
        ensureLynnItems(Math.floor(i / PAGE_CUT))
        // const isLast = (i === numItems - 1)
        // if (i === 0) {
        //     $page = $(`<div class="lynns-page">`)
        //     $subpage = $(`<div class="lynns-subpage left">`)
        // } else if (i % PAGE_CUT === 0) {
        //     // 2nd condition triggers if we're actually working on left page
        //     if (i % (PAGE_CUT * 2) === 0) {
        //         // Full sep
        //         $page.append($subpage)
        //         $page.hide()
        //         $lynnMain.append($page)

        //         // if (!isLast) {
        //         $page = $(`<div class="lynns-page">`)
        //         $subpage = $(`<div class="lynns-subpage left">`)
        //         // }
        //     } else {
        //         // Right page
        //         $page.append($subpage)
        //         // if (!isLast) {
        //         $subpage = $(`<div class="lynns-subpage right">`)
        //         // }

        //         // if (isLast) {
        //         //     $page.hide()
        //         //     $lynnMain.append($page)
        //         // }
        //     }
        // }

        const $subpage = findLynnSubpage(i)

        let url, name
        if (i >= dict.length || !itemList[i]) {
            url = placeholderImage
            name = "???"
        } else {
            url = dict[i][1]
            name = dict[i][0]
        }

        const otherDt = dict[i][2] || {}

        const rotDeg = i % 2 === 0 ? 1 : -1// Math.random() < 0.5 ? 1 : -1
        const $legitLynn = $(`<div class="lynn" style="transform: rotateZ(${rotDeg}deg);">`)
            .append($(`<pre class="lynn-dot"></pre>`))
            .append($(`<img class="lynn-img ${itemList[i] ? "" : "locked"}" alt="" src="${url}">`))
            .append($(`<p class="lynn-text" style="${otherDt.color ? otherDt.color : ""}">${name}</p>`))

        // On chapter scene, make elements clickable if unlocked
        if ((whichLynnScene === 0 || whichLynnScene === 3) && itemList[i]) {
            $legitLynn[0].chapterIndex = i + 1

            // For chapters, do click events
            $legitLynn.addClass('clickable')
            $legitLynn.on('mousedown', async () => {
                if (whichLynnScene === 0) {
                    save.chapter = $legitLynn[0].chapterIndex
                    fadeoutToScene('dialog')
                } else {
                    // Goto arcade game
                    nextArcade = $legitLynn[0].chapterIndex - 1
                    fadeoutToScene('arcade-gameplay')
                }
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

// Chapter scene is deprecated
// (may be brought back though some mitigating mechanics ought to be used to make it less annoying/not appear every time)
// makeScene('chapter')

// addCurrent(
//     $(`<div id="chapter-container" class="ochicken-bg">`)
//         .append($(`<pre id="ch-text">`))
//         .append($(`<pre id="ch-name">`))
// )

// hook('load', async function() {
//     setTimeout(() => $('#ch-text').addClass('grow-border'), 100)
//     $('#ch-text').text(`Chapter ${save.chapter.toString()}`)
//     $('#ch-name').text(CHAPTERS[save.chapter - 1][0])

//     await new Promise((resolve, reject) => {
//         setTimeout(resolve, 3250)
//     })

//     fadeoutToScene('dialog')
// })
// hook('unload', function () {
//     $('#ch-text').removeClass('grow-border')
// })

makeScene('arcade-gameplay')
addCurrent(
    $mgDOM.clone(true, true)
)

hook('load', async function() {
    // const children = Array.from($mgDOM[0].children)
    // children.forEach(ch => {
    //     $mgDOM[0].parentElement.appendChild(ch)
    // })
    // $mgDOM.remove()

    const thisArc = ARCADE_GAMES[nextArcade]

    // Load up game
    if (thisArc[2].mgFunc) {
        updateSaveens()
        await window[thisArc[2].mgFunc].apply({  }, thisArc[2].mgArgs || [])
        fadeoutToScene('mainMenu')
    }
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
                .append($(`<button id="diag-quit" class="diag-button">Quit</button>`))
            )
        )
        .append($(`<div id="multi-box" class="panel">`))
        .append($(`<div id="lynn-pop-container">`)

        )
        .append(...$mgDOM.children().clone(true, true))
)

hook('before', async function() {
    await bufferAssets( DIAG_ASSETS_LISTS[0] )
    await bufferAssets( DIAG_ASSETS_LISTS[save.chapter] )
})

hook('unload', function() {
    clearDiagDOM()
})

function diagLeaveen(e) {
    save.nextScene = null

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

if (debug) {
    try {
        save.chapters = save.chapters.map(el => true)
        save.lynns = save.lynns.map(el => true)
        save.arcades = save.arcades.map(el => true)
        save.hasSaveensJar = true
        save.hasUnlockedArcade = true
        writeSave()
    } catch(e) {
        save = DEFAULT_SAVE
        window.location.reload()
    }
}

loadScene('splash1')