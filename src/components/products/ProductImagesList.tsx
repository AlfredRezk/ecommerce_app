'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function ProductImagesList({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(images[0])

  return (
    <>
      <div className='flex flex-col gap-5 overflow-hidden justify-center items-center'>
        <img
          src={currentImage}
          alt=''
          className='object-contain object-bottom hover:scale-125 transition h-[350px]'
        />
        <div className='flex gap-5 justify-center py-2 '>
          {images.map((img) => (
            <img
              src={img}
              alt=''
              key={img}
              className={cn(
                'w-24 h-24 object-cover cursor-pointer rounded-lg',
                {
                  'ring-2 ring-offset-2 ring-foreground': currentImage === img,
                },
              )}
              onClick={() => setCurrentImage(img)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
