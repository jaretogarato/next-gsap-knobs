'use client'
import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

export default function MagnetGooDial() {
	const comp = useRef<HTMLDivElement>(null)
	const tl = useRef<gsap.core.Timeline>(gsap.timeline())
	const svgRef = useRef<SVGSVGElement | null>(null)
	const dialRotation = useRef<number>(0)
	const dial = useRef<SVGGElement | null>(null)
	const dragPattern = useRef(null)
	const patternOverlay = useRef(null)
	const display = useRef<SVGTextElement | null>(null)
	const dragger = useRef(null)
	const displayContainer = useRef(null)
	const outline = useRef(null)
	const outlineBG = useRef(null)
	const dialGripA = useRef(null)
	const dialGripB = useRef(null)

	useLayoutEffect(() => {
		tl.current = gsap.timeline()

		if (comp.current) {
			// Scope animations to comp ref
			const ctx = gsap.context(() => {
				const dialElement = dial.current
				const dialGripAElement = dialGripA.current
				const dialGripBElement = dialGripB.current
				const dragPatternElement = dragPattern.current
				const patternOverlayElement = patternOverlay.current
				const displayElement = display.current
				const draggerElement = dragger.current
				const displayContainerElement = displayContainer.current
				const outlineElement = outline.current as unknown as SVGPathElement
				const outlineBGElement = outlineBG.current as unknown as SVGPathElement
				const pathLength = outlineElement ? outlineElement.getTotalLength() : 0

				// Set the transform origins
				gsap.set(
					[
						dialElement,
						draggerElement,
						displayElement,
						dialGripAElement,
						dialGripBElement,
					],
					{
						transformOrigin: '50% 50%',
					}
				)

				gsap.set(
					[displayContainerElement, draggerElement, patternOverlayElement],
					{
						svgOrigin: '400 300',
					}
				)

				const update = function (this: Draggable) {
					const percent: number = this.rotation ? this.rotation / 360 : 0
					dialRotation.current = this.rotation

					console.log('xx dialRotation.current: ', dialRotation.current)

					gsap.set([displayContainerElement], {
						rotation: dialRotation.current,
					})

					gsap.to([draggerElement, patternOverlayElement], {
						duration: 0.3,
						rotation: dialRotation.current,
					})

					gsap.set(displayElement, {
						rotation: 360 - (dialRotation.current || 0),
					})

					gsap.to(dialGripAElement, {
						duration: 0.6,
						rotation: function (i: number) {
							return i === 0 ? -dialRotation.current : dialRotation.current * 2
						},
						stagger: 0.6,
					})

					gsap.to(dialGripBElement, {
						duration: 0.6,
						rotation: function (i: number) {
							return i === 0 ? dialRotation.current : -dialRotation.current * 2
						},
						stagger: 0.6,
					})

					gsap.to(dragPatternElement, {
						duration: 1,
						attr: {
							x: Math.round(percent * 1000),
							ease: 'sine.easeOut',
						},
					})

					gsap.to(dragPatternElement, {
						duration: 0.5,
						attr: {
							y: Math.round(percent * 1000),
							ease: 'sine.easeOut',
						},
					})

					if (display.current) {
						display.current.textContent = Math.round(percent * 100).toString()
					}

					// Calculate new stroke-dashoffset based on the rotation
					const draw = pathLength - pathLength * (dialRotation.current / 360)

					gsap.to(outlineElement, {
						duration: 0.3, // Same duration as the other animations
						strokeDashoffset: draw,
						ease: 'sine.easeOut', // Choose an appropriate easing, or omit for a linear transition
					})

					// if (outlineElement) {
					// 	outlineElement.style.strokeDashoffset = draw.toString()
					// }

					if (outlineBGElement) {
						outlineBGElement.style.strokeDashoffset = draw.toString()
					}
				}

				gsap.set('svg', { visibility: 'visible' })

				if (dialElement) {
					if (outlineElement) {
						outlineElement.style.strokeDasharray = pathLength + ' ' + pathLength
						outlineElement.style.strokeDashoffset = pathLength.toString()
					}

					Draggable.create(dialElement, {
						type: 'rotation',
						bounds: { minRotation: 0, maxRotation: 360 },
						onDrag: update,
						onThrowUpdate: update,
						dragResistance: 0.1,
						throwResistance: 0.1,
						overshootTolerance: 0,
						throwProps: true,
						transformOrigin: '400px 400px', // Center of rotation
					})
				}
			}, comp)

			return () => ctx.revert()
		}
	}, [])

	return (
		<div
			className='comp'
			ref={comp}
			style={{
				width: '400px',
				height: '300px',
				border: '1px solid orange',
				position: 'relative',
			}}
		>
			<svg
				ref={svgRef}
				viewBox='0 0 800 600'
				xmlns='http://www.w3.org/2000/svg'
			>
				<defs>
					<pattern
						id='dragPattern'
						ref={dragPattern}
						width='14'
						height='24.5'
						x='0'
						y='0'
						patternUnits='userSpaceOnUse'
						viewBox='0 0 28 49'
					>
						<g fillRule='evenodd'>
							<g id='hexagons' fillRule='nonzero' fill='#4DB5AE'>
								<path d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z' />
							</g>
						</g>
					</pattern>
					<filter id='goo'>
						<feGaussianBlur in='SourceGraphic' stdDeviation='8' result='blur' />
						<feColorMatrix
							in='blur'
							mode='matrix'
							values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9'
							result='cm'
						/>
						<feBlend />
					</filter>
				</defs>
				<path
					className='outlineBG'
					ref={outlineBG}
					d='M400,121.5A178.5,178.5,0,1,1,221.5,300,178.5,178.5,0,0,1,400,121.5'
					fill='none'
					stroke='#4DB5AE'
					strokeLinecap='round'
					strokeMiterlimit='10'
					strokeWidth='12'
					strokeDasharray='0'
					opacity='0.05'
				/>

				<g filter='url(#goo)'>
					<path
						className='outline'
						ref={outline}
						d='M400,121.5A178.5,178.5,0,1,1,221.5,300,178.5,178.5,0,0,1,400,121.5'
						fill='none'
						stroke='#81D6E3'
						strokeMiterlimit='10'
						strokeWidth='12'
					/>
					<g className='dragger' ref={dragger}>
						<circle
							className='dragCircle'
							cx='400'
							cy='121'
							r='22'
							fill='#B2DDF7'
							stroke='#000'
							strokeWidth='10'
						/>
					</g>
				</g>

				<circle
					className='patternOverlay'
					ref={patternOverlay}
					cx='400'
					cy='121'
					r='26'
					fill='url(#dragPattern)'
					stroke='none'
					strokeWidth='0'
					opacity='1'
				/>
				<g className='displayContainer' ref={displayContainer}>
					<text
						className='display'
						ref={display}
						x='400'
						y='301'
						fontSize='40' // Add this line to set the font size
						fill='#000' // Add this line to set the text color
						opacity='1'
						stroke='#f00'
						strokeWidth='1'
					></text>
				</g>
				<circle
					className='dialGrip'
					ref={dialGripA}
					cx='400'
					cy='300'
					r='80'
					fill='transparent'
					stroke='#B2DDF7'
					strokeWidth='45'
					strokeDasharray='4 16 67'
					opacity='0.2'
				/>
				<circle
					className='dialGrip'
					ref={dialGripB}
					cx='400'
					cy='300'
					r='140'
					fill='transparent'
					stroke='#CAB9C7'
					strokeWidth='15'
					strokeDasharray='56 7 123 '
					opacity='0.14'
				/>
				<g className='dial' id='dial' ref={dial}>
					<circle
						className='dialCircle'
						cx='400'
						cy='300'
						r='223'
						fill='transparent'
						stroke='none'
					/>
				</g>
			</svg>
		</div>
	)
}
