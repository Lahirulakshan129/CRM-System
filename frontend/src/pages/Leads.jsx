import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../contexts/LeadsContext';
import LeadTable from '../components/leads/LeadTable';
import FilterBar from '../components/leads/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';

const Leads = () => {
  const { leads, loading, deleteLead, refreshLeads } = useLeads();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'All', source: 'All', salesperson: 'All' });
  const [deletingId, setDeletingId] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    refreshLeads({ ...filters, search: debouncedSearch });
  }, [filters, debouncedSearch, refreshLeads]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setDeletingId(id);
      await deleteLead(id);
      setDeletingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full px-2 sm:px-0">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
            Leads
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all your leads</p>
        </div>
        <button
          onClick={() => navigate('/leads/new')}
          className="px-5 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-all duration-200 text-sm font-medium border border-indigo-100"
        >
          + Create Lead
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <LeadTable
          leads={leads}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      </div>
    </div>
  );
};

export default Leads;