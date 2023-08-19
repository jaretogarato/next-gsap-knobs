'use client'
import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import '../styles/goo-dial.css'

gsap.registerPlugin(Draggable)

export default function MagnetGooDial() {
	const comp = useRef<HTMLDivElement>(null)
	const tl = useRef<gsap.core.Timeline>(gsap.timeline())
	const svgRef = useRef<SVGSVGElement | null>(null)
	const dialRotation = useRef<number>(270)
	const dial = useRef<SVGGElement | null>(null)
	const display = useRef<SVGTextElement | null>(null)
	const dragger = useRef(null)
	const displayContainer = useRef(null)
	const outline = useRef(null)
	const outlineBG = useRef(null)
	const dialGripA = useRef(null)
	const dialGripB = useRef(null)

	const anchors = [105, 135, 165, 195, 225, 255]

	// type ClosestAnchorResult = {
	// 	closestAnchor: number
	// 	difference: number
	// }

	useLayoutEffect(() => {
		tl.current = gsap.timeline()

		if (comp.current) {
			// Scope animations to comp ref
			const ctx = gsap.context(() => {
				const dialElement = dial.current
				const dialGripAElement = dialGripA.current
				const dialGripBElement = dialGripB.current
				const displayElement = display.current
				const draggerElement = dragger.current
				const displayContainerElement = displayContainer.current
				const outlineElement = outline.current as unknown as SVGPathElement
				const outlineBGElement = outlineBG.current as unknown as SVGPathElement
				const pathLength = outlineElement ? outlineElement.getTotalLength() : 0

				const update = function (this: Draggable) {
					const rotationProgress = (dialRotation.current + 90) / 180
					const draw = -rotationProgress * (pathLength / 2)
					const percent: number = this.rotation
						? -(this.rotation - 270) / 180
						: 0

					dialRotation.current = this.rotation

					gsap.set([displayContainerElement], {
						rotation: dialRotation.current,
					})

					gsap.to([draggerElement], {
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

					if (display.current) {
						display.current.textContent = Math.round(percent * 100).toString()
					}

					gsap.to(outlineElement, {
						duration: 0.3,
						strokeDashoffset: draw,
						ease: 'sine.easeOut',
					})

					if (outlineBGElement) {
						outlineBGElement.style.strokeDashoffset = draw.toString()
					}
				}

				function goToClosestAnchor() {
					let reference = dialRotation.current

					if (anchors.length === 0) {
						throw new Error('Array must contain at least one number.')
					}

					let closestAnchor = anchors[0]
					let minimumDifference = Math.abs(reference - closestAnchor)

					anchors.forEach((anchor) => {
						const difference = Math.abs(reference - anchor)
						if (difference < minimumDifference) {
							closestAnchor = anchor
							minimumDifference = difference
						}
					})
					console.log('closestAnchor: ', closestAnchor)
					console.log('minimumDifference: ', minimumDifference)

					// Set dialRotation to the closest anchor
					dialRotation.current = closestAnchor

					// Retrieve the Draggable instance for the dial element
					// const draggableInstance = Draggable.get(dial.current) as Draggable
					const draggableInstance = Draggable.get(dial.current) as Draggable

					// Manually update the rotation of the draggable instance
					;(draggableInstance as any).rotation = closestAnchor

					// Call the update function using the draggable instance as the context
					update.call(draggableInstance)
				}

				//-------------------------//
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

				gsap.set([displayContainerElement, draggerElement, outlineElement], {
					svgOrigin: '400 300',
				})
				gsap.set([dialElement, draggerElement], {
					rotation: dialRotation.current,
				})
				gsap.set([outlineElement], { rotation: dialRotation.current })
				gsap.set('svg', { visibility: 'visible' })

				if (dialElement) {
					if (outlineElement) {
						outlineElement.style.strokeDasharray = pathLength + ' ' + pathLength
						outlineElement.style.strokeDashoffset = pathLength.toString()
					}

					Draggable.create(dialElement, {
						type: 'rotation',
						bounds: { minRotation: 270, maxRotation: 90 },
						onDrag: update,
						onThrowUpdate: update,
						dragResistance: 0.1,
						throwResistance: 0.1,
						overshootTolerance: 0,
						throwProps: true,
						transformOrigin: '400px 300px', // Center of rotation
						onDragEnd: goToClosestAnchor,
						onClick: (e) => {
							console.log('dialRotation.current: ', dialRotation.current)
							// console.log('CLICKED', e.target)
							// e.target.style.backgroundColor= 'blue'
						},
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
