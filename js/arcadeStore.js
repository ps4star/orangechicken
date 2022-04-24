const ARCADE_GAMES = [
	[ "Rotisserie Ninja", "assets/actors/amberlynn_mook-bong.png", { mgFunc: "mgMookbong" } ],
	[ "Books is Good for the Brain", "assets/actors/amberlynn_books.png", { mgFunc: "mgBooks" } ],

	// TODO: make putting in -1 to mgALRDDR() bring up a menu where user can choose songs to play
	[ "Alr-Ddr", "assets/alrddr/ddr_up.png", { mgFunc: "mgALRDDR", mgArgs: [ 0 ] } ],
]

const NUM_ARCADE_GAMES = ARCADE_GAMES.length