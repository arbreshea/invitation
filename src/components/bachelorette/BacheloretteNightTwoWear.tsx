import nightTwoWhatToWear from '../../assets/bachelorette/nightTwoWhatToWear.png'

export default function BacheloretteNightTwoWear() {
	return (
		<section className='flex max-h-dvh w-full items-center justify-center  '>
			<img
				src={nightTwoWhatToWear}
				alt='Bachelorette night two display'
				className='max-h-dvh w-full max-w-md object-contain'
				draggable={false}
			/>
		</section>
	)
}
