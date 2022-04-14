//js/diagStore.js
const RIZO_ISLAND_MUSIC_DT = ["assets/music/cf.ogg", true, 0, 1.65, 166.08]
const CALD_MUSIC_DT = ["assets/music/cald.ogg", true, 0, 1.5, 93.3]
const ALRTHEME_MUSIC_DT = ["assets/music/alrtheme.ogg", true, 0, 0, 93]

const ACTORS = {
    "Amberlynn": "assets/actors/amberlynn.png",
    "Becky": "assets/actors/becky.png",
    "C.F. Waitress": "assets/actors/cfwaitress.png",
    "Piggybank": "assets/actors/piggybank.png",
}

const ALL_DIAGS = {
    // Chapter 1
    "shortage": {
        bg: "cf.png",
        // [ ["assets/music/original_cf.ogg", true, 0, 1.65, 166.32] ] for cf.mp3 (rizo island)
        music: [ RIZO_ISLAND_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"], ["left_front", "Becky"], ["hflip", "right_front", "C.F. Waitress"] ],
        diag: `
; "chapter" isn't flavor text, it's an actual command
; tells the parser which chapter this scene is in and unlocks the chapter in the save file
chapter 1
enter 0
enter 1
pose 0 bored
lynn bored
talk - (Amberlynn & Becky are waiting at a table in Cheesecake Factory)
talk - ... ... ...
talk - (Becky pulls out her phone and starts recording)
talk 1 "Amberlynn in her natural habitat...... CHEESECAKE FACTORY"
pose 0 pissed
lynn angry
talk 0 "Is that a fat joke? Are you calling me BIG?"
talk 1 "Babe calm down it's just that we're here a lot."
talk 0 "BIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIG???"
talk - (Amberlynn bangs the table with her fist)
talk 1 "Amber you're not big, ok? You're makin a scene."
pose 0 cacklelynn
lynn cackle
sfx assets/sfx/cackle.ogg 0.5
talk - (Amber starts cackling like the whole thing was a joke)
pose 0 normal
talk 0 "Baby I knooww, I'm just kiddeen."
talk - (Becky awkwardly laughs)
enter 2
talk 0 "Finally the waiter is heeere, I'm getting so hongry..."
talk 0 "Hi, how are you guys doing today?"
talk - (Amberlynn lies about how she's doeen)
talk 0 "I'm fine."
talk 0 (Hmm... asked me how I'm doeen, lied and said I'm fine. I should write a poem about this.)
talk 1 "I'm doing pretty good."
talk 2 "So, what will you guys be having today?"
talk 0 "I'll get 4 orders of the Orange Chicken..."
talk 2 "I'm sorry, we ran out of that yesterday. Something about a national shortage."
lynn angry
pose 0 pissed
talk 0 "But you always have it here! We drove 2 hourssss!"
talk 1 "Babe calm down, we can just go by Panda Express on the way back."
sfx assets/sfx/orangechickenlikeido.ogg
talk 0 "But I don't like Panda Express Beckyyy it's all like not authentic-ey."
talk 2 "From what I heard I don't think anywhere has it right now."
talk 2 "Your best bet would just be to make some at home."
talk 0 "But I don't know any cookeeen recipes for Orange Chicken!"
talk 2 *shrugs*
talk 1 "Look babe we can just look up some recipes online."
talk 0 "Ughhhhhhhh I'm literally dyeeeeen right nooooww."
talk 0 "Even if we do find a recipe it won't taste as good as theiirss."
talk 2 "Um, well, is there anything else I can get you guys?"

multi
Stay and let Becky eat
shortage_stay
Leave immediately
shortage_leave
`,
    },

    "shortage_stay": {
        inherits: "shortage",
        diag: `
affectionchange %AFFCHANGE_INDEX% Becky 5
pose 0 bored
talk 0 "Ughh okayyy fine."
talk - (waitress takes Amber & Becky's orders)
leave 2
talk 1 "Look, I found this Orange Chicken recipe on Facebook."
pose 0 frowny
lynn frowny
talk - (Amber doesn't pay attention and stays quiet, still pissed, with a frown on her face)
talk 1 "See, it looks just like the Orange Chicken they have here."
pose 0 pissed
talk 0 "But it's not the saaaaaame!"
talk 0 "Becky, you don't get it. I like, HAVE to have Orange Chicken, kay?"
enter 2
talk 2 "Alright ma'am here's your order."
talk 1 "Thanks..."
leave 2
talk 0 "Becky, I've had enough of this. Take your food, we're goeen home right now."
incvisit
gotofadenewchapter 2
`,
    },

    "shortage_leave": {
        inherits: "shortage",
        diag: `
setglobal hasSeenLeaveenLynn 1
lynn leaveen
pose 0 leaveen
sfx assets/sfx/leaveen.aac
affectionchange %AFFCHANGE_INDEX% Becky -5
talk 0 "I'm leaaveeeeeeeen."
incvisit
gotofadenewchapter 2
`,
    },

    // Chapter 2
    "craygslist": {
        bg: "pillowmountain.png",
        music: [ ALRTHEME_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"], ["left_front", "Piggybank"], ["hflip", "right_front", "Becky"] ],
        diag: `
chapter 2
enter 0
enter 2
pose 0 bored
talk 0 "Becky, I can't do this. I can't live without Cheesecake Factory's Orange Chicken."
talk 2 "Babe, like I said you can just look up a recipe online. Why is it such a big deal?"
talk 0 "I knoowww but then it won't taste like Cheesecake Factory'sss."
talk 2 "I dunno then. Just try looking it up."
talk 0 "Ughh I doubt it'll be there but I'll checkk."
talk 0 ... ... ...
lynn gasp
pose 0 gasp
talk 0 "Oh muh gah, I think I found sometheen!"
talk 2 "What is it?"
talk 0 "I went on Craygslist and there's apparently this super smart chef guy who can re-create the recipe!"
talk 0 "Let's see how much he wants for it..."
pose 0 shocked
talk 0 "FIVE THOUSAND?"
talk 2 "Babe you know we can't afford that."
talk 0 "I don't care Beckyyy we have to hire him."
talk 2 "We don't even have five thousand NOW, how are we gonna get the money?"
pose 0 normal
talk 0 "I know how. I just have to really get serious about vlogeen."
talk 0 "If I put out highly-requested videos then I'll get more money from YouTube."
talk 0 "Here I'll akshually go get a saveens jar for it."
call unlockSaveens
gotofade craygslist_after
`,
    },

    "craygslist_after": {
        inherits: "craygslist",
        diag: `
enter 1
talk 0 "Ooh what's this? I found it when I was looking for my saveens jar."
talk 2 "That's my piggy bank babe."
talk 0 "But Beckeee why didn't you tell me you had this???"
talk 0 "I lidurally just said I need a bunch of money for the chef guy situation and you didn't even mention it?"
multi
Show basic human respect and give back her piggy bank
craygslist_after_respect
"You didn't ask if I needed money booboo"
craygslist_after_booboo
`,
    },

    "craygslist_after_respect": {
        inherits: "craygslist",
        diag: `
talk 0 "Ok fine Beckeee."
leave 1
talk - (Amberlynn gives becky the piggy bank)
affectionchange %AFFCHANGE_INDEX% Becky 15
talk 2 "Thanks..."
talk 2 "That was pretty mature of you Amber."
talk 2 "Here, I'll give you some money for the recipe thang."
randint niceMoney 10 35
moneychange %MONEYCHANGE_INDEX% niceMoney
talk - (Becky hands Amber some money out of the piggy bank)
talk 0 "Aww thanks Beckeeee."
goto craygslist_postbooboo
`
    },

    "craygslist_after_booboo": {
        inherits: "craygslist",
        diag: `
talk 0 "You didn't ask if I needed any money booboooo..."
sfx assets/sfx/break.ogg 1.2
leave 1
talk - (Amberlynn breaks the piggy bank)
randint pigMoney 15 99
moneychange %MONEYCHANGE_INDEX% pigMoney
talk 0 "Oooh that's a lot of money."
goto craygslist_postbooboo
`
    },

    "craygslist_postbooboo": {
        inherits: "craygslist",
        diag: `
talk 0 "Anyway, now I need to just block the haydurs and take down these reaction channels that are stealeen my views, that'll help."
talk 2 "What kind of content would get people to watch?"
talk 0 "Hmm let me scroll through the comments real quick..."
talk 0 ... ... ...
talk 0 "Okayyy sooo I saw about 40 comments and 1 person said they wanted another torrid haul. Seems like it's very highly-requested."
talk 0 "Come on Beckeeee we have to go to Torrid."
talk 2 "Babe I wanna finish this episode of SpongeBob first. Plus we already drove 4 hours today. Let's just take a break for today."
multi
Force Becky to drive to Torrid
craygslist_gonow
Do a mook-bong instead
craygslist_mookbong
`,
    },

    "craygslist_gonow": {
        inherits: "craygslist",
        diag: `
pose 0 laser
shakestart 0
talk 0 "BECKY GET IN THE CAR NOW WE'RE GOING TO TORRID"
shakeend 0
incvisit
gotofadenewchapter 3
`,
    },

    "craygslist_mookbong": {
        inherits: "craygslist",
        diag: `
talk 0 "Ugh fine I'll just do a mook-bong then."
incvisit
gotofadenewchapter 4
`,
    },

    // Chapter 3
    "torrid": {
        bg: "torrid.jpg",
        music: [ RIZO_ISLAND_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"], ["hflip", "right_back", "Becky"] ],
        diag: `
chapter 3
enter 0
enter 1
pose 0 heyguys
talk 0 "Hey guuuuys so me and Becky just got here at Torrid."
talk 0 "And ohmuhgod you guys there are so many cute dresses."
pose 0 normal
talk 0 "Come on Beckeee let's look at some dresses."

if notfirstvisit
lynn confused
pose 0 confused
talk 0 "Oh wait, haven't we already bought dresses here before?"
talk 1 "Yeah I think so."
talk 0 "Yah let's head over to the bookstore."
goto torrid_gotochapter5
endif

talk 0 "Okay so this one just says 'Floral Dress.'"
talk 0 "Ooh look it has these strings that go over the front, I wanna try it on."
talk - (Amberlynn puts on the dress)
pose 0 backwards
lynn backwards
talk 0 "You guys it has this like chest piece, but it's too tight for my likeeng."
talk 0 "I like their other dresses it's honestly just like the material of it."
talk 0 "Ooh but the price tag says it's only 20 dollars."
talk 0 "I guess they're doing a clearance type deal."
pose 0 normal
talk 0 "Ok let's look at some other ones."
pose 0 wifeycowprint
talk 0 "Ooh I like this one, we got a cow print moment."
talk 0 "Wait wuuuut there's like this piece of paper in here."
talk - (Amberlynn pulls the paper out from the inside of the cow-print dress.)
talk 0 "It says 'hello future wifey' and it has someone's instagram handle?? Whaatt???"
talk 0 "Wow that's so weird you guys."
talk 0 "Becky what do you think this means?"
talk 1 "I dunno babe, I guess it's an inside joke."
talk 0 "Yah probably."
pose 0 normal
talk 0 "Ok we're gonna be leaveen soon but there's one more dress I saw that I wanna try."
talk - (Amberlynn picks up a kimono off the rack)
talk 0 "So this is aaaa.... kuh- kuh-mee-no?"
talk - (Amberlynn reids the tag on the dress; it clearly says 'Kimono')
talk 0 "Yeah it's pronounced kameeno."
talk 0 "I don't really have time to try this one on. Which one should I get Becky?"
multi
Floral Dress ($20)
torrid_postdress
Cow-print Dress that definitely isn't part of a feeder fetish ($50)
torrid_postdress
Kameeno ($90)
torrid_postdress
`,
    },

    "torrid_gotochapter5": {
        inherits: "torrid",
        diag: `
gotofadenewchapter 5
`,
    },

    "torrid_postdress": {
        inherits: "torrid",
        diag: `
incvisit
; this is necessary to create the var in inlineVarDict
; there is no "empty" declaration command, only decl+assign
setvar moneyDressCost 0
setvar affectionChange 0

if eq lastChoice 0
pushinv %INVCHANGE_INDEX% Floral Dress
setvar moneyDressCost 20
setvar affectionChange -5
endif

if eq lastChoice 1
pushinv %INVCHANGE_INDEX% Mwav Dress
setvar moneyDressCost 50
setvar affectionChange -10
endif

; affectionChange scales with dress price lol
if eq lastChoice 2
pushinv %INVCHANGE_INDEX% Kameeno
setvar moneyDressCost 90
setvar affectionChange -15
endif

; this implies moneyDressCost was never caught by any if statements, which shouldn't happen
; error takes any number of arguments and simply prints inlineVarDict but emphasizes the variables given as args
if eq moneyDressCost 0
error moneyDressCost
endif

; i know copyvarnegative is dumb but i don't want to make a proper expr parser...
copyvarnegative negativeMoneyDressCost moneyDressCost
if gteq money moneyDressCost
moneychange %MONEYCHANGE_INDEX% negativeMoneyDressCost
talk 0 "Yess this will be perfect for my Torrid haul video."
goto torrid_keepgoingdecision
endif

; the goto is necessary because ifblock + multi causes some issues with parsing
; (it thinks "endif" is an option with a blank scene target)
if lt money moneyDressCost
pose 0 pissed
talk 0 "Oh noooooouhh I can't afford itt."
goto torrid_cantafford
endif
`,
    },

    "torrid_cantafford": {
        inherits: "torrid",
        diag: `
multi
Force Becky to pay
torrid_cantafford_beckypays
Don't buy it
torrid_cantafford_dontbuy
`
    },

    "torrid_cantafford_beckypays": {
        inherits: "torrid",
        diag: `
pose 0 normal
talk 0 "Beckeeee can you pay for this?"
talk 1 *sigh*

; Becky pays for the dress
affectionchange %AFFCHANGE_INDEX% Becky affectionChange
talk - (Becky pays)
talk 0 "Thanks Beckeeeeeee."
goto torrid_keepgoingdecision
`
    },

    "torrid_cantafford_dontbuy": {
        inherits: "torrid",
        diag: `
talk 0 "Ughhhh fine I guess I won't get it."
pose 0 normal
goto torrid_keepgoingdecision
`
    },

    "torrid_keepgoingdecision": {
        inherits: "torrid",
        diag: `
talk 0 "Hmm you know, this mall is actually kind of like, full of space-ey."
talk 0 "It makes me like, want to do some more shoppeen."
talk 0 "Beckeee what do you think, should we keep shoppeen or go holme?"
multi
Shop
torrid_keepshoppeen
Leave
torrid_leaveen
`,
    },

    "torrid_keepshoppeen": {
        inherits: "torrid",
        diag: `
talk 0 "YASSS 2 hauls in 1 day."
talk 0 "Come on Beckee let's go to the bookstore."
incvisit
gotofadenewchapter 5
`
    },

    "torrid_leaveen": {
        inherits: "torrid",
        diag: `
lynn leaveen
pose 0 leaveen
sfx assets/sfx/leaveen.aac
talk 0 "I'm leaaveeeeeeeen."

if eq hasSeenLeaveenLynn 1
talk 1 "Amber..."
talk 0 "Yes?"
talk 1 "Do you always have to do that when you're leavin' somewhere?"
sfx assets/sfx/leaveen.aac
talk 0 "Yah because I'm liduralllly LEAVEEEEEEEEN right nowwwuh."
endif

incvisit
gotofadenewchapter 6
`,
    },

    // Chapter 4
    "rotisserie": {
        bg: "pillowmountain.png",
        music: [ ALRTHEME_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"], ["hflip", "right_front", "Becky"] ],
        diag: `
chapter 4
enter 0
lynn mookbong
pose 0 mook-bong
talk 0 "Hey guise! So welcome to a new videooo..."
talk 0 "So today I'm doing a mook-bong of this whole rotiserrie chicken."
talk 0 "This was so highly-requested you guiiiiise..."
talk 0 "So I'm just gonna go ahead and dig in here."
talk - (Amberlynn begins eating)
callawait mgMookbong
talk 0 "Mmmmmmm that was so good you guiiisee."
talk 0 "Definitely saving the rest of this for later, like, ohmuhgosh."
talk 0 "Sooo that was my mook-bong. See you guys later!"
talk - (Amberlynn shuts the camera off)
pose 0 closedeyes
talk 0 "Ughhh thank god that's over."
talk 0 "Hey Beckeeeee."
talk 0 ... ... ...
pose 0 laser
shakestart 0
talk 0 "I said HEEEEYYYYY BECKEEEEEEEEEEEEYYYYUUUHHH!11!!111@"
shakeend 0
pose 0 normal
enter 1
talk 1 "What is it babe?"
talk 0 ""
incvisit
setglobal sceneAlt 2
gotofadenewchapter 6
`,
    },

    // UH books is good for the brain??
    // Chapter 5
    "books": {
        bg: "bookland.jpg",
        music: [ CALD_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"], ["hflip", "right_front", "Becky"] ],
        diag: `
chapter 5
enter 0
enter 1
pose 0 heyguys
pose 1 useless
talk 0 "Hey you guuys so me and Becky are at Bookland."
talk 1 "Buying useless things."
lynn reader
pose 0 books
sfx assets/sfx/books.ogg
shakestart 0
talk 0 "Uhh, books is good for the brain??"
callawait mgBooks
shakeend 0
pose 0 normal
talk 0 "Hmm let's also get some journals while we're here."
talk 0 "How many should I get?"
multi
2 Journals ($3)
books_journals
50 Journals ($65)
books_journals
150 Journals ($160)
books_journals
`,
    },

    "books_journals": {
        inherits: "books",
        diag: `
setvar journalCost 0
setvar _journal_increase 0

if eq lastChoice 0
setvar journalCost 3
setvar _journal_increase 2
endif

if eq lastChoice 1
setvar journalCost 65
setvar _journal_increase 50
endif

if eq lastChoice 2
setvar journalCost 160
setvar _journal_increase 150
endif

; ensures journalCost is valid
if eq journalCost 0
error journalCost
endif

copyvarnegative negativeJournalCost journalCost

if gteq money journalCost
moneychange %MONEYCHANGE_INDEX% negativeJournalCost
call addJournals
talk 0 "So that was a situation"
talk 0 "..."
talk 0 "..."
endif

if lt money journalCost
talk 0 "I can't afford these journuuuuuuuuuuhhhhls noooooouh."
endif
`
    },

    // Chapter 6
    "haul": {
        bg: "pillowmountain.png",
        music: [ ALRTHEME_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"], ["hflip", "right_front", "Becky"] ],
        diag: `
chapter 6
enter 0
pose 0 bored
talk - (Amberlynn is uploading the video she just filmed)
talk 0 "... ... ..."
talk 0 "I'm waaaaaaaaaaiteeeeeeeeeeeeeeeeeen."
talk 0 "... ... ..."
talk - (The video finishes uploading)
pose 0 normal
talk 0 "Finally it's done."
talk 0 "... ... ..."
talk 0 "Gonna reid a few comments real quick."
talk - (Amberlynn reids the comments)
if eq lastChapter 4
setvar _com_seq 1
endif
if eq lastChapter 5
setvar _com_seq 2
endif
callawait mgComments
talk 0 ""
`,
    },
}

function doVars(diagLib, key, varsList, valuesList) {
    varsList.forEach((v, i) => {
        while (diagLib[key].diag.includes(v)) {
            diagLib[key].diag = diagLib[key].diag.replace(new RegExp(v), valuesList[i]++)
        }
    })

    return valuesList
}

let vlist = [0, 0, 0]

// Fixes up dialog for optimization and comment purposes
const allDiagsKeys = Object.keys(ALL_DIAGS)
for (let i = 0; i < allDiagsKeys.length; i++) {
    // Fixes text
    const thisKey = allDiagsKeys[i]
    ALL_DIAGS[thisKey].diag = ALL_DIAGS[thisKey].diag.trim().replace(/^[#;].*/g, "").replace(/\n+/g, "\n")

    // pre-processor vars
    vlist = doVars(ALL_DIAGS, thisKey, ["%AFFCHANGE_INDEX%", "%MONEYCHANGE_INDEX%", "%INVCHANGE_INDEX%"], vlist)
}

console.log(ALL_DIAGS)
//js/lynnsStore.js
// name, url
const LYNNS = [
    [ "Boredlynn", "assets/actors/amberlynn_bored.png" ],
    [ "Angrylynn", "assets/actors/amberlynn_pissed.png" ],
    [ "Leaveenlynn", "assets/actors/amberlynn_leaveen.png" ],
    [ "Gasplynn", "assets/actors/amberlynn_gasp.png" ],
    [ "Mookbonglynn", "assets/actors/amberlynn_mook-bong.png" ],
    [ "Pointerlynn", "assets/actors/amberlynn_pointer.png" ],
    [ "Shadowlynn", "assets/actors/amberlynn_shadow.png" ],
    [ "Confusedlynn", "assets/actors/amberlynn_confused.png" ],
    [ "Readerlynn", "assets/actors/amberlynn_books.png" ],
    [ "Cacklelynn", "assets/actors/amberlynn_cacklelynn.png" ],
    [ "Frownylynn", "assets/actors/amberlynn_frowny.png" ],
    [ "Backwardslynn", "assets/actors/amberlynn_backwards.png" ],
]

const NUM_LYNNS = LYNNS.length
//js/achievementsStore.js
const ACHIEVEMENTS = [
    [ "Rich Ninja", "assets/money.png", { desc: "Win >=$250 in a single Rotisserie Ninja game.", seenBefore: true } ], // 1
    [ "Council Gamer", "assets/gamegorl.png", { desc: "Play the GameGorl 3 times.", seenBefore: true } ], // 2
    [ "Gamer Gorl", "assets/gamegorl.png", { desc: "Play the GameGorl 10 times.", seenBefore: true } ], // 3
    [ "15 Elbies", "assets/15.png", { desc: "Complete 15 chapters.", seenBefore: true } ], // 4
    [ "50 Elbies", "assets/50.png", { desc: "Complete 50 chapters.", seenBefore: true } ], // 5
    [ "89 Elbies", "assets/89.png", { desc: "Complete all 89 chapters.", seenBefore: true } ], // 6
]

const NUM_ACHIEVEMENTS = ACHIEVEMENTS.length
//js/chaptersStore.js
const CHAPTERS = [
    [ "shortage", "assets/orangechicken.png", {} ], // 1
    [ "craygslist", "assets/actors/amberlynn_gasp.png", {} ], // 2
    [ "torrid", "assets/torrid.png", {} ], // 3
    [ "rotisserie", "assets/actors/amberlynn_mook-bong.png", {} ], // 4
    [ "books", "assets/scenes/bookland.jpg", {} ], // 5
    [ "haul", "assets/torrid.png", {} ], // 6
]

const NUM_CHAPTERS = CHAPTERS.length
//js/scene.js
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
    // if (localHooks[newScene]['before']) {
    //     await localHooks[newScene]['before']()
    // }

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
//js/diag.js
function fillArr(item, num) {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(item)
    }
    return arr
}

// Very small intentional lag to prevent too many inputs fucking everything up
const inputDelayTime = 25

// This doesn't really matter as long as it's sufficiently large
const NUM_USEFLAGS = 250
const DEFAULT_SAVE = {
    chapter: 1,
    // Chapter 1 always unlocked at start
    chapters: [true, ...fillArr(false, NUM_CHAPTERS - 1)],
    diag: "shortage",
    lynns: fillArr(false, window["NUM_LYNNS"] || 300), // closure pitches a fit about NUM_LYNNS not being defined otherwise...
    achievements: fillArr(false, NUM_ACHIEVEMENTS),

    inventory: [],

    beckyAffection: 20,
    wifeyAffection: 20,

    savedVars: {},

    affectionUseFlags: fillArr(false, NUM_USEFLAGS),
    moneyUseFlags: fillArr(false, NUM_USEFLAGS),
    invUseFlags: fillArr(false, NUM_USEFLAGS),

    visitCounts: fillArr(0, NUM_CHAPTERS),

    textSpeed: 10,
    volume: 50,

    money: 0,
    hasSaveensJar: false,
}

let save = DEFAULT_SAVE

const LS_KEY = "alrsavedata"

function writeSave() {
    localStorage[LS_KEY] = JSON.stringify(save)
}

if (!localStorage[LS_KEY]) {
    writeSave()
} else {
    try {
        save = JSON.parse(localStorage[LS_KEY])
    } catch(e) {
        writeSave()
    }
}

function clearStage() {
    $('#actors').empty()
}

// [name, position, (pose) ?? "normal"]
let currentStage = []

async function putStage(actorsList) {
    let hflip = false
    let position = "left_back"

    const actorsDiv = document.getElementById('actors')

    for (const actorItem of actorsList) {
        for (let i = 0; i < actorItem.length; i++) {
            // Is last; is char
            if (i === actorItem.length - 1) {
                currentStage.push([actorItem[i], position])

                let finalClasses = []
                if (hflip) {
                    finalClasses.push("hflip")
                }

                if (position === 'left_back' || position === 'left_front') {
                    finalClasses.push("float-left")
                } else if (position === 'right_front' || position === 'right_back') {
                    finalClasses.push("float-right")
                }

                const actorImg = document.createElement('img')
                actorImg.src = ACTORS[actorItem[i]]
                actorImg.classList.add('actor-img', 'animated')

                const actorEl = document.createElement('div')
                actorEl.classList.add('actor', ...finalClasses)
                actorEl.appendChild(actorImg)

                await new Promise((resolve, reject) => {
                    if (actorImg.complete) resolve()
                    else actorImg.onload = resolve
                })

                $(actorImg).hide()
                actorsDiv.appendChild(actorEl)
            } else {
                if (actorItem[i] === 'hflip') {
                    hflip = true
                } else {
                    position = actorItem[i]
                }
            }
        }
        position = "left_back"
        hflip = false
    }

    return Promise.resolve()
}

async function putBackgroundImage(imgUrl) {
    const diagScene = document.getElementById('dialog-scene')
    if (diagScene.style.backgroundImage === `url("${imgUrl}")`) {
        return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
        const bgImage = new Image()
        bgImage.src = imgUrl
        bgImage.onload = resolve
        if (bgImage.complete) resolve()
        diagScene.style.backgroundImage = `url("${bgImage.src}")`
    })
}


function getCustomPoseURL(character, pose) {
    // Get base URL; return base URL if normal pose; otherwise chop up URL and insert extension for pose
    const basename = ACTORS[character]
    if (pose === 'normal' || !pose) {
        return basename
    }

    let ext = basename.split('.'); ext = ext[ext.length - 1]
    const withoutExt = basename.split('.').slice(0, -1)
    return `${withoutExt}_${pose}.${ext}`
}

async function updateActorPose(stageIndex, newPose, reanimate) {
    // Check if exited
    if (!currentStage[stageIndex]) return Promise.resolve()

    if (currentStage[stageIndex].length < 3) {
        currentStage[stageIndex].push(newPose)
    } else if (currentStage[stageIndex][2] === newPose) {
        // Do nothing
        return Promise.resolve()
    }

    // Now we know it's a new pose that should reanimate
    const actorImg = document.getElementsByClassName('actor-img')[stageIndex]
    const $actorImg = $(actorImg)
    if (!actorImg) return Promise.resolve()
    $actorImg.hide()
    actorImg.src = getCustomPoseURL(currentStage[stageIndex][0], newPose)

    // Update stage
    currentStage[stageIndex][2] = newPose

    if (reanimate) {
        actorImg.classList.remove('animated')

        $actorImg.show()
        actorImg.classList.add('animated')
    } else {
        $actorImg.show()
    }

    return new Promise((resolve, reject) => {
        actorImg.addEventListener('load', resolve)
    })
}

const $window = $(window)

let textScrollInt
let textInputMode = true

const TEXT_SPEED_INTERVAL = 5

async function putTextBox(speakerIndex, text) {
    const diag = document.getElementById('diag-text')
    const diagName = document.getElementById('diag-name')

    if (!diag) {
        $window.off('mousedown')
        $window.off('keydown')
        return Promise.resolve()
    }

    diag.innerHTML = ""
    diag.classList.remove('full')

    let speakerName
    if (Number.isNaN(speakerIndex)) {
        speakerName = "---"
    } else {
        if (typeof currentStage[speakerIndex] === 'undefined') return Promise.resolve()
        speakerName = currentStage[speakerIndex][0]
    }

    diagName.innerText = speakerName
    await new Promise((resolve, reject) => {
        if (typeof textScrollInt !== 'undefined') clearInterval(textScrollInt)

        let revealIndex = 0
        textScrollInt = setInterval(() => {
            if (diag.innerText.length >= text.length) {
                clearInterval(textScrollInt)
            } else {
                diag.innerText += text.charAt(revealIndex++)
                if (diag.innerText.length >= text.length) {
                    diag.classList.add('full')
                    diag.innerHTML += `<span></span>`
                }
            }
        }, TEXT_SPEED_INTERVAL)

        function handleAdvanceClick(e) {
            if (!textInputMode) return false
            // Commented out bc prevents F12/devmenu during dialog
            //e.preventDefault()

            if (e.key) {
                if (!(e.key === 'Enter' || e.key === ' ')) {
                    return
                }
            } else if (e.button !== 0) return

            // Advance all text
            if (textScrollInt) clearInterval(textScrollInt)
            if (diag.innerText.length < text.length) {
                diag.innerText = text
                diag.classList.add('full')
                diag.innerHTML += `<span></span>`
            } else {
                // Already has finished text; remove listener and resolve
                $window.off('mousedown')
                $window.off('keydown')
                resolve()
            }
        }

        $window.off('keydown')
        $window.off('mousedown')
        $window.on('mousedown keydown', handleAdvanceClick)
    })
}

let newScene, lastChoice, lastChapter
async function showMulti(options) {
    return new Promise((resolve, reject) => {
        let selected = 0, lastSelected = 0, isMouseOn = false

        const mbox = document.getElementById('multi-box')
        const $mbox = $(mbox)

        mbox.classList.remove('reverse-anim')
        mbox.classList.add('begin')

        let animationDone = false
        mbox.style.pointerEvents = 'none'
        mbox.onanimationend = () => {
            mbox.style.pointerEvents = 'all'
            updateSel()
            animationDone = true
            mbox.onanimationend = null
        }

        for (let i = 0; i < options.length; i += 2) {
            // Text
            const coption = document.createElement('pre')
            coption.tabindex = -1
            coption.innerHTML = options[i]

            const $coption = $(coption)

            $coption.on('mouseenter', function(e) {
                if (!animationDone) return
                $mbox.children().removeClass('selected')
                lastSelected = coption.index / 2
                selected = null
                isMouseOn = true
            })

            $coption.on('mousedown', function(e) {
                if (!animationDone) return
                $mbox.hide()
                mbox.classList.remove('begin')
                $mbox.show()
                mbox.classList.add('reverse-anim')

                mbox.onanimationend = () => {
                    $mbox.empty()
                    mbox.classList.remove('reverse-anim')
                    mbox.onanimationend = null
                    lastChoice = coption.index / 2
                    resolve()
                }

                newScene = coption.scene
            })

            $coption.on('mouseleave', function(e) {
                if (!animationDone) return
                selected = lastSelected
                isMouseOn = false
                updateSel()
            })

            coption.scene = options[i + 1]
            coption.index = i
            mbox.appendChild(coption)
        }

        function updateSel() {
            $mbox.children().removeClass('selected')
            mbox.children[selected].classList.add('selected')
        }

        updateSel()

        function handleKeyDown(e) {
            if (!animationDone) return
            if (isMouseOn) return

            if (e.key) {
                const key = e.key.toLowerCase()
                if (key.includes('arrow')) {
                    if (key === 'arrowup' && selected > 0) selected--
                    else if (key === 'arrowdown' && selected < mbox.children.length - 1) selected++

                    updateSel()
                } else if (key.includes('enter')) {
                    // Confirm
                    $($mbox.children()[selected]).trigger('mousedown')
                    $window.off('keydown')
                }
            }
        }

        $(window).on('keydown', handleKeyDown)
    })
}

function derefInheritance(dt) {
    if (dt.inherits) {
        const inherited = ALL_DIAGS[dt.inherits]
        dt.stage = inherited.stage
        dt.bg = inherited.bg
    }
}

const MUS_MULTIPLIER = 0.55
let audioInt, caudio = []

// If loops is falsy then initStart is actually the volume
function playSong(url, loops, initStart, start, end) {
    let newAudio = new Audio(url)
    newAudio.volume = (loops ? MUS_MULTIPLIER : initStart) * (save.volume / 100)
    newAudio.play()
    caudio.push(newAudio)

    if (loops) {
        newAudio.currentTime = initStart
        if (audioInt) clearInterval(audioInt)
        audioInt = setInterval(() => {
            if (newAudio.currentTime >= end) {
                newAudio.currentTime = start
            }
        }, 40)
        // window.onkeydown = (e) => {
        //     if (e.key === 'g') {
        //         newAudio.currentTime = end - 5.0
        //     }
        // }
    }
}

function stopMusic() {
    if (audioInt) clearInterval(audioInt)
    caudio.forEach(audio => audio.pause())
    caudio = []
}

function unlockSaveens() {
    save.hasSaveensJar = true
}

function updateSaveens() {
    if (!save.hasSaveensJar) {
        $('#saveens').hide()
    } else {
        $('#saveens').show()

        $('.saveens-amount').text(save.money.toLocaleString())
    }
}

async function prepareDialog(name) {
    const dt = ALL_DIAGS[name]
    derefInheritance(dt)
    stopMusic()

    // Saveens check
    updateSaveens()

    if (dt.music)
        playSong(...dt.music[0])

    clearStage()
    await putStage(dt.stage)
    await putBackgroundImage(`assets/scenes/${dt.bg}`)
    return Promise.resolve()
}

let hasTalked,
    dt,
    lines,
    iterator

function clearDiagState() {
    hasTalked = null
    dt = null
    lines = null
    iterator = -1

    currentStage = []
}

function clearDiagDOM() {
    $('#diag-name').text('')
    $('#diag-text').text('')
    $('#saveens').hide()
    if ($('#lynn-pop')[0]) {
        hideLynn($('#lynn-pop'))
    };

    const ds = document.getElementById('dialog-scene')

    if (ds) ds.style.backgroundImage = 'url("../assets/money.png")';

    stopMusic()
    endShake()

    $('.mg-canvas').removeClass('visible')

    const $mbox = $('#multi-box')
    $mbox.empty()
    $mbox.removeClass('reverse-anim').removeClass('begin')
}

function hideNotifs() {
    $('#lynn-pop-container').html("")
}

function hideLynn($lynnpop) {
    $lynnpop.remove()
}

// Originally only showed Lynn get texts, now general notif function
// Also has queue functionality
function showLynn(text) {
    // Shows lynn pop-down
    const $lynnpop = $('#lynn-pop-container')
    
    const $txt = $(`<div class="lynn-pop panel">`)
    $txt.append($(`<pre class="lynn-pop-text">${text}</pre>`))
    $lynnpop.append($txt)
    $txt.show()
    $txt.addClass('anim')
    $lynnpop.show()

    setTimeout(() => {
        if (!$txt.hasClass('anim')) return

        $txt.hide()
        $txt.removeClass('anim')
        $txt.show()
        $txt.addClass('anim-reverse')

        $txt[0].onanimationend = () => hideLynn($txt)
    }, 2100)
}

// function clearNotifs() {
//     //$('#lynn-pop-container').html("")
// }

// function showNotifs() {
//     // const $lynnpop = $('#lynn-pop-container')
//     // $lynnpop.show()
//     // $lynnpop.addClass('anim')

//     // setTimeout(() => {
//     //     if (!$lynnpop.hasClass('anim')) return

//     //     $lynnpop.hide()
//     //     $lynnpop.removeClass('anim')
//     //     $lynnpop.show()
//     //     $lynnpop.addClass('anim-reverse')

//     //     $lynnpop[0].onanimationend = () => hideLynn($lynnpop)
//     // }, 2000)
// }

function startNewScene() {
    iterator = -1
    dt = ALL_DIAGS[newScene]
    lines = dt.diag.split("\n")
}

function randInt(s, e) {
    return Math.floor(Math.random() * (e - s + 1) + s)
}

function randFloat(s, e) {
    return Math.random() * (e - s + 1) + s
}

function handleFlaggedEvent(index, useFlagPrefix, cb) {
    const combinedName = `${useFlagPrefix}UseFlags`

    // -1 = bypass all checks
    if (index === -1) {
        cb()
        return
    }

    if (save[combinedName][index]) {
        return
    }

    save[combinedName][index] = true
    cb()
}

function doMoneyChange(amount) {
    save.money += amount

    const $el = $(`<pre class="money-change">`)
    if (amount <= 0) {
        $el.html(`<span style="color: darkred;">${amount.toLocaleString()}</span>`)
    } else {
        $el.html(`<span style="color: darkgreen;">+${amount.toLocaleString()}</span>`)
    }

    updateSaveens()

    $('#saveens-text').append($el)

    $el[0].onanimationend = () => {
        $el.remove()
    }
}

let oldPos, oldOff, $actor, offInt
function startShake(speakerIndex) {
    $actor = $($('.actor')[speakerIndex])
    oldPos = $actor.css('position')
    oldOff = $actor.offset()

    $actor.css('position', 'absolute')
    offInt = setInterval(() => {
        $actor.offset({
            top: randInt(-20, 20) + oldOff.top,
            left: randInt(-20, 20) + oldOff.left,
        })
    }, 16)
}

function endShake() {
    if (!oldPos) return
    $actor.css('position', oldPos)
    $actor.offset(oldOff)

    clearInterval(offInt)

    oldPos = null
    oldOff = null
    $actor = null
    offInt = null
}

// dictName: STRING name of dict on save to check
// dict: ARRAY actual array to use/search
// name: collectable to unlock
// Goes through dict, finds index of thing to try to unlock, unlocks it if not already unlocked
function unlockCollectable(dictName, dict, name) {
    let index = -1
    let j = 0
    for (const item of dict) {
        if (item[0].toLowerCase().includes(name.toLowerCase())) {
            index = j
        }
        j++
    }

    if (save[dictName][index])
        return

    if (index < 0) {
        // invalid lynn
        console.error("Invalid internal Lynn name provided: " + name)
        return
    }

    save[dictName][index] = true

    // Lynn pop-down
    if (dictName.endsWith('s')) {
        dictName = dictName.slice(0, -1)
    }

    showLynn(`New ${dictName.charAt(0).toUpperCase() + dictName.slice(1)}: <span class="ochicken">${dict[index][0]}</span>`)
}

let inlineVarDict = {}
function derefInlineVariable(name) {
    if (Object.keys(save).indexOf(name) > -1) return save[name]
    if (name in inlineVarDict) return inlineVarDict[name]
    if (name === 'lastChoice') return lastChoice
    if (name === 'lastChapter') return lastChapter
    if (name in save.savedVars) return save.savedVars[name]
    if (name.includes(" ")) return name // is assumed to be string

    // If not defined as a var, assumed to be int
    try {
        const asInt = parseInt(name)
        return Number.isNaN(asInt) ? name : asInt
    } catch(e) {
        return name
    }
}

function doAffectionChange(character, amount) {
    // If the index has already been used, return
    save[`${character.toLowerCase()}Affection`] += amount
    const isNeg = amount <= 0
    showLynn(`${character} Affection: <span style="color: ${isNeg ? "red" : "lime"};">${isNeg ? "" : "+"}${amount.toString()}</span>`)
}

function doInventoryPush(itemName) {
    save.inventory.push(itemName)
}

async function handleTalk(args) {
    hasTalked = true

    let speakerIndex = parseInt(args[1])
    const text = args.slice(2).join(" ")

    // Magnify speaker
    const $actors = $('.actor')
    $actors.removeClass('magnified')

    if (!Number.isNaN(speakerIndex)) {
        if (!$actors[speakerIndex]) return Promise.resolve()
        $actors[speakerIndex].classList.add('magnified')
    }

    await putTextBox(speakerIndex, text)
    await new Promise((resolve, reject) => {
        setTimeout(resolve, inputDelayTime)
    })
}

function addJournals() {
    save.journals += parseInt(inlineVarDict['_journal_increase'], 10)
}

let isTransition = false
let requireCondition = true
async function doDialog(name) {
    // Delay 100ms
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 120)
    })

    hasTalked = false
    dt = ALL_DIAGS[name]

    lines = dt.diag.split("\n")
    for (iterator = 0; iterator < (lines?.length ?? 99999); iterator++) {
        if (!lines) return Promise.resolve()
        writeSave()

        const line = lines[iterator]
        if (line.startsWith('#')) continue
        const args = line.split(" ")

        if (args[0] === 'pose') {
            const person = parseInt(args[1])
            const pose = args[2]

            // Only reanimate if we have talked
            updateActorPose(person, pose, hasTalked)
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 0)
            })
        } else if (args[0] === 'talk') {
            await handleTalk(args)
        } else if (args[0] === 'talknoconfirm') {
            handleTalk(args)
        } else if (args[0] === 'multi') {
            // Multichoice box
            const options = []
            iterator++
            for (; iterator < lines.length; iterator++) {
                if (!lines[iterator]) continue
                options.push(lines[iterator])
            }
            await showMulti(options)

            // Reset loop state
            startNewScene()
        } else if (args[0] === 'if') {
            const com = args[1]
            const variable = args[2]
            let condition

            if (com === 'gt') {
                condition = derefInlineVariable(variable) > derefInlineVariable(args[3])
            } else if (com === 'lt') {
                condition = derefInlineVariable(variable) < derefInlineVariable(args[3])
            } else if (com === 'eq') {
                condition = derefInlineVariable(variable) === derefInlineVariable(args[3])
            } else if (com === 'gteq') {
                condition = derefInlineVariable(variable) >= derefInlineVariable(args[3])
            } else if (com === 'lteq') {
                condition = derefInlineVariable(variable) <= derefInlineVariable(args[3])
            } else if (com === 'bounded') {
                const parsedVar = derefInlineVariable(variable)
                condition = parsedVar >= derefInlineVariable(args[3]) && parsedVar <= derefInlineVariable(args[4])
            } else if (com === 'inventoryhas') {
                condition = save.inventory.includes(args.slice(2).join(" "))
            } else if (com === 'inventoryhasnot') {
                condition = !(save.inventory.includes(args.slice(2).join(" ")))
            } else if (com === 'firstvisit') {
                condition = save.visitCounts[save.chapter] < 1
            } else if (com === 'notfirstvisit') {
                condition = save.visitCounts[save.chapter] > 0
            }

            if (!condition) {
                while (lines[iterator] !== 'endif' && iterator < lines.length) iterator++
                iterator--
                // newScene = lines[iterator + 1]
                // startNewScene()
            }
        } else if (args[0] === 'randint') {
            // randint <var> <s> <e>
            inlineVarDict[args[1]] = randInt(parseInt(args[2]), parseInt(args[3]))
        } else if (args[0] === 'affectionchange') {
            // Do affection change
            handleFlaggedEvent(derefInlineVariable(args[1]), `affection`, () => {
                doAffectionChange(args[2], derefInlineVariable(args[3]))
            })
        } else if (args[0] === 'setvar') {
            inlineVarDict[args[1]] = derefInlineVariable(args.slice(2).join(" "))
        } else if (args[0] === 'setglobal') {
            save.savedVars[args[1]] = derefInlineVariable(args.slice(2).join(" "))
        } else if (args[0] === 'copyvarnegative') {
            inlineVarDict[args[1]] = (-1) * derefInlineVariable(args.slice(2).join(" "))
        } else if (args[0] === 'moneychange') {
            handleFlaggedEvent(derefInlineVariable(args[1]), `money`, () => {
                doMoneyChange(derefInlineVariable(args.slice(2).join(" ")))
            })
        } else if (args[0] === 'pushinv') {
            // Push item (string) into inventory
            // function handleFlaggedEvent(index, useFlagPrefix, cb)
            handleFlaggedEvent(derefInlineVariable(args[1]), `inv`, () => {
                doInventoryPush(args[1], args.slice(2).join(" "))
            })
        } else if (args[0] === 'goto') {
            newScene = args[1]
            startNewScene()
        } else if (args[0] === 'leave') {
            const idx = parseInt(args[1])
            const $img = $($('.actor-img')[idx])
            $img.hide()
            $img.removeClass('animated')

            if (hasTalked) {
                $img.show()
                $img.addClass('animated').addClass('anim-reverse')
                if (args.length > 2) {
                    $img.hide().removeClass('anim-reverse')
                } else {
                    $img[0].onanimationend = () => {
                        $img.hide().removeClass('anim-reverse')
                        $img[0].onanimationend = null
                    }
                }
            }
        } else if (args[0] === 'incvisit') {
            save.visitCounts[save.chapter]++
        } else if (args[0] === 'enter') {
            const idx = parseInt(args[1])
            const $img = $($('.actor-img')[idx])

            $img.toggleClass('animated', true).show()
        } else if (args[0] === 'sfx') {
            playSong(args[1], false, parseFloat(args[2] || "1.0"))
        } else if (args[0] === 'lynn') {
            unlockCollectable('lynns', LYNNS, args[1])
            // let index = -1
            // let j = 0
            // for (const lynn of LYNNS) {
            //     if (lynn[0].toLowerCase().includes(args[1].toLowerCase())) {
            //         index = j
            //     }
            //     j++
            // }
            //
            // if (save.lynns[index])
            //     continue
            //
            // if (index < 0) {
            //     // invalid lynn
            //     console.error("Invalid internal Lynn name provided: " + args[1])
            // } else {
            //     save.lynns[index] = true
            //
            //     // Lynn pop-down
            //     showLynn(LYNNS[index][0], `New Lynn`)
            // }
        } else if (args[0] === 'gotofade') {
            newScene = args[1]
            startNewScene()
            await new Promise((resolve, reject) => {
                fadeoutNoSceneChange(() => {
                    hideNotifs()
                    updateSaveens()
                    resolve()
                })
            })
        } else if (args[0] === 'gotofadenewchapter') {
            lastChapter = save.chapter
            save.chapter = parseInt(args[1])

            fadeoutNoSceneChange(async () => {
                clearStage()
                currentStage = []
                await loadScene('mainMenu')
                await loadScene('dialog')
            })
        } else if (args[0] === 'chapter') {
            let finalVal

            try {
                finalVal = parseInt(args[1])
            } catch (e) {
                finalVal = save.chapter
            }

            save.chapter = finalVal
            save.chapters[finalVal - 1] = true
        } else if (args[0] === 'call') {
            // Calls sync func by string name
            window[args[1]]()
        } else if (args[0] === 'callawait') {
            // Calls async func by string name and awaits it
            await window[args[1]]()
        } else if (args[0] === 'setbg') {
            await putBackgroundImage(args.slice(1).join(" "))
        } else if (args[0] === 'shakestart') {
            const speakerIndex = parseInt(args[1])
            startShake(speakerIndex)
        } else if (args[0] === 'shakeend') {
            endShake()
        } else if (args[0] === 'error') {
            handleTalk(["talk", "-", `INTERNAL ERROR; VAR STATES: ${inlineVarDict} VARS WHICH HAVE RESPECTIVE VALUES ${args.slice(1).map(el => eval(el))}`])
        }
        // Deprecated; no distinction between save and workingSave anymore due to Chapters section removal (bc redundancy)
        // } else if (args[0] === 'copymoneytoreal') {

        // }
    }
}

