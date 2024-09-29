import React from 'react';

const metrics = [
  { name: 'Registered Athletes', value: '1,456', change: '+4.5%', icon: '🏅' },
  { name: 'Pending Tests', value: '345', change: '-2.1%', icon: '⏳' },
  { name: 'Positive Results', value: '23', change: '+1.0%', icon: '⚠️' },
  { name: 'Negative Results', value: '322', change: '+3.5%', icon: '✅' },
];

const Metrics = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div className="text-gray-500">{metric.name}</div>
            <div className="text-3xl">{metric.icon}</div>
          </div>
          <div className="mt-2 text-2xl font-bold">{metric.value}</div>
          <div className={`mt-1 text-sm ${metric.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
            {metric.change}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Metrics;
