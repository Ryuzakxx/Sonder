type RatingDistributionProps = {
  values: number[];
};

export function RatingDistribution({ values }: RatingDistributionProps) {
  return (
    <div className="distribution" aria-label="Distribuzione voti">
      {values.map((value, index) => (
        <div className="bar" key={`${value}-${index}`}>
          <span style={{ height: `${value}%` }} />
        </div>
      ))}
    </div>
  );
}
