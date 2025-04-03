'use client'
import Image from 'next/image'
import React, { useState } from 'react'

export default function ImageHover({
  src,
  hoverSrc,
  alt,
}: {
  src: string
  hoverSrc: string
  alt: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  let hoverTimout: NodeJS.Timeout | string | number | undefined

  const handleMouseEnter = () => {
    hoverTimout = setTimeout(() => setIsHovered(true), 1000)
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimout)
    setIsHovered(false)
  }

  return (
    <div
      className='relative h-52'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        fill
        src={src}
        alt={alt}
        sizes='80vw'
        className={`object-contain transition-opacity duration-500 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <Image
        fill
        src={hoverSrc}
        alt={alt}
        sizes='80vw'
        className={`object-contain transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
