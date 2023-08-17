import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(Draggable)

export default function RotatingDial() {
	const comp = useRef<HTMLDivElement>(null)
	const dialRef = useRef<SVGCircleElement>(null)
	const circleRef = useRef<SVGCircleElement>(null)
	const centerX = 200
	const centerY = 200
	const pathRadius = 100

	useLayoutEffect(() => {
		// Create the GSAP context
		let ctx = gsap.context(() => {
			const updatePosition = (rotation: number) => {
				const angle = (rotation * Math.PI) / 180 // Convert to radians
				const newX = centerX + pathRadius * Math.cos(angle)
				const newY = centerY + pathRadius * Math.sin(angle)
				gsap.set(circleRef.current, { x: newX, y: newY })
			}

			// Set initial position without animation
			updatePosition(0)

			const dragUpdate = function (this: Draggable) {
				console.log('this.rotation: ', this.rotation)
				updatePosition(this.rotation)
			}

			if (circleRef.current) {
				Draggable.create(circleRef.current, {
					type: 'rotation',
					bounds: { minRotation: 0, maxRotation: 360 },
					onDrag: dragUpdate,
					// onDrag: function () {
					// 	updatePosition(this.rotation)
					// },
					dragResistance: 0.1,
					throwResistance: 1,
					overshootTolerance: 0,
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
					ref={dialRef}
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
