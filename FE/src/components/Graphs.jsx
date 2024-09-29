import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Tests Conducted',
      data: [12, 19, 3, 5, 2, 3, 12, 8, 9, 14, 6, 4],
      backgroundColor: '#436A50',
    },
  ],
};

const pieData = {
  labels: ['Negative', 'Positive', 'Pending'],
  datasets: [
    {
      label: '# of Votes',
      data: [322, 23, 345],
      backgroundColor: ['#436A50', '#F85F73', '#F0AD4E'],
    },
  ],
};

const Graphs = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
     <div className="bg-white p-4 rounded-lg shadow">
  <h3 className="text-xl font-bold mb-3">Test Results Overview</h3>
  <div className="relative w-60 h-60 mx-auto"> {/* Adjust the size here */}
    <Doughnut data={pieData} options={{ maintainAspectRatio: false }} />
  </div>
</div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-bold">Tests Conducted per Month</h3>
        <Bar data={barData} />
      </div>
    </section>
  );
};

export default Graphs;
