import nightOneActivity from '../../assets/bachelorette/nightOneActivity.png'

export default function BacheloretteNightOneActivity() {
	return (
		<section className='flex max-h-dvh w-full items-center justify-center  '>
			<img
				src={nightOneActivity}
				alt='Bachelorette night one display'
				className='max-h-dvh w-full max-w-md object-contain'
				draggable={false}
			/>
		</section>
	)
}
