'use client'
import React from 'react'
import { Button } from './ui/button'
import { ChevronUp } from 'lucide-react'

export default function GoTopBtn() {
  return (
    <div className='w-full'>
      <Button
        variant='outline'
        className='w-full rounded-none'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp className='mr-2 h-4 w-4' /> Back to top
      </Button>
    </div>
  )
}
