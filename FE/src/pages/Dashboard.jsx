import React from 'react'
import Metrics from '../components/Metrics';
import Graphs from '../components/Graphs';
function Dashboard() {
    const recentTests = [
        { id: '#001', athlete: 'John Doe', date: '01/09/2024', result: 'Positive', price: '$150' },
        { id: '#002', athlete: 'Jane Smith', date: '01/09/2024', result: 'Negative', price: '$200' },
        { id: '#003', athlete: 'Mike Johnson', date: '02/09/2024', result: 'Pending', price: '$100' },
      ];
  return (
    <div>
       <div className="flex min-h-screen bg-gray-100">
      
       <div className="w-64 bg-[#12372A] text-white flex flex-col">
      <div className="p-6 font-bold text-xl">INVESTIGATOR</div>
      <nav className="flex-1 px-4 space-y-4">
        <a href="#" className="block py-2 text-gray-300 hover:bg-gray-800 rounded-lg">Dashboard</a>
        <a href="#" className="block py-2 text-gray-300 hover:bg-gray-800 rounded-lg">Registered Athletes</a>
        <a href="#" className="block py-2 text-gray-300 hover:bg-gray-800 rounded-lg">Test Results</a>
        <a href="#" className="block py-2 text-gray-300 hover:bg-gray-800 rounded-lg">Reports</a>
        <a href="#" className="block py-2 text-gray-300 hover:bg-gray-800 rounded-lg">Settings</a>
      </nav>
    </div>

      <div className="flex flex-col flex-1">
        <header className="bg-white shadow p-4 flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Welcome Back, Investigator</h1>
      <div className="flex items-center space-x-4">
        <input type="search" placeholder="Search..." className="border rounded-lg p-2" />
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Ritu Verma</span>
          <img
            className="w-10 h-10 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Investigator"
          />
        </div>
      </div>
    </header>
        <main className="p-6 space-y-6">
          <Metrics />
          <Graphs />
          <section className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Recent Test Results</h3>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Athlete</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Result</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {recentTests.map((test) => (
            <tr key={test.id} className="border-t">
              <td className="px-4 py-2">{test.id}</td>
              <td className="px-4 py-2">{test.athlete}</td>
              <td className="px-4 py-2">{test.date}</td>
              <td className="px-4 py-2">{test.result}</td>
              <td className="px-4 py-2">{test.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
        </main>
      </div>
    </div>
    </div>
  )
}

export default Dashboard
