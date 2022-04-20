const CHAPTERS = [
    [ "shortage", "assets/orangechicken.png", {} ], // 1
    [ "craygslist", "assets/actors/amberlynn_gasp.png", {} ], // 2
    [ "torrid", "assets/actors/amberlynn_backwards.png", {} ], // 3
    [ "rotisserie", "assets/actors/amberlynn_mook-bong.png", {} ], // 4
    [ "books", "assets/scenes/bookland.jpg", {} ], // 5
    [ "comments", "assets/actors/amberlynn_laptopyt.png", {} ], // 6
    [ "salmon", "assets/actors/amberlynn_holdingsalmon.png", {} ], // 7 (WIP)
    [ "salad", "assets/actors/amberlynn_salad.png", {} ], // 8 (WIP)
    [ "sofa", "assets/scenes/pillowmountain.png", {} ], // 9 (WIP)
    [ "chili", "assets/actors/amberlynn_bigpot.png", {} ], // 10 (PH)
    [ "wiping", "assets/torrid.png", {} ], // 11 (PH)
    [ "cucumber", "assets/actors/amberlynn_cucumber.png", {} ], // 12 (PH)
    [ "fbi", "assets/actors/frank.png", {} ], // 13 (PH)
    [ "alr-ddr", "assets/ddr_up.png", {} ], // 14 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 15 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 16 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 17 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 18 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 19 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 20 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 21 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 22 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 23 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 24 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 25 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 26 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 27 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 28 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 29 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 30 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 31 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 32 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 33 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 34 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 35 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 36 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 37 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 38 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 39 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 40 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 41 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 42 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 43 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 44 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 45 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 46 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 47 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 48 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 49 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 50 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 51 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 52 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 53 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 54 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 55 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 56 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 57 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 58 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 59 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 60 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 61 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 62 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 63 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 64 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 65 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 66 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 67 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 68 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 69 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 70 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 71 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 72 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 73 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 74 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 75 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 76 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 77 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 78 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 79 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 80 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 81 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 82 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 83 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 84 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 85 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 86 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 87 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 88 (PH)
    [ "salmon", "assets/torrid.png", {} ], // 89 (PH)
]

const NUM_CHAPTERS = CHAPTERS.length