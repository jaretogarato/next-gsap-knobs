'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
// import { gsap } from 'gsap/dist/gsap'
// import { Draggable } from 'gsap/dist/Draggable'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
// import { InertiaPlugin } from 'gsap/dist/InertiaPlugin'
// import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { InertiaPlugin } from 'utils/gsap/InertiaPlugin.min.js'
import { CSSPlugin } from 'gsap'
import timeline from 'gsap/dist/gsap'

gsap.registerPlugin(Draggable)
gsap.registerPlugin(CSSPlugin)
// gsap.registerPlugin(InertiaPlugin)

export default function Home() {
	const app = useRef<HTMLDivElement | null>(null)
	const knob = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		gsap.to(app.current, { duration: 2, opacity: 1 })
		console.log(app)
	}, [])

	useEffect(() => {
		const logRotation = () => {
			console.log(gsap.getProperty(knob.current, 'rotation'), 'from element')
			console.log(Draggable.get(knob.current).rotation, 'from the Draggable')
		}

		const button = document.getElementById('rotation')
		button?.addEventListener('click', logRotation)

		return () => {
			button?.removeEventListener('click', logRotation)
		}
	}, [])

	let rotationSnap = 90

	useEffect(() => {
		console.log('knob.current', knob.current)
		console.log('rotationSnap', rotationSnap)
		const draggable = Draggable.create([knob.current], {
			type: 'rotation',
			inertia: true,
			// onDrag: function () {
			// 	console.log(this.rotation)
			// },
			snap: function (endValue: number) {
				//this function gets called when the mouse/finger is released and it plots where rotation should normally end and we can alter that value and return a new one instead. This gives us an easy way to apply custom snapping behavior with any logic we want. In this case, just make sure the end value snaps to 90-degree increments but only when the "snap" checkbox is selected.
				// console.log(' -> ', Math.round(endValue / rotationSnap) * rotationSnap)
				return Math.round(endValue / rotationSnap) * rotationSnap
			},
		})
	}, [])

	// $('#rotation').click(function () {
	// 	console.log(gsap.getProperty('#knob', 'rotation'), 'from element')
	// 	console.log(Draggable.get('#knob').rotation, 'from the Draggable')
	// })

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'></div>

			{/* <div
				ref={(el) => {
					app.current = el
				}}
				className='hero'
			>
				<Image
					className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
					src='/next.svg'
					alt='Next.js Logo'
					width={180}
					height={37}
					priority
				/>
			</div> */}

			<div className='knob-container'>
				<button id='rotation'>console.log() rotation</button>
				<br />
				<img
					ref={(el) => {
						knob.current = el
					}}
					id='knob'
					src='https://greensock.com/wp-content/uploads/custom/draggable/img/knob.png'
					width='410'
					height='410'
				></img>
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
