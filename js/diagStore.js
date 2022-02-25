const RIZO_ISLAND_MUSIC_DT = ["assets/music/cf.ogg", true, 0, 1.65, 166.32]

const ALL_DIAGS = {
    "shortage": {
        bg: "cf.png",
        // [ ["assets/music/original_cf.ogg", true, 0, 1.65, 166.32] ] for cf.mp3 (rizo island)
        music: [ RIZO_ISLAND_MUSIC_DT ],
        stage: [ ["left_back", "Amberlynn"], ["left_front", "Becky"], ["hflip", "right_front", "C.F. Waitress"] ],
        diag: `
chapter 1
enter 0
enter 1
pose 0 bored
talk - (Amberlynn & Becky are waiting at a table in Cheesecake Factory)
talk - ... ... ...
enter 2
pose 0 excited
talk 0 "Finally the waiter is heeere, I'm getting so hongry..."
talk 2 "Hi, welcome to Cheesecake Factory, what will you guys be having today?"
talk 0 "Yeah I'll get 4 orders of the Orange Chicken..."
talk 2 "I'm sorry, we ran out of that yesterday. Something about a national shortage."
lynn angry
pose 0 pissed
talk 0 "But you always have it here! We drove like 2 hourssss!"
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
pose 0 bored
talk 0 "Ughh okayyy fine."
talk - (waitress takes Amber & Becky's orders)
leave 2
talk 1 "Look, I found this Orange Chicken recipe on Facebook."
talk - (Amber doesn't pay attention and stays quiet, still pissed, with a frown on her face)
talk 1 "See, it looks just like the Orange Chicken they have here."
talk 0 "But it's not the saaaaaame!"
pose 0 pissed
talk - (Amber slams her fists on the table)
talk 0 "Becky, you don't get it. I like, HAVE to have Orange Chicken, kay?"
enter 2
talk 2 "Alright ma'am here's your order."
talk 1 "Thanks..."
leave 2
talk 0 "Becky, I've had enough of this. Take your food, we're goeen home right now."
gotofadenewchapter 2
`,
    },

    "shortage_leave": {
        inherits: "shortage",
        diag: `
lynn leaveen
pose 0 leaveen
sfx assets/sfx/leaveen.aac
talk 0 "I'm leaaveeeeeeeen."
gotofadenewchapter 2
`,
    },

    "craygslist": {
        bg: "pillowmountain.png",
        music: [ ["assets/music/alrtheme.ogg", true, 0, 0, 93] ],
        stage: [ ["left_back", "Amberlynn"], ["hflip", "right_front", "Becky"] ],
        diag: `
chapter 2
enter 0
enter 1
pose 0 bored
talk 0 "Becky, I can't do this. I can't live without Cheesecake Factory's Orange Chicken."
talk 1 "Babe, like I said you can just look up a recipe online. Why is it such a big deal?"
talk 0 "I knoowww but then it won't taste like Cheesecake Factory'sss."
talk 1 "I dunno then. Just try looking it up."
talk 0 "Ughh I doubt it'll be there but I'll checkk."
talk 0 ... ... ...
lynn gasp
pose 0 gasp
talk 0 "Oh muh gah, I think I found sometheen!"
talk 1 "What is it?"
talk 0 "I went on Craygslist and there's apparently this super smart chef guy who can re-create the recipe!"
talk 0 "Let's see how much he wants for it..."
pose 0 shocked
talk 0 "FIVE THOUSAND?"
talk 1 "Babe you know we can't afford that."
talk 0 "I don't care Beckyyy we have to hire him."
talk 1 "We don't even have five thousand NOW, how are we gonna get the money?"
pose 0 normal
talk 0 "I know how. I just have to really get serious about vlogeen."
talk 0 "If I put out highly-requested videos then I'll get more money from YouTube."
talk 0 "Here I'll akshually go get a saveens jar for it."
unlocksaveens
gotofade craygslist_after
`,
    },

    "craygslist_after": {
        inherits: "craygslist",
        diag: `
talk 0 "Now I need to just block the haydurs and take down these reaction channels that are stealeen my views, that'll help."
talk 1 "What kind of content would get people to watch?"
talk 0 "Hmm let me scroll through the comments real quick..."
talk 0 ... ... ...
talk 0 "Okayyy sooo I saw about 40 comments and 1 person said they wanted another torrid haul. Seems like it's very highly-requested."
talk 0 "Come on Beckeeee we have to go to Torrid."
talk 1 "Babe I wanna finish this episode of SpongeBob first. Plus we already drove 4 hours today. Let's just take a break for today."
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
gotofadenewchapter 3
`,
    },

    "craygslist_mookbong": {
        inherits: "craygslist",
        diag: `
talk 0 "Ugh fine I'll just do a mook-bong then."
gotofadenewchapter 4
`,
    },

    "torrid": {
        bg: "torrid.jpg",
        music: [ ["assets/music/cf.ogg", true, 0, 0, 93] ],
        stage: [ ["left_back", "Amberlynn"], ["hflip", "right_back", "Becky"] ],
        diag: `
chapter 3
enter 0
enter 1
talk 0 "We're heeeere"
talk 0 "Ohmuhgod there are so many cute dresses
`,
    },

    "rotisserie": {
        bg: "pillowmountain.png",
        music: [ ["assets/music/alrtheme.ogg", true, 0, 0, 93] ],
        stage: [ ["left_back", "Amberlynn"] ],
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
copymoneytoreal
talk 0 "Mmmm that was so good you guiiisee."
talk 0 "Definitely saving this for later, like, ohmuhgosh."
gotofadeoutnewchapter 5
`,
    },
}