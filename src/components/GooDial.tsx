'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { gsap } from 'gsap'
import '/styles/goo-dial.scss'

export default function GooDial() {
	const xmlns: string = 'http://www.w3.org/2000/svg'
	const xlinkns: string = 'http://www.w3.org/1999/xlink'

	const select = (s: string): Element | null => document.querySelector(s)
	const selectAll = (s: string): NodeListOf<Element> =>
		document.querySelectorAll(s)

	const outlineTip: Element | null = select('.outlineTip')
	const displayContainer: Element | null = select('.displayContainer')
	const dragPattern: Element | null = select('#dragPattern')
	const patternOverlay: Element | null = select('.patternOverlay')
	const display: Element | null = select('.display')
	const dial: Element | null = select('.dial')
	const dialGrip: NodeListOf<Element> = selectAll('.dialGrip')
	const outline: NodeListOf<Element> = selectAll('.outline')
	const dragger: Element | null = select('.dragger')
	const dialPos: gsap.core.Tween | undefined = TweenMax.set('.dial', {
		x: '+=0',
	}).target[0]._gsTransform

	TweenMax.set('svg', {
		visibility: 'visible',
	})

	let tl = new TimelineMax()
	TweenMax.set([dial, dragger, display, dialGrip], {
		transformOrigin: '50% 50%',
	})

	TweenMax.set([displayContainer, dragger, patternOverlay], {
		svgOrigin: '400 300',
	})

	Draggable.create(dial, {
		type: 'rotation',
		bounds: { maxRotation: 360, minRotation: 0 },
		throwProps: true,
		onDrag: dragUpdate,
		dragResistance: 0.1,
		throwResistance: 1,
		overshootTolerance: 0,
		onThrowUpdate: dragUpdate,
	})

	function dragUpdate(): void {
		const percent: number = dialPos?.rotation ? dialPos.rotation / 360 : 0
		TweenMax.set([dragger, displayContainer, patternOverlay], {
			rotation: dialPos?.rotation,
		})
		TweenMax.set(display, {
			rotation: 360 - (dialPos?.rotation || 0),
		})

		// TweenMax.staggerTo(
		// 	dialGrip,
		// 	0.6,
		// 	{
		// 		cycle: {
		// 			rotation: function (i: number) {
		// 				return i == 0 ? -dialPos.rotation : dialPos.rotation * 2
		// 			},
		// 		},
		// 	},
		// 	0
		// )

		TweenMax.staggerTo(dialGrip, 0.6, {
			cycle: {
				rotation: function (i: number) {
					return i == 0 ? -dialPos.rotation : dialPos.rotation * 2
				},
			},
		})

		var draw = '0% ' + percent * 100 + '%'
		TweenMax.set([outline, outlineTip], {
			drawSVG: draw,
		})

		TweenMax.to(dragPattern, 1, {
			attr: {
				x: Math.round(percent * 1000),
				ease: Sine.easeOut,
			},
		})
		TweenMax.to(dragPattern, 0.5, {
			attr: {
				y: Math.round(percent * 1000),
				ease: Sine.easeOut,
			},
		})

		if (display) {
			display.textContent = Math.round(percent * 100).toString()
		}
	}

	dragUpdate()
	//ScrubGSAPTimeline(tl);

	return (
		<svg viewBox='0 0 800 600' xmlns='http://www.w3.org/2000/svg'>
			<defs>
				<pattern
					id='dragPattern'
					width='14'
					height='24.5'
					x='0'
					y='0'
					patternUnits='userSpaceOnUse'
					viewBox='0 0 28 49'
				>
					<g fill-rule='evenodd'>
						<g id='hexagons' fill-rule='nonzero' fill='#4DB5AE'>
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
				class='outlineBG'
				d='M400,121.5A178.5,178.5,0,1,1,221.5,300,178.5,178.5,0,0,1,400,121.5'
				fill='none'
				stroke='#4DB5AE'
				stroke-linecap='round'
				stroke-miterlimit='10'
				stroke-width='12'
				stroke-dasharray='0'
				opacity='0.05'
			/>

			<g filter='url(#goo)'>
				<path
					class='outline'
					d='M400,121.5A178.5,178.5,0,1,1,221.5,300,178.5,178.5,0,0,1,400,121.5'
					fill='none'
					stroke='#81D6E3'
					stroke-miterlimit='10'
					stroke-width='12'
				/>
				<g class='dragger'>
					<circle
						class='dragCircle'
						cx='400'
						cy='121'
						r='22'
						fill='#B2DDF7'
						stroke='#000'
						stroke-width='10'
					/>
				</g>
			</g>

			<circle
				class='patternOverlay'
				cx='400'
				cy='121'
				r='26'
				fill='url(#dragPattern)'
				stroke='none'
				stroke-width='0'
				opacity='1'
			/>
			<g class='displayContainer'>
				<text class='display' x='400' y='301' opacity='1'></text>
			</g>
			<circle
				class='dialGrip'
				cx='400'
				cy='300'
				r='80'
				fill='transparent'
				stroke='#B2DDF7'
				stroke-width='45'
				stroke-dasharray='4 16 67'
				opacity='0.2'
			/>
			<circle
				class='dialGrip'
				cx='400'
				cy='300'
				r='140'
				fill='transparent'
				stroke='#CAB9C7'
				stroke-width='15'
				stroke-dasharray='56 7 123 '
				opacity='0.14'
			/>
			<g class='dial'>
				<circle
					class='dialCircle'
					cx='400'
					cy='300'
					r='223'
					fill='transparent'
				/>
			</g>
		</svg>
	)
}
