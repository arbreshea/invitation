import nightOneDinner from '../../assets/bachelorette/nightOneDinner.png'

export default function BacheloretteNightOneDinner() {
	return (
		<section className='flex max-h-dvh w-full items-center justify-center  '>
			<img
				src={nightOneDinner}
				alt='Bachelorette night one dinner'
				className='max-h-dvh w-full max-w-md object-contain'
				draggable={false}
			/>
		</section>
	)
}
