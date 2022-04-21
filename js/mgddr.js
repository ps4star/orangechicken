const DDR_IMG_EXERCISE_FRAME_0 = getImage("assets/alrddr/exercise_0.png")
const DDR_IMG_EXERCISE_FRAME_1 = getImage("assets/alrddr/exercise_1.png")
const DDR_IMG_EXERCISE_FRAME_2 = getImage("assets/alrddr/exercise_2.png")

const DDR_IMG_DANCE_FRAME_2 = getImage("assets/alrddr/dance_2.png")
const DDR_IMG_DANCE_FRAME_3 = getImage("assets/alrddr/dance_3.png")

const DDR_IMG_HAIR_FRAME_1 = getImage("assets/alrddr/hair_1.png")
const DDR_IMG_HAIR_FRAME_2 = getImage("assets/alrddr/hair_2.png")

const DDR_IMG_DANCE2_FRAME_0 = getImage("assets/alrddr/dance2_0.png")
const DDR_IMG_DANCE2_FRAME_1 = getImage("assets/alrddr/dance2_1.png")
const DDR_IMG_DANCE2_FRAME_2 = getImage("assets/alrddr/dance2_2.png")

const DDR_ARR_LEFT = getImage("assets/alrddr/ddr_left.png")
const DDR_ARR_DOWN = getImage("assets/alrddr/ddr_down.png")
const DDR_ARR_UP = getImage("assets/alrddr/ddr_up.png")
const DDR_ARR_RIGHT = getImage("assets/alrddr/ddr_right.png")

const DDR_ACC_LEFT = getImage("assets/alrddr/ddr_lefta.png")
const DDR_ACC_DOWN = getImage("assets/alrddr/ddr_downa.png")
const DDR_ACC_UP = getImage("assets/alrddr/ddr_upa.png")
const DDR_ACC_RIGHT = getImage("assets/alrddr/ddr_righta.png")

const DDR_TYPE_AUTO = 1
const DDR_TYPE_MAN = 2

const DDR_ACC_LIST = [
	DDR_ACC_LEFT, DDR_ACC_DOWN, DDR_ACC_UP, DDR_ACC_RIGHT,
]

const DDR_ALL_IMGS = [
	DDR_IMG_EXERCISE_FRAME_0,
	DDR_IMG_EXERCISE_FRAME_1,
	DDR_IMG_EXERCISE_FRAME_2,
	DDR_IMG_DANCE_FRAME_2,
	DDR_IMG_DANCE_FRAME_3,
	DDR_IMG_HAIR_FRAME_1,
	DDR_IMG_HAIR_FRAME_2,
	DDR_ARR_LEFT,
	DDR_ARR_DOWN,
	DDR_ARR_UP,
	DDR_ARR_RIGHT,
	DDR_ACC_LEFT,
	DDR_ACC_DOWN,
	DDR_ACC_UP,
	DDR_ACC_RIGHT,
	DDR_IMG_DANCE2_FRAME_0,
	DDR_IMG_DANCE2_FRAME_1,
	DDR_IMG_DANCE2_FRAME_2,
]

const DDR_EXERCISE_ANIM_DATA = Object.freeze({
	type: DDR_TYPE_AUTO,
	restFrame: 0,
	frames: [
		DDR_IMG_EXERCISE_FRAME_0,
		DDR_IMG_EXERCISE_FRAME_1,
		DDR_IMG_EXERCISE_FRAME_1,
		DDR_IMG_EXERCISE_FRAME_2,
		DDR_IMG_EXERCISE_FRAME_2,
		DDR_IMG_EXERCISE_FRAME_2,
		DDR_IMG_EXERCISE_FRAME_1,
		DDR_IMG_EXERCISE_FRAME_1,
	],
})

const DDR_DANCE_ANIM_DATA = Object.freeze({
	type: DDR_TYPE_MAN,
	frames: [
		DDR_IMG_DANCE_FRAME_2,
		DDR_IMG_DANCE_FRAME_3,
	],
})

const DDR_HAIR_ANIM_DATA = Object.freeze({
	type: DDR_TYPE_MAN,
	frames: [
		DDR_IMG_HAIR_FRAME_1,
		DDR_IMG_HAIR_FRAME_2,
	],
})

const DDR_DANCE2_ANIM_DATA = Object.freeze({
	type: DDR_TYPE_MAN,
	frames: [
		DDR_IMG_DANCE2_FRAME_0,
		DDR_IMG_DANCE2_FRAME_1,
		DDR_IMG_DANCE2_FRAME_2,
		DDR_IMG_DANCE2_FRAME_1,
	],
})

