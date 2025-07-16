import React from 'react'
import SingularTeam from '../../_components/about-page/singular-team'

export default async function ProfilePage ({ params } : { params: Promise<{ teamid: string }> }) {
  const { teamid } = await params
  return (
    <div>
        <SingularTeam id={teamid} />
    </div>
  )
}
