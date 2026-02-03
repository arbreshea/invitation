import { Link } from 'react-router-dom'

export default function HomePage() {
	return (
		<div className='min-h-screen grid place-items-center p-6'>
			<div className='space-y-4 text-center'>
				<h1 className='text-3xl font-bold'>Invites</h1>
				<Link
					className='inline-block rounded-full bg-black text-white px-5 py-2'
					to='/bachelorette'
				>
					Open Bachelorette Invite →
				</Link>
			</div>
		</div>
	)
}