const DDR_SONG_LIST = [
	{
		name: "Kameeno Princess",
		url: "assets/music/kameeno_princess.ogg",
		bgDt: [
			DDR_EXERCISE_ANIM_DATA,
			DDR_DANCE_ANIM_DATA,
			DDR_HAIR_ANIM_DATA,
			DDR_DANCE2_ANIM_DATA,
		],
		dt: SDT_KAMEENO,
	},
]

const DDR_INITIAL_OFFSET = 650

const DDR_WasdKeys = [ "w", "a", "s", "d" ]

let DDR_State, DDR_SongDt, DDR_Ctx
function DDR_ClearInputState() {
	DDR_State.inputState = {
		clicked: false,
		cx: 0,
		cy: 0,

		keyed: false,
		whichKeys: [],
	}
}

function DDR_ClearRenderState() {
	DDR_State.render = {
		sparkleStates: [-1, -1, -1, -1],
		bgPtr: 0,

		animFrame: -1,
	}
}

function DDR_ClearState() {
	DDR_State = {
		notes: [],
		bpm: 120,
		div: 1,
		deltaY: 0,
		beatMS: 0,

		cScore: 0,

		beatsElapsed: 0,
		nextBeatAdjust: 0,
		expectedTime: 0,
		startTime: 0,

		inputState: {}, // inputState + drawingParams are set by later funcs
		drawingParams: {},

		render: {},
	}
	DDR_ClearInputState()
	DDR_ClearRenderState()
}

function DDR_UpdateDrawingParams(sw, sh) {
	const aHeight = sh / 6
	DDR_State.drawingParams = {
		arrowStart: sw / 4,
		arrowWidth: sw / 8,

		arrowYStart: 16,
		arrowHeight: aHeight,

		sw,
		sh,
	}
}

let $DDR_DOM_Calories
function DDR_SetDOMInputs({ calories }) {
	$DDR_DOM_Calories = calories
}

function DDR_SetCandt(candt) {
	DDR_Ctx = candt.ctx
	DDR_UpdateDrawingParams(candt.sw, candt.sh)
}

function DDR_SetSongPtr(num) {
	DDR_SongDt = DDR_SONG_LIST[num]
}

const DDR_BASE_SPEED = 28
function DDR_RunBPMCalc() {
	DDR_State.deltaY = DDR_State.div / 2 * DDR_State.bpm / DDR_BASE_SPEED // speed at which notes rise
	// Now we can also set up a beatMS value; number of milliseconds per beat at current bpm
	DDR_State.beatMS = ((1 / DDR_State.div) / (DDR_State.bpm / 60)) * 1000
}

function DDR_SubmitKeyEvent(e) {
	DDR_State.inputState.keyed = true
	DDR_State.inputState.whichKeys.push(e.key)
}

function DDR_SubmitClickEvent(e) {
	DDR_State.inputState.clicked = true
	DDR_State.inputState.cx = e.clientX
	DDR_State.inputState.cy = e.clientY
}

// function DDR_CheckUsefulKeyPress() {
// 	const instate = DDR_State.inputState
// 	const key = instate.whichKeys.toLowerCase()
// 	let whichLane = -1

// 	if (key === 'arrowleft') {
// 		whichLane = 0
// 	} else if (key === 'arrowdown') {
// 		whichLane = 1
// 	} else if (key === 'arrowup') {
// 		whichLane = 2
// 	} else if (key === 'arrowright') {
// 		whichLane = 3
// 	}

// 	return {
// 		useful: whichLane > -1,
// 		whichLane,
// 	}
// }

// function DDR_CheckUsefulClick() {
// 	let whichLane = -1
// 	const instate = DDR_State.inputState
// 	const dp = DDR_State.drawingParams

// 	for (let i = 0; i < 4; i++) {
// 		const startX = (i * dp.arrowWidth) + dp.arrowStart
// 		if (isRectOverlap(startX, dp.arrowYStart, dp.arrowWidth, dp.arrowheight, instate.cx, instate.cy, 1, 1)) {
// 			whichLane = i
// 		}
// 	}

// 	return {
// 		useful: whichLane > -1,
// 		whichLane,
// 	}
// }

