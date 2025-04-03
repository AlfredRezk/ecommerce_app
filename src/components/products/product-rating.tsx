import { Star } from 'lucide-react'

export default function ProductRating({
  rating = 0,
  size = 6,
}: {
  rating: number
  size?: number
}) {
  const fullStars = Math.floor(rating)
  const partialStar = rating % 1
  const emptyStars = 5 - Math.ceil(rating)

  return (
    <div className='flex items-center'>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`w-${size} h-${size} fill-amber-500 text-muted-foreground`}
        />
      ))}
      {partialStar > 0 && (
        <div className='relative'>
          <Star className={`w-${size} h-${size} text-muted-foreground`} />
          <div
            className='absolute top-0 left-0 overflow-hidden'
            style={{ width: `${100 * partialStar}%` }}
          >
            <Star
              className={`w-${size} h-${size} fill-amber-500 text-muted-foreground`}
            />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`w-${size} h-${size} text-muted-foreground`}
        />
      ))}
    </div>
  )
}
