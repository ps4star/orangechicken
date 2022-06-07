let PIC_State

function PIC_ClearInputState() {
	PIC_State.input = {
		clicked: false,
		cx: 0,
		cy: 0,
	}
}

function PIC_ClearRenderState() {
	PIC_State.drawingParams = {
		sw: 0,
		sh: 0,

	}
}

function PIC_ClearState() {
	PIC_State = {
		picPtr: 0,
		drawingParams: {},
	}
	PIC_ClearInputState()
	PIC_ClearRenderState()
}

function PIC_SubmitClickEvent(e) {
	const inp = PIC_State.input
	inp.clicked = true
	inp.cx = e.clientX
	inp.cy = e.clientY
}

function PIC_SetPtr(picPtrAsStr) {
	PIC_State.picPtr = typeof picPtrAsStr === 'string' ? parseInt(picPtrAsStr, 10) : picPtrAsStr
}

function PIC_SetCandt(candt) {
	const sw = candt.sw
	const sh = candt.sh

	const xbase = Math.floor(sw / 10)
	const ybase = Math.floor(sh / 20)

	PIC_State.drawingParams = {
		sw,
		sh,
		ctx: candt.ctx,

		n1: ybase, // shorter dimension of number
		n2: xbase, // longer dimension of number

		sMargX: xbase, // screen margins
		sMargY: ybase,

		imgStartX: xbase * 2,
		imgStartY: ybase * 2,

		imgW: sw - (xbase * 4), // img area on screen
		imgH: sh - (ybase * 4),

		pxScaleW: 1,
		pxScaleH: 1,
	}
}

// I've, been putting together, expert laygoes
const PIC_ImgDt = [
	{ // 0 - piano
		w: 24,
		h: 24,
		// img: getImage("assets/pic/piano.png"),
		dt: [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0], // 0
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0], // 1
			[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0], // 2
			[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0], // 3
			[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0], // 4
			[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0], // 5
			[0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0], // 6
			[0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0], // 7
			[0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0], // 8
			[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0], // 9
			[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0], // 10
			[0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0], // 11
			[0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0], // 12
			[0,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0], // 13
			[0,0,0,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0], // 14
			[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0], // 15
			[0,0,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0], // 16
			[0,0,0,1,1,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0], // 17
			[0,0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0], // 18
			[0,0,0,1,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], // 19
			[0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0], // 20
			[0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], // 21
			[0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], // 22
			[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], // 23
		],
		numbers: [
			[
				[0], [4], [1, 1, 1], [5, 7], [5, 5], [6, 2], [8, 2], [8, 7], [3, 6, 6], [2, 10, 1], [3, 10, 1], [21], [21], [16], [16], [16], [17], [17], [16], [13], [2, 12], [2, 8], [1, 7], [0],
			], // X
			[
				[2], [5], [11], [12], [12], [14], [4, 12], [6, 12], [6, 13], [20], [22], [1, 20], [1, 17], [3, 14], [3, 12], [16, 1], [2, 13, 1], [2, 7], [2, 3, 2], [1, 2, 2], [6], [1, 2], [2], [1],
			], // Y
		],
	},
	{ // 1 - 
		w: 20,
		h: 20,
	},
]

function PIC_RealX(virtX, iw) {
	const dp = PIC_State.drawingParams
	return ((virtX / iw) * dp.imgW) + dp.imgStartX
}

function PIC_RealY(virtY, ih) {
	const dp = PIC_State.drawingParams
	return ((virtY / ih) * dp.imgH) + dp.imgStartY
}

function PIC_HitGood() {
	doMoneyChange(1)
}

function PIC_HitBad() {
	doMoneyChange(-1)
}