function DDR_IsNoteInAcceptorBounds(note, requiredLane) {
	const dp = DDR_State.drawingParams

	const nx = note[0] + ((note[3]) ? dp.arrowWidth / 2 : 0)
	const ny = note[1] + ((note[3]) ? dp.arrowHeight : 0)
	const lane = note[2]

	if (requiredLane !== lane) {
		return false
	}

	return isRectOverlap(nx, ny, dp.arrowWidth, dp.arrowHeight,
		dp.arrowStart + (dp.arrowWidth*lane), dp.arrowYStart, dp.arrowWidth, dp.arrowHeight)
}

function DDR_NoteHit(note) {
	// if (note[3].swFlag) {
	// 	DDR_State.render.bgPtr = (DDR_State.render.bgPtr + 1) % DDR_SongDt.bgDt.length
	// 	DDR_PutNewBG()
	// }

	DDR_State.render.sparkleStates[note[2]] = 0
}

const DDR_NOTE_VALUE = 5
function DDR_NoteScore() {
	DDR_State.cScore += DDR_NOTE_VALUE
	$DDR_DOM_Calories[0].firstChild.firstChild.innerText = DDR_State.cScore

	pushAmountChangeText($DDR_DOM_Calories, DDR_NOTE_VALUE, "calories", "white", "darkred")
}

function DDR_PushNote(noteLine) {
	noteLine.forEach((lane, idx) => {
		const dp = DDR_State.drawingParams
		const numLane = typeof lane === 'string' ? parseInt(lane) : lane

		DDR_State.notes.push([
			(numLane * dp.arrowWidth) + dp.arrowStart, // 0 = xpos
			DDR_INITIAL_OFFSET, // 1 = ypos
			numLane, // 2 = lane
			0, // 3 = flags (always falsy for non-ethereals)
			noteLine.length > 1 ? false : true, // 4 = isLast in chord. always false for singles. for chords, last note is true
		])
	})
}

function DDR_PushEtherealNote(flags) {
	DDR_State.notes.push([
		DDR_State.drawingParams.arrowStart,
		DDR_INITIAL_OFFSET,
		0,
		flags,
	])
}

function DDR_AdvanceBG() {
	// Current bg state
	const bgdt = DDR_SongDt.bgDt[DDR_State.render.bgPtr]
	if (bgdt.type === DDR_TYPE_AUTO) {
		DDR_State.render.animFrame = 0
		DDR_State.render.animAuto = true
	} else {
		DDR_State.render.animFrame = (DDR_State.render.animFrame + 1) % bgdt.frames.length
		DDR_State.render.animAuto = false
	}
}

function DDR_PutNewBG() {
	const bgdt = DDR_SongDt.bgDt[DDR_State.render.bgPtr]
	if (bgdt.type === DDR_TYPE_AUTO) {
		DDR_State.render.animFrame = -1
		DDR_State.render.animAuto = true
	} else {
		DDR_State.render.animFrame = 0
		DDR_State.render.animAuto = false
	}
}

function DDR_CullNulls() {
	for (let i = 0; i < DDR_State.notes.length; i++) {
		if (DDR_State.notes[i] == null) {
			DDR_State.notes.splice(i--, 1)
		}
	}
}

function DDR_Tick() {
	const instate = DDR_State.inputState
	const dp = DDR_State.drawingParams

	let hasHit = false

	// Goes through and updates all notes
	for (let i = 0; i < DDR_State.notes.length; i++) {
		const cnote = DDR_State.notes[i]
		if (cnote == null) {
			continue
		}

		// Update pos
		// 0 = xpos
		// 1 = ypos
		// 2 = lane (0-3)
		cnote[1] -= DDR_State.deltaY
		if (cnote[1] <= -100) {
			DDR_State.notes[i] = null
			continue
		}

		// Check for key presses
		if (hasHit) continue

		// Process note flags
		if (cnote[3]) {
			const acceptorCheck = DDR_IsNoteInAcceptorBounds(cnote, cnote[2]) // having lane conditions both be the same ensures a raw check for collision

			if (acceptorCheck) {
				if (cnote[3].swFlag) {
					// Switch bg
					DDR_State.render.bgPtr = (DDR_State.render.bgPtr + 1) % DDR_SongDt.bgDt.length
					DDR_PutNewBG()
				}

				if (cnote[3].divFlag) {
					// Switch div
					DDR_State.div = cnote[3].divFlagAmount
					DDR_RunBPMCalc()
				}

				cnote[3] = { ethereal: cnote[3].ethereal }
			}

			continue
		}

		if (instate.keyed) {
			const keys = instate.whichKeys

			// If we did hit an arrow key, we now need to check collision
			let didHit = false
			keys.forEach(key => {
				let whichLane = -1
				if (key.startsWith("Arrow")) {
					if (key === 'ArrowLeft') {
						whichLane = 0
					} else if (key === 'ArrowDown') {
						whichLane = 1
					} else if (key === 'ArrowUp') {
						whichLane = 2
					} else if (key === 'ArrowRight') {
						whichLane = 3
					}

					if (DDR_IsNoteInAcceptorBounds(cnote, whichLane)) {
						DDR_AdvanceBG()
						DDR_NoteScore()

						DDR_NoteHit(cnote)
						DDR_State.notes[i] = null
						didHit = true
					}
				}
			})

			if (didHit && cnote[4]) {
				hasHit = true
			}
		}
	}

	DDR_CullNulls()
	DDR_ClearInputState()
}

