import nightTwoDinner from '../../assets/bachelorette/nightTwoDinner.png'

export default function BacheloretteNightTwoDinner() {
	return (
		<section className='flex max-h-dvh w-full items-center justify-center  '>
			<img
				src={nightTwoDinner}
				alt='Bachelorette night two dinner'
				className='max-h-dvh w-full max-w-md object-contain'
				draggable={false}
			/>
		</section>
	)
}
