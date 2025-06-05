import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader({ fileName }) {
  return (
    <div className='p-4 flex justify-between items-center bg-white shadow-md'>
        <Image src={'/logo.svg'} alt="Logo" width={140} height={100} />
        <h2 className='font-bold'>{fileName}</h2>
        <UserButton />
    </div>
  )
}

export default WorkspaceHeader