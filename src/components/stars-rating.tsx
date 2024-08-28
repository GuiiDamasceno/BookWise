import { Star, StarHalf } from '@phosphor-icons/react/dist/ssr'

interface StarRatingProps {
  rating?: number
}

export function StartRating({ rating = 3.5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1 text-purple-400">
      {Array.from({ length: 5 }).map((_, i) => {
        return rating < i + 1 && rating > i ? (
          <StarHalf key={i} weight="fill" />
        ) : (
          <Star key={i} weight={rating >= i + 1 ? 'fill' : undefined} />
        )
      })}
    </div>
  )
}
