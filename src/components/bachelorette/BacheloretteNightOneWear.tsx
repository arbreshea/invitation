import nightOneWhatToWear from '../../assets/bachelorette/nightOneWhatToWear.png'

export default function BacheloretteNightOneWear() {
	return (
		<section className='flex max-h-dvh w-full items-center justify-center  '>
			<img
				src={nightOneWhatToWear}
				alt='Bachelorette night one display'
				className='max-h-dvh w-full max-w-md object-contain'
				draggable={false}
			/>
		</section>
	)
}
