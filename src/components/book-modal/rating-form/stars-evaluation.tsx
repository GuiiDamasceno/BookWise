'use client'

import { Star } from '@phosphor-icons/react/dist/ssr'

interface StarsEvaluationProps {
  onChangeValue: (value: number) => void
  value: number
}

export function StarsEvaluation({
  onChangeValue,
  value,
}: StarsEvaluationProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          onClick={() => onChangeValue(index + 1)}
          className="cursor-pointer"
        >
          <Star
            className="text-purple-400"
            weight={value >= index + 1 ? 'fill' : undefined}
          />
        </span>
      ))}
    </div>
  )
}
