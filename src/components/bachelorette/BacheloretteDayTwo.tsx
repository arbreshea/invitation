import dayTwoMorning from '../../assets/bachelorette/dayTwoMorning.png'

export default function BacheloretteDayTwo() {
	return (
		<section className='flex max-h-dvh w-full items-center justify-center  '>
			<img
				src={dayTwoMorning}
				alt='Bachelorette day two display'
				className='max-h-dvh w-full max-w-md object-contain'
				draggable={false}
			/>
		</section>
	)
}
