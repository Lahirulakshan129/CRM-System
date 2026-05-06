// src/pages/Dashboard.jsx
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
    { title: 'Total Leads', value: stats.totalLeads, color: 'border-blue-200 bg-blue-50/30' },
    { title: 'New Leads', value: stats.newLeads, color: 'border-emerald-200 bg-emerald-50/30' },
    { title: 'Qualified Leads', value: stats.qualifiedLeads, color: 'border-purple-200 bg-purple-50/30' },
    { title: 'Won Leads', value: stats.wonLeads, color: 'border-amber-200 bg-amber-50/30' },
    { title: 'Lost Leads', value: stats.lostLeads, color: 'border-rose-200 bg-rose-50/30' },
    { title: 'Total Deal Value', value: `$${stats.totalDealValue?.toLocaleString() || 0}`, color: 'border-indigo-200 bg-indigo-50/30' },
    { title: 'Won Deal Value', value: `$${stats.wonDealValue?.toLocaleString() || 0}`, color: 'border-teal-200 bg-teal-50/30' },
  ];

  return (
    <div className="w-full px-2 sm:px-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">Lead performance at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`group rounded-xl border-l-4 ${card.color} border border-gray-100 bg-white hover:shadow-sm transition-all duration-200`}
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                {card.title}
              </div>
              <div className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight break-words">
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;