type GridProps = {
  rows?: number;
  logos: string[];
};

export const GridWithPlus = ({ rows = 1, logos }: GridProps) => {
  const columnCount = 8;
  const hasLogos = logos.length > 0;

  return (
    <div className="grid grid-cols-8">
      {Array.from({ length: rows * columnCount }).map((_, i) => (
        <div
          key={i}
          className="relative hover:bg-gray-50 h-28 md:h-48 aspect-square border border-gray-300 flex items-center justify-center bg-white "
        >
          {hasLogos && (
            <img
              src={logos[i % logos.length]}
              alt={`logo-${i}`}
              width={120}
              height={48}
              className="max-h-12 object-contain grayscale transition-all duration-300 hover:grayscale-0"
            />
          )}
        </div>
      ))}
    </div>
  );
};
