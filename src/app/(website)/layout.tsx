import { Session } from 'next-auth';
import React from 'react'

interface Props {
  children: React.ReactElement<{ session: Session }>; // Specify that children accepts session
}


const layout = ({ children }: Props) => {
  return (
    <main className="flex-1 p-4 md:p-6">{children}</main>
  )
}

export default layout