function getChapterScene() {
    return CHAPTERS[save.chapter - 1][0]
}

async function doCurrentDiagSequence() {
    await prepareDialog(getChapterScene())
    await doDialog(getChapterScene())
}
//js/mg.js
function mgShowCanvasContainer(can) {
    can.addClass('visible')

    // Disable Quit
    $('#diag-quit').css('pointer-events', 'none')
}

function mgHideCanvasContainer(can) {
    can.removeClass('visible')

    // Enable Quit
    $('#diag-quit').css('pointer-events', 'unset')
}

const GB_GREEN = "#8bac0f"
const GB_BLACK = "#0f380f"

function mgInitCanvas(can) {
    let canvas, realCanvas, ctx, sw, sh, realCtx

    realCanvas = can[0]
    canvas = makeOffscreenCanvas(realCanvas.width, realCanvas.height)
    realCtx = realCanvas.getContext('2d', { alpha: false, powerPreference: "high-performance" })
    ctx = canvas.getContext('2d', { alpha: false, powerPreference: "high-performance" })
    sw = canvas.width
    sh = canvas.height

    return { canvas, ctx, sw, sh, realCanvas, realCtx }
}

function mgNullifyEvent(e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
}

function mgNullifyKeyEvents(candt) {
    candt.realCanvas.onkeydown = (e) => {
        mgNullifyEvent(e)
        return false
    }
    candt.realCanvas.onkeyup = candt.realCanvas.onkeydown

    candt.realCanvas.parentElement.onkeydown = (e) => {
        mgNullifyEvent(e)
        return false
    }
    candt.realCanvas.parentElement.onkeyup = candt.realCanvas.parentElement.onkeydown
}

