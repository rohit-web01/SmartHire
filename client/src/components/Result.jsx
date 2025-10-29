export default function Result({ analysis }) {
  const { strengths, weaknesses, recommendations } = analysis;

  const Card = ({ title, items }) => (
    <div className="result-card flex-1 min-w-[300px] max-w-[450px] lg:min-w-[400px] lg:max-w-[700px]">
      <h3 className="text-xl font-semibold mb-3 text-white border-b border-white/20 pb-1">
        {title}
      </h3>
      {items.length > 0 ? (
        <ul className="list-disc list-inside text-white/90 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 italic">No data available</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 mt-8 px-4">
      <Card title="Strengths" items={strengths} />
      <Card title="Weaknesses" items={weaknesses} />
      <Card title="Recommendations" items={recommendations} />
    </div>
  );
}
