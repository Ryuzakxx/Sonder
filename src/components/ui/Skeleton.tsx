interface Props { className?: string }
export function Skeleton({ className = "" }: Props) {
  return (
    <div className={`animate-pulse bg-[#1e1e1e] rounded-lg ${className}`} />
  );
}