function PIC_Tick() {
	// Determine drag state
	const dp = PIC_State.drawingParams
	const inp = PIC_State.input
	const idt = PIC_ImgDt[PIC_State.picPtr]
	const ctx = dp.ctx

	if (inp.clicked) {
		// Did click on something
		// Check if tile
		for (let i = 0; i < idt.w * idt.h; i++) {
			const tLocX = i % idt.w,
				tLocY = Math.floor(i / idt.w)

			const thisT = idt.dt[tLocY][tLocX]
			const tRealX = PIC_RealX(tLocX, idt.w),
				tRealY = PIC_RealY(tLocY, idt.h)

			// Did click tile
			if (isRectOverlap(inp.cx, inp.cy, 1, 1, tRealX, tRealY, dp.pxScaleW, dp.pxScaleH)) {
				// 0 = unrevealed (bad)
				// 1 = unrevealed (good)
				// 2 = revealed (bad)
				// 3 = revealed (good)

				// If this is true, WAS NOT REVEALED YET
				if (!(thisT & 0b10)) {
					const isGood = (thisT & 0b1)
					if (isGood) {
						// Revealed good tile
						idt.dt[tLocY][tLocX] = 3
						PIC_HitGood()
					} else {
						// Revealed bad tile
						idt.dt[tLocY][tLocX] = 2
						PIC_HitBad()
					}
				}
			}
		}
	}

	PIC_ClearInputState()
}

function PIC_Draw() {
	const dp = PIC_State.drawingParams
	const inp = PIC_State.input
	const idt = PIC_ImgDt[PIC_State.picPtr]
	const ctx = dp.ctx

	for (let i = 0; i < idt.w * idt.h; i++) {
		const tLocX = i % idt.w,
			tLocY = Math.floor(i / idt.w)

		const thisT = idt.dt[tLocY][tLocX]
		const tRealX = PIC_RealX(tLocX, idt.w),
			tRealY = PIC_RealY(tLocY, idt.h)

		if (tLocX === 0) {
			// Draw number section V
			ctx.fillStyle = '#ffffff'
			ctx.fillRect(dp.imgStartX - dp.n2 - 1, tRealY + 1, dp.n2, dp.pxScaleH - 1)

			ctx.fillStyle = '#000000'
			ctx.font = '1.75rem arial'
			ctx.fillText(idt.numbers[1][tLocY], dp.imgStartX - dp.n2 - 1, tRealY + 1 + dp.pxScaleH - 3)
		}

		if (tLocY < 1) {
			// Draw number section H
			ctx.fillStyle = '#ffffff'
			ctx.fillRect(tRealX + 1, dp.imgStartY - dp.n2 - 1, dp.pxScaleW - 1, dp.n2)

			ctx.fillStyle = '#000000'
			ctx.font = '1.75rem arial'
			idt.numbers[0][tLocX].forEach((num, idx) => {
				ctx.fillText(num, tRealX + 3, (dp.imgStartY - dp.n2 / 2.2) + (idx * 18))
			})
		}

		if (thisT & 0b10) {
			if (thisT & 0b1) {
				// 3 = revealed (good)
				ctx.fillStyle = '#000000'
				ctx.fillRect(tRealX, tRealY, dp.pxScaleW, dp.pxScaleH)
			} else {
				ctx.fillStyle = '#ffffff'
				ctx.fillRect(tRealX, tRealY, dp.pxScaleW, dp.pxScaleH)

				ctx.fillStyle = '#000000'
				ctx.fillText('X', tRealX + ctx.measureText('X').width / 2, tRealY + dp.pxScaleH - ctx.measureText('M').width / 4)
			}
		} else {
			ctx.fillStyle = '#ff0000'
			ctx.fillRect(tRealX, tRealY, dp.pxScaleW, dp.pxScaleH)

			ctx.fillStyle = '#ffffff'
			ctx.fillRect(tRealX + 1, tRealY + 1, dp.pxScaleW - 1, dp.pxScaleH - 1)
		}
	}
}

function PIC_Init() {
	const dt = PIC_ImgDt[PIC_State.picPtr]
	const dp = PIC_State.drawingParams

	dp.pxScaleW = Math.floor(dp.imgW / dt.w)
	dp.pxScaleH = Math.floor(dp.imgH / dt.h)
}