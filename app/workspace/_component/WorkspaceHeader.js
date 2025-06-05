import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
  return (
    <div className='p-4 flex justify-between items-center bg-white shadow-md'>
        <Image src={'/logo.svg'} alt="Logo" width={140} height={100} />
        <UserButton />
    </div>
  )
}

export default WorkspaceHeader