'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
// import { Draggable } from 'gsap/Draggable'
// import { CSSPlugin } from 'gsap'
import timeline from 'gsap/dist/gsap'
import ReactCanvasKnob from '../../components/ReactCanvasKnob'

import '../../styles/knobs.css'
import '../../styles/ui.css'

import FooterNav from '../../components/FooterNav'

// gsap.registerPlugin(Draggable)
// gsap.registerPlugin(CSSPlugin)
// gsap.registerPlugin(InertiaPlugin)

const DemoRCKnob = () => {
	const app = useRef<HTMLDivElement | null>(null)
	// const knob = useRef<HTMLDivElement | null>(null)
	const [value, setValue] = useState(50) // Initial value of the knob

	const handleChange = (newValue: number) => {
		setValue(newValue)
	}

	useEffect(() => {
		gsap.to(app.current, { duration: 2, opacity: 1 })
		console.log(app)
	}, [])

	const computeSixLevels = (value: number) => {
		if (value < 10) {
			return 1
		} else if (value < 20) {
			return 2
		} else if (value < 30) {
			return 3
		} else if (value < 40) {
			return 4
		} else if (value < 50) {
			return 5
		} else {
			return 6
		}
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'></div>

			<div
				ref={(el) => {
					app.current = el
				}}
				className='hero'
			>
				<h1 className='text-5xl font-semibold'>
					Based on <br />
					React Canvas Knob
				</h1>
			</div>

			<ReactCanvasKnob
				value={value}
				onChange={handleChange}
				min={0}
				max={60}
				step={1}
				width={200}
				height={200}
				thickness={0.2}
				lineCap='round'
				bgColor='#f0f0f0'
				// fgColor='#3498db'
				fgColor='hsla(196, 73%, 50%, .75)'
				// fgColor='red'
				displayInput
				angleArc={270}
				angleOffset={-135}
				title='Cool Knob'
			/>
			<p>Value: {value}</p>

			<FooterNav />
		</main>
	)
}

export default DemoRCKnob
