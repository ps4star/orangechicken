const RIZO_ISLAND_MUSIC_DT = {
    url: "assets/music/cf.ogg",
    loops: true,
    initStart: 0,
    start: 1.65,
    end: 166.08,
}

const CALD_MUSIC_DT = {
    url: "assets/music/cald.ogg",
    loops: true,
    initStart: 0,
    start: 1.5,
    end: 93.3,
}

const ALRTHEME_MUSIC_DT = {
    url: "assets/music/alrtheme.ogg",
    loops: true,
    initStart: 0,
    start: 0,
    end: 93,
}

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
pose 0 pissed
lynn angry
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
lynn bored
talk 0 "Ughh okayyy fine."
talk - (waitress takes Amber & Becky's orders)
leave 2
talk 1 "Look, I found this Orange Chicken recipe on Facebook."
pose 0 frowny
lynn frowny
talk - (Amber doesn't pay attention and stays quiet, still pissed, with a frown on her face)
talk 1 "See, it looks just like the Orange Chicken they have here."
pose 0 pissed
lynn angry
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
pose 0 leaveen
lynn leaveen
sfx assets/sfx/leaveen.ogg
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
lynn bored
talk 0 "Becky, I can't do this. I can't live without Cheesecake Factory's Orange Chicken."
talk 2 "Babe, like I said you can just look up a recipe online. Why is it such a big deal?"
talk 0 "I knoowww but then it won't taste like Cheesecake Factory'sss."
talk 2 "I dunno then. Just try looking it up."
talk 0 "Ughh I doubt it'll be there but I'll checkk."
talk 0 ... ... ...
pose 0 gasp
lynn gasp
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
lynn laser
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
lynn heyguys
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
lynn feeder
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
lynn angry
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
sfx assets/sfx/leaveen.ogg
talk 0 "I'm leaaveeeeeeeen."

if eq hasSeenLeaveenLynn 1
talk 1 "Amber..."
talk 0 "Yes?"
talk 1 "Do you always have to do that when you're leavin' somewhere?"
sfx assets/sfx/leaveen.ogg
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
gotofade rotisserie_2
`,
    },

    "rotisserie_2": {
        inherits: "rotisserie",
        diag: `
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
lynn heyguys
pose 1 useless
talk 0 "Hey you guuys so me and Becky are at Bookland."
talk 1 "Buying useless things."
lynn reader
pose 0 books
sfx assets/sfx/books.ogg
shakestart 0
talk 0 "Uhh, books is good for the brain??"
gotofade books_2
`,
    },

    "books_2": {
        inherits: "books",
        diag: `
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
`
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
lynn bored
talk - (Amberlynn is uploading the video she just filmed)
talk 0 "... ... ..."
talk 0 "I'm waaaaaaaaaaiteeeeeeeeeeeeeeeeeen."
talk 0 "... ... ..."
talk - (The video finishes uploading)
pose 0 normal
talk 0 "Finally it's done."
talk 0 "... ... ..."
talk 0 "Gonna read a few comments real quick."
talk - (Amberlynn reids the comments)

if eq lastChapter 3
setvar _com_seq 1
endif

if eq lastChapter 4
setvar _com_seq 2
endif

if eq lastChapter 5
setvar _com_seq 3
endif

gotofade haul_2
`,
    },

    "haul_2": {
        inherits: "haul",
        diag: `
callawait mgComments
`,
    },

    // Chapter ?? (SALMON)
    "salmon": {
        bg: "kitchen.png",
        music: [ RIZO_ISLAND_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"] ],
        diag: `
; TODO: determine which chapter this fits into
chapter 7
enter 0
pose 0 heyguys
lynn heyguys
talk 0 "Hey guiiiise so welcome to a new vlog."
talk 0 "I'm kinda nervous right now you guise, cuuuz I'm makeen fresh salmon for the first time ever."
talk 0 "First thing we're gonna grab is some aluuuminuuuuuum foiiiyuhlll."

; _diag_type is a special var in binary format; 4-bit
; == 0 is the default setting
; Bit 0 = INSTANT_SPEED
; Bit 1 = IMMEDIATE_EXIT (often used with delay; auto finish text command when text is fully rendered without user input)
setvar _diag_type 3
; so in the above case we're setting to 0b0011 - instant + no user input required, mixed with a delay cmd afterwards
sfx assets/sfx/foil.ogg 0.9
talk - (Amberlynn grabs foil)
delay 2000
setvar _diag_type 0
pose 0 holdingsalmon
talk 0 "Ok so we have a salmon moment right here.."
talk 0 "Mmmm I don't really wanna tooouch it though, like ewwww."

multi
Use Fork
salmon_fork
Use Hands
salmon_hands
`,
    },

    "salmon_hands": {
        inherits: "salmon",
        diag: `
talk - (Amberlynn easily gets it out with hands)
pose 0 disgusted
talk 0 "Sooo gross you guise I can't even."
`,
    },

    "salmon_fork": {
        inherits: "salmon",
        diag: `
talk - (Amberlynn struggles to get salmon out with fork)
pose 0 pissed
talk 0 "UGGGH THIS IS SO HARD YOU GUISE FAWK."
talk - (Amberlynn finally gets it)
goto salmon_2
`,
    },

    "salad": {
        bg: "pillowmountain.png",
        music: [ CALD_MUSIC_DT ],
        //Is there a middle position on screen?
        stage: [ ["left_back", "Amberlynn"], ["hflip", "right_front", "Becky"] ],
        diag: `
chapter 8
enter 0
pose 0 heyguys
lynn heyguys
talk 0 "Okay you guise, I'm like literally starveeen. I haven't yet ate yet today."
talk 0 "So Beckyyyy is gonna go pick up some food for us."
enter 1
pose 1 useless
talk 1 "Hey, I got the food babe."
pose 0 frowny
talk 0 "You took literally forever, Becky."
pose 0  gasp
lynn gasp
;pose 1 sadbeck     sadbeck is not an asset.  Could be fun to expand her reactions
talk 0 "Anyway guise let's start our mookbong. Wow, this all look so good."
talk 1 "That's a lot of food, did you get some for me?"
pose 0 cacklelynn
lynn cackle
talk 0 "No Beckeh hahaha. You're so funneh."
pose 1 normal
talk 1 "Can I try some?"
post 0 pissed
lynn angry
sfx assets/sfx/breatheen.ogg 99.0
talk - (Amber breathes heavily)
shakestart 0
talk 0 "No beckeeeeeh, go eat the edamommy I made last night. I've been craveen this all dayyyyyyyuhh."
;pose 1 sadbeck
talk 1 "I'll just go watch Naruto."
leave 1
shakeend 0
pose 0 closedeyes
talk 0 "Okay guise, so Becky is gonna watch nuh-ROO-dough."
sfx assets/sfx/excite.ogg 0.9
talk 0 "Let's see what food we got, I'm so excited."
pose 0 normal
talk 0 "So we haveeee, let's see, this pastaaa."
talk 0 "I bought three cause their serveens are super small you guise."
enter 1
pose 1 useless
talk 1 "That looks good babe, what type of pasta is it?"
talk 0 "So it's like this tomato sauce, with chicken, I think?"
pose 0 frowny
lynn frowny
talk 0 "And we got some breadsticks here, can't believe they only gave me ten, like wut."
pose 0 gasp
lynn gasp
sfx assets/sfx/bigsalad.ogg 1.9
talk 0 "Oh wow I didn't realize it came with this huuuuuge salad."
talk 0 "You guise lidurally I didn't even know it was this big that's so weird."
talk 0 "Like honestleee I thought it was gonna be super small you guise I dunno if I can like eat this."
talk 1 "Can I have some then?"

multi
Let Becky have some salad
becky_salad
No beckehhh, I love veggies
amber_salad
`,
    },
    
    "becky_salad": {
        inherits: "salad",
        diag: `
affectionchange %AFFCHANGE_INDEX% Becky 15
pose 0 normal
pose 1 normal
talk 0 "You guise I'm literally so nice. That salad was so big I couldn't eat it all. "
;pose 1 confusedbeck        confusedbeck is not an asset
talk 1 "Babe did you eat the croutons out of this?"
pose 0 books
lynn reader
talk 0 "Beckehhh, I can't believe you would say that."
talk 0 "Don't you see I'm dealeen with a video situation type deal?!"
pose 0 laptopyt
leave 1
talk 0 "Anyway, I'm gonna upload this now."
incvisit
gotofadenewchapter 9
`,
    },
    
    "amber_salad": {
        inherits: "salad",
        diag: `
pose 0 laser
lynn laser
shakestart 0
talk 0 "NO BECKEEEE GET OUT OF HERE."
leave 1
shakeend 0
sfx assets/sfx/looksreallygood.ogg
pose 0 normal
talk 0 "So this actually looks really good you guise.."
talk - (Amber eats the pasta and breadsticks on camera)
talk 0 "So you guys, I'm feeling so stuffed."
talk 0 "I'm gonna eat this salad type deal thing later, maybe for like dinner."
pose 0 laptoptemplate
lynn laptop
talk - "(Amber Lynn cuts the video)"
pose 0 pissed
talk 0 "Beckehhhhhhhhh!"
enter 1 useless
talk 1 "Babe stop yelling like that, what's wrong?"
pose 0 cacklelynn
talk 0 "This salad is so raw Becky, FAWK. I don't want it."
talk 0 "Just take it out of here I don't even wanna be near it. Make me some more pasta."
incvisit
gotofadenewchapter 9
`,
    },

    "sofa": {
        bg: "pillowmountain.png",
        music: [ CALD_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"], ["hflip", "right_front", "Becky"] ],
        diag: `
chapter 9
enter 0
pose 0 pissed
talk 0 "BECKEHHHHHH!"
enter 1
talk 1 "Amberlynn stop screaming, what's wrong?"
talk 0 "You broke the sofeh."
talk 1 "Babe, no I didn't, you did that last night."
shakestart 0
talk 0 "No Becky stop lyeen."
talk - (Amberlynn looks at the camera nervously.)
shakeend 0
pose 0 shocked
talk 0 "I can't break the sofa, I'm a super dainty gorl rememberer???"
pose 0 books
talk 0 "You guise she is totally sayeen I'm big."
pose 1 useless
talk 1 "Amberlynn, no one said that."
talk 1 "You broke it last night when you sat on it babe."

multi
Insist that Becky broke it
sofa_becky
Confess that you broke it
sofa_amber
`,
    },

    "sofa_becky": {
        inherits: "sofa",
        diag: `
pose 0 laser
shakestart 0
talk 0 "BECKEHHHH! STOP LYEEEEEEN!"
shakeend 0
pose 0 frowny
talk 0 "It's not even funny anymore."
talk 0 "You guise don't believe her."
affectionchange %AFFCHANGE_INDEX% Becky -5
pose 1 normal
talk 1 "I don't really care, Amberlynn."
talk - (Amberlynn cuts the camera.)
pose 0 laptoptemplate
talk 0 "Beckyyyy, why didn't you just say you broke eeeet?"
talk 0 "You don't love me."
pose 0 frowny
talk 1 "Why would I lie about that."
talk 1 "Just tell them the truth babe, it's not a big deal."
pose 0 pissed
talk 0 "Becky, you don't understand!"
pose 0 bored
talk 0 (Wait, this would make such a great poem... About how nobodee understands me.)
pose 1 useless
talk 1 "Okay well I'm gonna go cook dinner."
pose 0 normal
talk 0 "Wait Beckeeeh, I was gonna make chili tonight."
incvisit
gotofadenewchapter 10
`,
    },

    "sofa_amber": {
        inherits: "sofa",
        diag: `
pose 0 cacklelynn
talk 0 "Oh wait... I remember."
pose 0 normal
talk 0 "It totally was me guise."
talk 0 "This sofa is super old, so yeah that's what lead to that situation type deal."
affectionchange %AFFCHANGE_INDEX% Becky +5
pose 0 laptoptemplate
talk - (Amber shuts the camera off.)
talk 1 "Thanks for telling them the truth, I'm gonna go cook dinner babe."
pose 0 pissed
talk 0 "No beckehhh I'm makeen chili for my next video."
incvisit
gotofadenewchapter 10
`,
    },

    "chili": {
        bg: "pillowmountain.png",
        music: [ CALD_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"], ["hflip", "right_front", "Becky"] ],
        diag: `
chapter 10
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