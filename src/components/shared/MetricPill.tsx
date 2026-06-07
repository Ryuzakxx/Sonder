type MetricPillProps = {
  value: string | number;
  label: string;
};

export function MetricPill({ value, label }: MetricPillProps) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
