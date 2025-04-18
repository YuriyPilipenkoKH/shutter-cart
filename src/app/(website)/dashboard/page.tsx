import { authOptions } from '@/auth';
import { LogoutButton } from '@/components/button/Button';
import { getServerSession } from 'next-auth';
import React from 'react'

const DashboardPage = async() => {
    const session = await getServerSession(authOptions)
    const username =  session?.user.name
    console.log(session);
  return (
    <div >
      <p>DashboardPage</p>
      <LogoutButton username={username ?? 'Dude'}/>
    </div>
  )
}

export default DashboardPage