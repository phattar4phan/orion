import { motion } from 'framer-motion';

const data = [
  { epoch: 1, accuracy: 65 },
  { epoch: 2, accuracy: 72 },
  { epoch: 3, accuracy: 78 },
  { epoch: 4, accuracy: 85 },
  { epoch: 5, accuracy: 88 },
  { epoch: 6, accuracy: 90 },
  { epoch: 7, accuracy: 92 },
  { epoch: 8, accuracy: 94 },
  { epoch: 9, accuracy: 95 },
  { epoch: 10, accuracy: 96 },
];

const LineChart = () => {
  const width = 500;
  const height = 250;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = (epoch: number) => margin.left + (epoch - 1) * (innerWidth / (data.length - 1));
  const yScale = (accuracy: number) => margin.top + innerHeight - (accuracy / 100) * innerHeight;

  const points = data.map(d => `${xScale(d.epoch)},${yScale(d.accuracy)}`).join(' ');

  return (
    <div className="mt-8 w-full flex items-center justify-center">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-xl">
        {/* X and Y axes */}
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + innerHeight} stroke="currentColor" className="text-gray-600" />
        <line x1={margin.left} y1={margin.top + innerHeight} x2={margin.left + innerWidth} y2={margin.top + innerHeight} stroke="currentColor" className="text-gray-600" />

        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map(val => (
          <g key={val}>
            <text x={margin.left - 10} y={yScale(val)} textAnchor="end" alignmentBaseline="middle" className="text-xs text-gray-400 fill-current">{val}%</text>
            <line x1={margin.left} y1={yScale(val)} x2={margin.left + innerWidth} y2={yScale(val)} strokeDasharray="2,2" className="text-gray-700" stroke="currentColor" />
          </g>
        ))}

        {/* X-axis labels */}
        {data.map(d => (
          <text key={d.epoch} x={xScale(d.epoch)} y={margin.top + innerHeight + 15} textAnchor="middle" className="text-xs text-gray-400 fill-current">{d.epoch}</text>
        ))}
        <text x={width / 2} y={height - 5} textAnchor="middle" className="text-sm text-gray-500 fill-current">Epoch</text>


        <motion.polyline
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          points={points}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A2BE2" />
            <stop offset="100%" stopColor="#4A90E2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LineChart;
