import overviewSection from '../../assets/bachelorette/overviewSection.png'

export default function BacheloretteTripOverviewSection() {
	return (
		<section className='flex max-h-dvh w-full items-center justify-center  '>
			<img
				src={overviewSection}
				alt='Bachelorette trip overview'
				className='max-h-dvh w-full max-w-md object-contain'
				draggable={false}
			/>
		</section>
	)
}
