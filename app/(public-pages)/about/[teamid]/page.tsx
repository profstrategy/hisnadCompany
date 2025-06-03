import React from 'react'
import SingularTeam from '../../_components/about-page/singular-team'

const ProfilePage = ({ params } : { params: { teamid: string } }) => {
  return (
    <div>
        <SingularTeam id={params.teamid} />
    </div>
  )
}

export default ProfilePage