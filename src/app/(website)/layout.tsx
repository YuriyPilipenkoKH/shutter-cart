import { authOptions } from '@/auth';
import { getServerSession, Session } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
  children: React.ReactElement<{ session: Session }>; // Specify that children accepts session
}


const layout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login'); 
  return (
    <main className="flex-1 p-4 md:p-6">{children}</main>
  )
}

export default layout