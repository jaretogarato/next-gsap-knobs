import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

export default function RotatingDial() {
	const comp = useRef<HTMLDivElement>(null)
	const circleRef = useRef<SVGCircleElement>(null)
	const centerX = 200
	const centerY = 200
	const pathRadius = 100

	useLayoutEffect(() => {
		// Create the GSAP context
		let ctx = gsap.context(() => {
			const updatePosition = (x: number, y: number, animate = true) => {
				const dx = x - centerX
				const dy = y - centerY
				const angle = Math.atan2(dy, dx)
				const newX = centerX + pathRadius * Math.cos(angle)
				const newY = centerY + pathRadius * Math.sin(angle)
				if (animate) {
					gsap.to(circleRef.current, { x: newX, y: newY })
				} else {
					gsap.set(circleRef.current, { x: newX, y: newY })
				}
			}

			// Set initial position without animation
			updatePosition(centerX + pathRadius, centerY, false)

			if (circleRef.current) {
				Draggable.create(circleRef.current, {
					type: 'x,y',
					bounds: { top: 0, left: 0, width: 400, height: 400 },
					onDrag: function () {
						updatePosition(this.x, this.y)
					},
					onPress: function (e) {
						updatePosition(e.clientX, e.clientY)
					},
				})
			}
		}, comp) // Scopes the selector text

		return () => ctx.revert() // Cleanup
	}, []) // Empty dependency array so it doesn't re-run on every render

	return (
		<div
			ref={comp}
			style={{ border: '1px solid orange', width: '400px', height: '400px' }}
		>
			<svg viewBox='0 0 400 400'>
				<circle
					cx={centerX}
					cy={centerY}
					r={pathRadius}
					stroke='gray'
					fill='none'
				/>
				<circle ref={circleRef} r='10' fill='blue' />
			</svg>
		</div>
	)
}