// const DDR_ARR_LEFT = getImage("assets/alrddr/ddr_left.png")
// const DDR_ARR_DOWN = getImage("assets/alrddr/ddr_down.png")
// const DDR_ARR_UP = getImage("assets/alrddr/ddr_up.png")
// const DDR_ARR_RIGHT = getImage("assets/alrddr/ddr_right.png")

// const DDR_ACC_LEFT = getImage("assets/alrddr/ddr_lefta.png")
// const DDR_ACC_DOWN = getImage("assets/alrddr/ddr_downa.png")
// const DDR_ACC_UP = getImage("assets/alrddr/ddr_upa.png")
// const DDR_ACC_RIGHT = getImage("assets/alrddr/ddr_righta.png")

const DDR_SPARK_BASE_R = 20
const DDR_NUM_SPARKLES = 16
const DDR_SPARKLE_LIFE = 12

const DDR_FTRIG = new window.FTrig(window.FTrig.LOW)

function DDR_Draw() {
	const dp = DDR_State.drawingParams

	// bgdt is a { type: ..., frames: ..., [restFrame]: ... } structure
	const bgdt = DDR_SongDt.bgDt[DDR_State.render.bgPtr]

	if (bgdt.type === DDR_TYPE_AUTO) {
		if (DDR_State.render.animFrame > -1) {
			DDR_State.render.animFrame++
			if (DDR_State.render.animFrame >= bgdt.frames.length) {
				DDR_State.render.animFrame = -1
			}
		}
	}

	let finalDrawingFrame = DDR_State.render.animFrame
	if (DDR_State.render.animFrame < 0) {
		finalDrawingFrame = 0
	}

	const currentBgImage = bgdt.frames[finalDrawingFrame]

	// First we gotta draw the current bg
	DDR_Ctx.drawImage(currentBgImage, 0, 0, dp.sw, dp.sh)

	// Draw acceptors
	const dimBuffs = [0, 0, 0, 0]
	DDR_State.render.sparkleStates.forEach((sparkle, idx) => {
		if (sparkle > -1) {
			dimBuffs[idx] = Math.floor((DDR_SPARKLE_LIFE - sparkle) * 1.5)
		} else {
			dimBuffs[idx] = 0
		}

		const finalW = dimBuffs[idx] + dp.arrowWidth
		const finalH = dimBuffs[idx] + dp.arrowWidth

		DDR_Ctx.drawImage(DDR_ACC_LIST[idx], dp.arrowStart + (dp.arrowWidth * idx) - dimBuffs[idx] / 2, dp.arrowYStart - dimBuffs[idx] / 2, finalW, finalH)
	})

	// Draw notes
	DDR_State.notes.forEach(note => {
		if (note[3]) {
			return
		}

		let noteImg = null
		if (note[2] === 0) {
			// Left
			noteImg = DDR_ARR_LEFT
		} else if (note[2] === 1) {
			// Down
			noteImg = DDR_ARR_DOWN
		} else if (note[2] === 2) {
			// Up
			noteImg = DDR_ARR_UP
		} else if (note[2] === 3) {
			// Right
			noteImg = DDR_ARR_RIGHT
		} else {
			// ???
			console.log(note)
		}

		DDR_Ctx.drawImage(noteImg, note[0], note[1], dp.arrowWidth, dp.arrowHeight)
	})

	// Effects
	DDR_State.render.sparkleStates.forEach((sparkle, idx) => {
		if (sparkle === -1) {
			return
		}

		// Draw sparkle effect
		const finalRadius = sparkle * 3 + DDR_SPARK_BASE_R
		// x = r * cos(2*PI*a)
		// y = r * sin(2*PI*a)
		for (let i = 0; i < DDR_NUM_SPARKLES; i++) {
			const x = finalRadius * DDR_FTRIG.cos(2 * Math.PI * (i / DDR_NUM_SPARKLES))
			const y = finalRadius * DDR_FTRIG.sin(2 * Math.PI * (i / DDR_NUM_SPARKLES))

			DDR_Ctx.fillStyle = "blue"
			DDR_Ctx.fillRect(x + dp.arrowStart + (dp.arrowWidth * idx) + (dp.arrowWidth / 2), y + dp.arrowYStart + (dp.arrowHeight / 2), 3, 3)
		}

		DDR_State.render.sparkleStates[idx]++
		if (DDR_State.render.sparkleStates[idx] > DDR_SPARKLE_LIFE) {
			DDR_State.render.sparkleStates[idx] = -1
		}
	})
}

