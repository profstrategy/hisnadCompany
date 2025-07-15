import { CLIENT_ROUTES } from '@/_lib/routes'
import { redirect } from 'next/navigation'

const ClientDashboardPage = () => {
  return (
    redirect(CLIENT_ROUTES.PrivatePages.clientDashboard.overview)
  )
}

export default ClientDashboardPage