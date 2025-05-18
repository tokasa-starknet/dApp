import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number;
  className?: string;
}

export function Rating({ value, className }: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`star-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      ))}
      {hasHalfStar && (
        <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      )}
      <span className="ml-1 text-sm text-white/80">{value.toFixed(1)}</span>
    </div>
  );
}
