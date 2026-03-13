interface RatingBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

export default function RatingBar({
  label,
  value,
  maxValue = 5,
}: RatingBarProps) {
  const percentage = (value / maxValue) * 100;
  const clampedValue = Math.min(value, maxValue);

  return (
    <div className="flex items-center gap-3">
      <div className="min-w-[100px]">
        <p className="text-sm font-medium text-sc-text">{label}</p>
      </div>

      {/* Bar Container */}
      <div className="flex-1">
        <div className="bg-sc-border rounded-full h-2 overflow-hidden">
          <div
            className="bg-sc-secondary h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Value */}
      <div className="min-w-[35px] text-right">
        <p className="text-sm font-medium text-sc-text">
          {clampedValue.toFixed(1)}/{maxValue}
        </p>
      </div>
    </div>
  );
}
