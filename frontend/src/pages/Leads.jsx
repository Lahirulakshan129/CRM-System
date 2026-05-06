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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <button
          onClick={() => navigate('/leads/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create Lead
        </button>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <LeadTable
        leads={leads}
        onDelete={handleDelete}
        deletingId={deletingId}
      />
    </div>
  );
};

export default Leads;