function mgDrawToReal(candt) {
    candt.realCtx.drawImage(candt.canvas, 0, 0)
}

function mgRealToCanvas(canvas, evt) {
    const rect = canvas.getBoundingClientRect()

    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    }
}

function mgDrawBG(can, color) {
    color = color ?? GB_GREEN
    const { ctx, sw, sh } = can

    ctx.fillStyle = color
    ctx.fillRect(0, 0, sw, sh)
}

function mgDrawScreenBorder(can) {
    const { ctx, sw, sh } = can

    ctx.fillStyle = GB_BLACK
    ctx.strokeStyle = GB_BLACK
    ctx.strokeRect(0, 0, sw, sh)
}

function mgDrawMonoImage(can, img, x, y, rot) {
    const { ctx } = can

    ctx.fillStyle = GB_BLACK
    ctx.strokeStyle = GB_BLACK

    const dt = img.dt
    dt.forEach(cmd => {
        ctx.save()
        ctx.translate(x, y)
        if (rot) {
            //ctx.rotate((rot / 360) * (2 * Math.PI))
        }
        ctx.fillRect(cmd[0], cmd[1], cmd[2] - cmd[0] + 1, cmd[3] - cmd[1] + 1)
        ctx.restore()
    })
}

async function mgDelay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

let tickFunc = () => {}
function mgSetTickFunction(cb) {
    tickFunc = cb
}

