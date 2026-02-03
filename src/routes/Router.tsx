import { Routes, Route, Navigate } from 'react-router-dom'
import BacheloretteInvitePage from '../pages/invites/BacheloretteInvitePage'
import WeddingInvitePage from '../pages/invites/WeddingInvitePage'
import HennaInvitePage from '../pages/invites/HennaInvitePage'

export default function Router() {
	return (
		<Routes>
			<Route path='/bachelorette' element={<BacheloretteInvitePage />} />
			<Route path='/wedding' element={<WeddingInvitePage />} />
			<Route path='/henna' element={<HennaInvitePage />} />

			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	)
}
