import { useEffect, useRef, useState } from 'react'

type ScrollRevealProps = {
	children: React.ReactNode
	className?: string
	delayMs?: number
}

export default function ScrollReveal({
	children,
	className,
	delayMs = 0,
}: ScrollRevealProps) {
	const ref = useRef<HTMLDivElement | null>(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true)
					obs.disconnect() // reveal once
				}
			},
			{
				threshold: 0.05,
				rootMargin: '0px 0px -15% 0px',
			},
		)

		obs.observe(el)
		return () => obs.disconnect()
	}, [])

	return (
		<div
			ref={ref}
			className={[
				className ?? '',
				'transition-[opacity,transform,filter] duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
				visible ?
					'opacity-100 translate-y-0 blur-0'
				:	'opacity-0 translate-y-4 blur-[2px]',
			].join(' ')}
			style={{ transitionDelay: `${delayMs}ms` }}
		>
			{children}
		</div>
	)
}