let mgExit = null
function mgTick() {
    tickFunc()
    if (mgExit !== false) {
        window.requestAnimationFrame(mgTick)
    }
}

// mgMookbong
const mgMookbongLayg = {
    width: 12,
    height: 8,
    yields: -1,
    dt: [
        [0, 2, 0, 6],
        [1, 3, 1, 5],
        [2, 3, 2, 5],
        [2, 3, 2, 5],
        [3, 3, 3, 5],
        [4, 2, 4, 5],
        [5, 1, 5, 6],
        [6, 0, 6, 7],
        [7, 0, 7, 8],
        [8, 0, 8, 8],
        [9, 0, 9, 8],
        [10, 1, 10, 7],
        [11, 2, 11, 6],
        [12, 3, 12, 5],
    ],
}

const mgMookbongWing = {
    width: 12,
    height: 7,
    yields: 5,
    dt: [
        [0, 3, 0, 4],
        [1, 3, 1, 4],
        [2, 4, 2, 5],
        [3, 4, 3, 6],
        [4, 0, 4, 6],
        [5, 0, 5, 6],
        [6, 0, 6, 4],
        [7, 1, 7, 4],
        [8, 1, 8, 5],
        [9, 2, 9, 7],
        [10, 3, 10, 7],
        [11, 3, 11, 7],
        [12, 3, 12, 7],
    ],
}

