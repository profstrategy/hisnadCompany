import { CLIENT_ROUTES } from '@/_lib/routes'
import { redirect } from 'next/navigation'

const AdminDashboardPage = () => {
  return (
   redirect(CLIENT_ROUTES.PrivatePages.adminDashboard.overview)
  )
}

export default AdminDashboardPage