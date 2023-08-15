export default function Hero() {
	return (
		<div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
			<a
				href='/inertia'
				className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
			>
				<h2 className={`mb-3 text-2xl font-semibold`}>
					InertiaPlugin{' '}
					<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
						-&gt;
					</span>
				</h2>
				<p className={`m-0 max-w-[30ch] text-sm opacity-50 text-left`}>
					Under development. May need to buy the GSAP plugin.
				</p>
			</a>

			<a
				href='/rck'
				className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
			>
				<h2 className={`mb-3 text-2xl font-semibold`}>
					RCK{' '}
					<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
						-&gt;
					</span>
				</h2>
				<p className={`m-0 max-w-[30ch] text-sm opacity-50 text-left`}>
					Based on JoshJG's React Canvas Knob
				</p>
			</a>

			<a
				href='/goo-dial'
				className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
			>
				<h2 className={`mb-3 text-2xl font-semibold`}>
					Goo Dial{' '}
					<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
						-&gt;
					</span>
				</h2>
				<p className={`m-0 max-w-[30ch] text-sm opacity-50 text-left`}>
					Original by Chris Gannon: https://codepen.io/chrisgannon/pen/qPKXmq
				</p>
			</a>

			<a
				href='#'
				className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
			>
				<h2 className={`mb-3 text-2xl font-semibold`}>
					Knob 4{' '}
					<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
						-&gt;
					</span>
				</h2>
				<p className={`m-0 max-w-[30ch] text-sm opacity-50 text-left`}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
				</p>
			</a>
		</div>
	)
}