const mgMookbongImgs = [mgMookbongLayg, mgMookbongWing]
const mgMookbongPositions = [0, 1, 2, 3]

let mgMookbongNinjaPath = [0]
const mgMookbongSpawnData = []

mgMookbongSpawnData.push(50)
for (let i = 0; i < 120; i++) {
    mgMookbongSpawnData.push(randFloat(5, 60 - (i / 8)))
    mgMookbongSpawnData.push([ pickRandom(mgMookbongImgs), pickRandom(mgMookbongPositions) ])
}
mgMookbongSpawnData.push(150)

let mgMookbongObjects = []

function mgMookbongPutNinjaPathPoint(x, y) {
    mgMookbongNinjaPath.push([x, y])
    const cIndex = mgMookbongNinjaPath.length - 1
    setTimeout(() => {
        mgMookbongNinjaPath[0]++
        mgMookbongNinjaPath[cIndex] = null
    }, 200)
}

function mgMookbongClearNinjaPath() {
    mgMookbongNinjaPath.splice(0, mgMookbongNinjaPath.length)
}

function mgMookbongAddObject(img, pos, vel, grav, rot, rotSpeed) {
    mgMookbongObjects.push([img, pos, vel, grav, rot, rotSpeed])
}

function mgMookbongDrawObjects(candt) {
    mgMookbongObjects = mgMookbongObjects.filter(obj => obj !== null)
    mgMookbongObjects.forEach((dt, idx) => {
        // dt[0] = img
        // dt[1] = pos
        // dt[2] = vel
        // dt[3] = grav
        // dt[4] = rot
        // dt[5] = rotSpeed

        // Apply grav to vel
        // mgMookbongObjects[idx][2][0] += mgMookbongObjects[idx][3][0]
        // mgMookbongObjects[idx][2][1] += mgMookbongObjects[idx][3][1]

        // Apply vel to pos
        mgMookbongObjects[idx][1][0] += mgMookbongObjects[idx][2][0]
        mgMookbongObjects[idx][1][1] += mgMookbongObjects[idx][2][1]

        // Update rot
        mgMookbongObjects[idx][4] += mgMookbongObjects[idx][5]

        // Out of canvas bounds
        if (mgMookbongObjects[idx][1][0] >= candt.sw + 40 || mgMookbongObjects[idx][1][0] <= -40 || mgMookbongObjects[idx][1][1] >= candt.sh + 40 || mgMookbongObjects[idx][1][1] <= -40) {
            mgMookbongObjects[idx] = null
        } else {
            // Draw
            const ctx = candt.ctx

            // ctx.save()
            // ctx.rotate((mgMookbongObjects[idx][4] / 360) * (2 * Math.PI))
            mgDrawMonoImage(candt, mgMookbongObjects[idx][0], mgMookbongObjects[idx][1][0], mgMookbongObjects[idx][1][1], mgMookbongObjects[idx][4])
            // ctx.restore()
        }
    })
}

function mgIsRectOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2
}

function mgMookbongDrawNinjaPath(candt) {
    if (mgMookbongNinjaPath[0] >= mgMookbongNinjaPath.length) {
        mgMookbongNinjaPath = []
    }

    candt.ctx.fillStyle = GB_BLACK

    candt.ctx.beginPath()
    for (let i = 1 + mgMookbongNinjaPath[0]; i < mgMookbongNinjaPath.length; i += 2) {
        const from = mgMookbongNinjaPath[i]
        if (!from) {
            continue
        }
        const to = mgMookbongNinjaPath[i + 1] ?? from

        candt.ctx.lineTo(from[0], from[1])
        candt.ctx.lineTo(to[0], to[1])

        mgMookbongObjects.forEach((obj, idx) => {
            if (!obj) return
            const left = obj[1][0]
            const top = obj[1][1]
            const width = obj[0].width
            const height = obj[0].height

            let isOverlap = false

            let nx, ny, completion = 0
            nx = Math.floor(from[0])
            ny = Math.floor(from[1])

            while (true) {
                // check
                if (mgIsRectOverlap(nx, ny, 1, 1, left, top, width, height)) {
                    isOverlap = true
                    break
                }

                // lerp
                nx = nx + (to[0] - nx) * completion
                ny = ny + (to[1] - ny) * completion
                completion += 0.04

                if (completion >= 1) break
            }

            candt.ctx.lineWidth = 5
            if (isOverlap
            // if (candt.ctx.isPointInStroke(Math.floor(left + width/2), Math.floor(top + height/2)) ||
            //     candt.ctx.isPointInStroke(Math.floor(left), Math.floor(top + height/2)) ||
            //     candt.ctx.isPointInStroke(Math.floor(left), Math.floor(top)) || candt.ctx.isPointInStroke(Math.floor(left + width/2), Math.floor(top)) ||
            //     candt.ctx.isPointInStroke(Math.floor(left + width), Math.floor(top + height) ||
            //     mgIsRectOverlap(left, top, width, height, from[0], from[1], 1, 1))
                // candt.ctx.isPointInStroke(Math.floor(left), Math.floor(top + height)) ||
                // candt.ctx.isPointInStroke(left + width, top) || candt.ctx.isPointInStroke(left + width/3, top + height/3) ||
                // candt.ctx.isPointInStroke(left + width * (2/3), top + height * (2/3)) || candt.ctx.isPointInStroke(left + width/3, top + height * (2/3)) ||
                // candt.ctx.isPointInStroke(left + width * (2/3), top + height/3)) {
            ) {
                mgMookbongObjects[idx] = null

                // The -1 bypasses index check
                doMoneyChange(obj[0].yields)

                if (Math.random() < 0.3) {
                    if (obj[0] === mgMookbongLayg) {
                        playSong("assets/sfx/fanofthelaygs.ogg", false, 0.8)
                    } else if (obj[0] === mgMookbongWing) {
                        playSong("assets/sfx/mmm.ogg", false, 0.8)
                    }
                }
            }
            candt.ctx.lineWidth = 1
        })
    }
    candt.ctx.stroke()
    candt.ctx.closePath()
}

