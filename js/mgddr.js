const DDR_SONG_LIST = [
	{ name: "Kameeno Princess", url: "assets/music/kameeno_princess.ogg", },
]

const DDR_SONG_DT = [
`initialoffset 0
bpm 190
`
]

async function parseDdr(songDt) {
	let i = 0
	for (; i < songDt.length; i++) {
		const args = songDt[i].split(" ")
		if (args[0] === 'initialoffset') {
			
		}
	}
}