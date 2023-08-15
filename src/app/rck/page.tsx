'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
// import { Draggable } from 'gsap/Draggable'
// import { CSSPlugin } from 'gsap'
import timeline from 'gsap/dist/gsap'
import ReactCanvasKnob from '../../components/ReactCanvasKnob'

// gsap.registerPlugin(Draggable)
// gsap.registerPlugin(CSSPlugin)
// gsap.registerPlugin(InertiaPlugin)

const DemoRCKnob = () => {
	const app = useRef<HTMLDivElement | null>(null)
	// const knob = useRef<HTMLDivElement | null>(null)
	const [value, setValue] = useState(50) // Initial value of the knob

	const handleChange = (newValue) => {
		setValue(newValue)
	}

	useEffect(() => {
		gsap.to(app.current, { duration: 2, opacity: 1 })
		console.log(app)
	}, [])

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

			<div className='knob-container'>
				<ReactCanvasKnob
					value={value}
					onChange={handleChange}
					min={0}
					max={60}
					step={1}
					width={200}
					height={200}
					thickness={0.4}
					lineCap='round'
					bgColor='#f0f0f0'
					fgColor='#3498db'
					displayInput
					angleArc={270}
					angleOffset={-135}
					title='Cool Knob'
				/>
				<p>Value: {value}</p>
				{/* <p>Value: {computeSixLevels(value)}</p> */}
			</div>

			<div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
				<a
					href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Docs{' '}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Find in-depth information about Next.js features and API.
					</p>
				</a>

				<a
					href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Learn{' '}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Learn about Next.js in an interactive course with&nbsp;quizzes!
					</p>
				</a>

				<a
					href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Templates{' '}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Explore the Next.js 13 playground.
					</p>
				</a>

				<a
					href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						Deploy{' '}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Instantly deploy your Next.js site to a shareable URL with Vercel.
					</p>
				</a>
			</div>
		</main>
	)
}

export default DemoRCKnob