let mgInitialScore
async function mgMookbong() {
    await new Promise((resolve, reject) => {
        // Make text instant and disable user input (for minigame text)
        textInputMode = false
        mgShowCanvasContainer($('#mookbong-canvas-container'))

        // Set initial score
        mgInitialScore = save.money

        const $can = $('#mookbong-canvas')

        let candt = mgInitCanvas($can)
        mgNullifyKeyEvents(candt)
        mgDrawBG(candt, GB_GREEN)
        mgDrawScreenBorder(candt)

        // Handlers
        candt.realCanvas.onmousedown = function(e) {
            e.stopPropagation()
        }

        candt.realCanvas.parentElement.onmousedown = (e) => e.stopPropagation()

        $(candt.realCanvas).on('mousemove', function(e) {
            e.stopPropagation()
            const position = mgRealToCanvas(this, e)
            const last = mgMookbongNinjaPath[mgMookbongNinjaPath.length - 1]
            if (last)
                mgMookbongPutNinjaPathPoint(...last)
            mgMookbongPutNinjaPathPoint(position.x, position.y)
        })

        candt.realCanvas.ontouchmove = function(e) {
            $(candt.realCanvas).trigger('mousemove')
        }

        let fc = 0,
            localFc = 0,
            mookIndex = 0

        mgSetTickFunction(() => {
            // Draws all
            mgDrawBG(candt)
            mgDrawScreenBorder(candt)

            const positionBound = 60
            const minVel = 1.5
            const maxVel = 2.5

            const mookDt = mgMookbongSpawnData[mookIndex]
            if (typeof mookDt === 'undefined') {
                if (save.money - mgInitialScore >= 250) {
                    unlockCollectable('achievements', ACHIEVEMENTS, 'Rich Ninja')
                }

                mgHideCanvasContainer($('#mookbong-canvas-container'))
                textInputMode = true
                resolve()
            } else if (typeof mookDt === 'number') {
                if (localFc >= mookDt) {
                    mookIndex++
                    localFc = -1
                }
            } else if (Array.isArray(mookDt)) {
                // Is data
                let pos, vel, grav
                if (mookDt[1] === 0) {
                    // From top
                    pos = [randFloat(positionBound, candt.sw - positionBound), -5]
                    vel = [randFloat(-0.1, 0.1), randFloat(minVel, maxVel)]
                    grav = [0, randFloat(-1, -2)]
                } else if (mookDt[1] === 1) {
                    // From right
                    pos = [candt.sw + 5, randFloat(positionBound, candt.sh - positionBound)]
                    vel = [randFloat(-maxVel, -minVel), randFloat(-0.1, 0.1)]
                    grav = [randFloat(1, 2), 0]
                } else if (mookDt[1] === 2) {
                    // From bottom
                    pos = [randFloat(positionBound, candt.sw - positionBound), candt.sh + 5]
                    vel = [randFloat(-0.1, 0.1), randFloat(-maxVel, -minVel)]
                    grav = [0, randFloat(1, 2)]
                } else if (mookDt[1] === 3) {
                    // From left
                    pos = [-5, randFloat(positionBound, candt.sh - positionBound)]
                    vel = [randFloat(minVel, maxVel), randFloat(-0.1, 0.1)]
                    grav = [randFloat(-1, -2), 0]
                }

                vel[0] *= 0.55
                vel[1] *= 0.55

                mgMookbongAddObject(mookDt[0], pos, vel, grav, randInt(0, 359), randInt(-2, 2))
                mookIndex++
            }

            // Update object positoins
            mgMookbongDrawObjects(candt)

            // Draw path
            if (mgMookbongNinjaPath.length > 0)
                mgMookbongDrawNinjaPath(candt)

            fc++
            localFc++

            mgDrawToReal(candt)

            if (mgExit) return false
        })
        mgTick()

        // drawMonoImage(candt, mgMookbongLayg, 40, 40)
    })
}

