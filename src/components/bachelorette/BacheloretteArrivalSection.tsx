import arrivalSection from '../../assets/bachelorette/arrivalSection.png'

export default function BacheloretteArrivalSection() {
	return (
		<section className='flex max-h-dvh w-full items-center justify-center  '>
			<img
				src={arrivalSection}
				alt='Bachelorette arrival section'
				className='max-h-dvh w-full max-w-md object-contain'
				draggable={false}
			/>
		</section>
	)
}
