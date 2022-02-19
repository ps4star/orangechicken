const ALL_DIAGS = {
    "shortage": {
        bg: "cf.png",
        music: [ ["cf", 0, 1.65, 166.42] ],
        stage: [ ["left_back", "Amberlynn"], ["left_front", "Becky"], ["hflip", "right_front", "C.F. Waitress"] ],
        diag: `
pose 0 bored
talk - (Amberlynn & Becky are waiting at a table in Cheesecake Factory)
talk - ... ... ...
pose 0 excited
talk 0 "Finally the waiter is heeere, I'm getting so hongry..."
talk 2 "Hi, welcome to Cheesecake Factory, what will you guys be having today?"
talk 0 "Yeah I'll get 4 orders of the Orange Chicken..."
talk 2 "I'm sorry, we ran out of that yesterday. Something about a national shortage."
talk 0 "But you always have it here! We drove like 2 hourssss!"
talk 1 "Babe calm down, we can just go by Panda Express on the way back."
talk 0 "But I don't like Panda Express Beckyyy it's all like not authentic-ey."
talk - (Amberlynn is visibly furious)
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
talk 0 "Ughh okayyy fine."
talk - (waitress takes Amber & Becky's orders; they're silent for several minutes)
talk 1 "Look, I found this Orange Chicken recipe on Facebook."
talk - (Necky shows phone to Amber)
talk - (video of a girl making orange chicken in her kitchen plays)
talk - (Amber doesn't pay attention and stays quiet, still pissed, and with a frown on her face)
talk 1 "See, it looks just like the Orange Chicken they have here."
talk 0 "But it's not the saaaaaame!"
`,
    },

    "shortage_leave": {
        inherits: "shortage",
        diag: `
lynn leaveen
talk 0 "I'm leaaveeeeeeeen."
`
    },
}