const MUTED_WHITE = '#eeeeee'

function mgBooksGetImage(src) {
    const img = new Image()
    img.src = src
    return img
}

const mgBooksGoodForTheBrainBooks = [
    mgBooksGetImage("assets/readerlynn/benotfar.jpg"),
    mgBooksGetImage("assets/readerlynn/falleen_toewurd.jpg"),
    mgBooksGetImage("assets/readerlynn/loneliest.jpg"),
    mgBooksGetImage("assets/readerlynn/lucid.jpg"),
    mgBooksGetImage("assets/readerlynn/ontheisland.jpg"),
    mgBooksGetImage("assets/readerlynn/species.jpg"),
    mgBooksGetImage("assets/readerlynn/tripleshotbettys.jpg"),
]

const mgBooksBadForTheBrainBooks = [
    mgBooksGetImage("assets/readerlynn/weightloss1.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss2.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss3.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss4.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss5.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss6.jpg"),
    mgBooksGetImage("assets/readerlynn/weightloss7.jpg"),
]

let mgBooksCurrent = []
let mgBooksMX, mgBooksMY, mgBooksClicked
function mgBooksPush(candt, book) {
    book._xpos = randInt(200, candt.sw - 200)
    book._ypos = randInt(-400, -300)
    book._vel = randFloat(3.0, 8.5)

    mgBooksCurrent.push(book)
}

const mgBooksBadDt =  [ "assets/sfx/books_uh.ogg", false, 0.8 ]
const mgBooksGoodDt = [ "assets/sfx/books.ogg", false, 0.8 ]

function mgBooksDrawBooks(candt) {
    $('canvas').css('cursor', 'default')

    let didClick, clickedIdx

    for (let idx = 0; idx < mgBooksCurrent.length; idx++) {
        const book = mgBooksCurrent[idx]

        book._ypos += book._vel
        candt.ctx.drawImage(book, 0, 0, book.width, book.height, book._xpos, book._ypos, 150, 300)

        if (mgIsRectOverlap(mgBooksMX, mgBooksMY, 1, 1, book._xpos, book._ypos, 128, 300)) {
            $('canvas').css('cursor', 'pointer')
            if (mgBooksClicked) {
                didClick = true
                clickedIdx = idx
            }
        } else if (book._ypos > candt.sh * 2) {
            mgBooksCurrent.splice(idx, 1)
            idx--
        }
    }

    if (didClick) {
        mgBooksClicked = false
        let book = mgBooksCurrent[clickedIdx]

        // Determine if bad or good
        let isBad = false
        mgBooksBadForTheBrainBooks.every(badBook => {
            if (badBook.src == book.src) {
                isBad = true
                return false
            }
            return true
        })

        if (isBad) {
            // bad
            doMoneyChange(-2)
            if (Math.random() > 0.8) playSong(...mgBooksBadDt)
        } else {
            // good
            doMoneyChange(4)
            if (Math.random() > 0.8) playSong(...mgBooksGoodDt)
        }

        mgBooksCurrent.splice(clickedIdx, 1)
    }
}

async function mgBooks() {
    await new Promise((resolve, reject) => {
        textInputMode = false
        mgShowCanvasContainer($('#books-canvas-container'))

        const $books = $('#books-canvas')
        let candt = mgInitCanvas($books)
        mgNullifyKeyEvents(candt)

        candt.realCanvas.onmousemove = (e) => {
            mgBooksMX = e.offsetX * (candt.sw / window.innerWidth)
            mgBooksMY = e.offsetY * (candt.sh / window.innerHeight)

            if (debug) {
                mgExit = true
                mgHideCanvasContainer($('#books-canvas-container'))
                textInputMode = true
                resolve()
            }
        }

        candt.realCanvas.onmousedown = (e) => {
            mgBooksClicked = true
        }

        let fc = 0
        let nextBookTime = 40
        let bookSelectionArr, nextBook, stopSpawning

        mgSetTickFunction(() => {
            // Draws all
            mgDrawBG(candt, MUTED_WHITE)

            // Draw books
            // Decide next book
            if (fc >= nextBookTime && !stopSpawning) {
                nextBookTime += randInt(16, 60)
                bookSelectionArr = Math.random() < 0.6 ? mgBooksGoodForTheBrainBooks : mgBooksBadForTheBrainBooks
                nextBook = pickRandom(bookSelectionArr)

                let copy = new Image()
                copy._xpos = nextBook._xpos
                copy._ypos = nextBook._ypos
                copy._vel = nextBook._vel
                copy.src = nextBook.src

                mgBooksPush(candt, copy)
            }

            if (fc >= 2800) {
                stopSpawning = true
            }

            if (fc >= 3000) {
                mgExit = true
                mgHideCanvasContainer($('#books-canvas-container'))
                textInputMode = true
                resolve()
            }

            mgBooksDrawBooks(candt)
            mgBooksClicked = false

            // Draw to real
            mgDrawToReal(candt)
            fc++
        })
        mgTick()

        // drawMonoImage(candt, mgMookbongLayg, 40, 40)
    })
}

const mgCommentsSeqs = [
    null, // 0
    [ // 1 - mookbong comments
        `Ooops:Amberlynn: I want to lose weight. Also Amberlynn: *does mookbong of whole rotiserie chicken*`,
        `Katie W:GORL I can't believe you ate a whole chicken.`,
        `Jade F:"I'm trying to eat lean meats" girl you ate a whole ass chicken.`,
        ``
    ],    
]

async function mgComments() {
    await new Promise((resolve, reject) => {
        textInputMode = false
        mgShowCanvasContainer($('#books-canvas-container'))

        const $books = $('#books-canvas')
        let candt = mgInitCanvas($books)
        mgNullifyKeyEvents(candt)

        candt.realCanvas.onmousemove = (e) => {

        }

        candt.realCanvas.onmousedown = (e) => {

        }

        let fc = 0

        mgSetTickFunction(() => {
            // Draws all
            mgDrawBG(candt, MUTED_WHITE)

            

            // Draw to real
            mgDrawToReal(candt)
            fc++
        })
        mgTick()

        // drawMonoImage(candt, mgMookbongLayg, 40, 40)
    })
}
//js/main.js
const debug = true

const MM_ASSETS_LIST = [
    "assets/titlescreen.jpg",
    "css/GCursive.ttf",
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
]

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
    return Promise.resolve()
    // for (const item of list) {
    //     await new Promise((resolve, reject) => {
    //         $('#lt2').text(`${item}`)

    //         let img, loadedEvent
    //         if (item.endsWith('.png') || item.endsWith('.jpg') || item.endsWith('.bmp')) {
    //             img = new Image()
    //             loadedEvent = 'onload'
    //         } else if (item.endsWith('.ogg') || item.endsWith('.mp3')) {
    //             img = new Audio()
    //             loadedEvent = 'oncanplaythrough'
    //         } else if (item.endsWith('.ttf') || item.endsWith('.woff')) {
    //             fetch(item).then(resolve)
    //             loadedEvent = null
    //         } else {
    //             resolve()
    //             return
    //         }

    //         if (loadedEvent !== null) {
    //             img.src = item
    //             img[loadedEvent] = resolve
    //             // console.log('iter ' + item)
    //         }
    //     })
    // }
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
        .append($(`<div id="saveens" class="panel">`)
            .append($(`<pre id="saveens-text"><span class="saveens-dollar">$</span><span class="saveens-amount"></span></pre>`))
        )
        .append($(`<div class="canvas-container" id="mookbong-canvas-container">`)
            .append($(`<canvas class="mg-canvas" id="mookbong-canvas" width="160" height="90" tabindex="-1">`))
            .append($(`<div class="mg-image gg">`))
        )
        .append($(`<div class="canvas-container" id="books-canvas-container">`)
            .append($(`<canvas class="mg-canvas" id="books-canvas" width="1280" height="720">`))
            .append($(`<div class="mg-image">`))
        )
        .append($(`<div class="canvas-container" id="phone-canvas-container">`)
            .append($(`<canvas class="mg-canvas" id="phone-canvas" width="1280" height="720">`))
            .append($(`<div class="mg-image">`))
        )
)

hook('before', async function() {
    await bufferAssets( DIAG_ASSETS_LISTS[0] )
    await bufferAssets( DIAG_ASSETS_LISTS[save.chapter] )
})

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
