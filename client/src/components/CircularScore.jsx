export default function CircularScore({ score }) {
  const getColor = (score) => {
    if (score >= 75) return "#22c55e"; // green
    if (score >= 50) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="flex justify-center lg:-my-5">
      <div className="relative flex items-center justify-center">
        <svg className="w-36 h-36 transform -rotate-90">
          {/* Background circle */}
          <circle
            className="text-sky-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="60"
            cx="72"
            cy="72"
          />
          {/* Progress circle */}
          <circle
            stroke={getColor(score)}
            strokeWidth="10"
            strokeDasharray="377" // 2 * π * 60
            strokeDashoffset={377 - (score / 100) * 377}
            strokeLinecap="round"
            fill="transparent"
            r="60"
            cx="72"
            cy="72"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        {/* Centered Text */}
        <div className="absolute text-4xl font-semibold text-white font-outfit">
          {score}
        </div>
      </div>
    </div>
  );
}