const DDR_DebugTime = 116.65
let DDR_DebugIStart = 0
let DDR_DebugOverride = false

async function DDR_CountBeat() {
	await new Promise((resolve, reject) => {
		setTimeout(() => {
			DDR_State.beatsElapsed++
			resolve()
		}, DDR_State.beatMS - DDR_State.nextBeatAdjust)
	})

	// Reset adjust
	DDR_State.expectedTime += DDR_State.beatMS
	DDR_State.nextBeatAdjust = 0

	if (DDR_State.startTime < 1) {
		return
	}

	const relTime = new Date().getTime() - DDR_State.startTime

	if (relTime < DDR_State.expectedTime) {
		DDR_State.nextBeatAdjust = -1 * Math.abs(DDR_State.expectedTime - relTime)
	} else {
		DDR_State.nextBeatAdjust = relTime - DDR_State.expectedTime
	}
}

async function DDR_Parse() {
	const songDt = DDR_SongDt.dt
	const songLines = songDt.split("\n")

	const aud = new Audio(DDR_SongDt.url)
	await new Promise((resolve, reject) => {
		aud.oncanplaythrough = () => {
			aud.volume = save.volume / 100
			
			if (debug && DDR_DebugOverride) {
				DDR_DebugIStart = 1125
			}
			
			resolve()
		}
	})

	for (const img of DDR_ALL_IMGS) {
		await new Promise((_resolve, _reject) => {
			if (img.complete) _resolve()
			img.onload = _resolve
		})
	}

	DDR_State.startTime = new Date().getTime()

	let i = 0
	for (; i < songLines.length; i++) {
		const thisDt = songLines[i]
		if (thisDt) {
			const args = thisDt.split(" ")

			// initialoffset cmd may need to be added
			if (args[0] === 'tempo') {
				DDR_State.bpm = parseFloat(args[1])
				DDR_State.div = parseInt(args[2])
				DDR_RunBPMCalc()

				if (debug && DDR_DebugOverride) {
					i = DDR_DebugIStart
					i--
				}

				setTimeout(() => {
					if (debug && DDR_DebugOverride) {
						aud.currentTime = DDR_DebugTime
					}
					aud.play()
				}, ((DDR_INITIAL_OFFSET / DDR_State.deltaY) * 16.6666667))
			} else if (args[0] === 'sw') {
				// sw means SWITCH background
				// DDR_State.render.bgPtr = (DDR_State.render.bgPtr + 1) % DDR_SongDt.bgDt.length
				// DDR_PutNewBG()
				DDR_PushEtherealNote({
					swFlag: true,
				})
			} else if (args[0] === 'div') {
				DDR_PushEtherealNote({
					divFlag: true,
					divFlagAmount: parseInt(args[1]),
				})
			} else if (args[0] === 'bpm') {
				DDR_PushEtherealNote({
					bpmFlag: true,
					bpmFlagAmount: parseFloat(args[1]),
				})
			} else {
				// assumes note
				const allNotes = thisDt.split("")
				DDR_PushNote(allNotes)
				DDR_State.flags = {}

				//DDR_ExpectedTime = new Date().getTime() + DDR_State.beatMS
				await DDR_CountBeat()
			}
		} else {
			//DDR_ExpectedTime = new Date().getTime() + DDR_State.beatMS
			await DDR_CountBeat()
		}

		// Calc what time we should be at
	}
}