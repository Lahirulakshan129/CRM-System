import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  const cards = [
    { title: 'Total Leads', value: stats.totalLeads, color: 'bg-blue-500' },
    { title: 'New Leads', value: stats.newLeads, color: 'bg-green-500' },
    { title: 'Qualified Leads', value: stats.qualifiedLeads, color: 'bg-purple-500' },
    { title: 'Won Leads', value: stats.wonLeads, color: 'bg-yellow-500' },
    { title: 'Lost Leads', value: stats.lostLeads, color: 'bg-red-500' },
    { title: 'Total Deal Value', value: `$${stats.totalDealValue?.toLocaleString() || 0}`, color: 'bg-indigo-500' },
    { title: 'Won Deal Value', value: `$${stats.wonDealValue?.toLocaleString() || 0}`, color: 'bg-teal-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4">
              <div className="text-sm font-medium text-gray-500">{card.title}</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">{card.value}</div>
            </div>
            <div className={`h-1 ${card.color}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;