'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { TweenMax } from 'gsap/dist'

export default function GooDial() {
	var xmlns = 'http://www.w3.org/2000/svg',
		xlinkns = 'http://www.w3.org/1999/xlink',
		select = function (s: string) {
			return document.querySelector(s)
		},
		selectAll = function (s: string) {
			return document.querySelectorAll(s)
		},
		outlineTip = select('.outlineTip'),
		displayContainer = select('.displayContainer'),
		dragPattern = select('#dragPattern'),
		patternOverlay = select('.patternOverlay'),
		display = select('.display'),
		dial = select('.dial'),
		dialGrip = selectAll('.dialGrip'),
		outline = selectAll('.outline'),
		dragger = select('.dragger'),
		dialPos = TweenMax.set('.dial', {
			x: '+=0',
		}).target[0]._gsTransform

	TweenMax.set('svg', {
		visibility: 'visible',
	})

	var tl = new TimelineMax()
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

	function dragUpdate() {
		var percent = dialPos.rotation / 360
		TweenMax.set([dragger, displayContainer, patternOverlay], {
			rotation: dialPos.rotation,
		})
		TweenMax.set(display, {
			rotation: 360 - dialPos.rotation,
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
}
