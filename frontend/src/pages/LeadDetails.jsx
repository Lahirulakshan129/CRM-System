import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLeads } from '../contexts/LeadsContext';
import NotesSection from '../components/leads/NotesSection';
import LoadingSpinner from '../components/LoadingSpinner';

const LeadDetails = () => {
  const { id } = useParams();
  const { getLeadById, addNote, loading, refreshLeads } = useLeads();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    const foundLead = getLeadById(id);
    if (foundLead) {
      setLead(foundLead);
    } else {
      navigate('/leads');
    }
  }, [id, getLeadById, navigate]);

  const handleAddNote = async (content, author) => {
    setIsAddingNote(true);
    try {
      await addNote(id, content, author);
      await refreshLeads();
      const updatedLead = getLeadById(id);
      setLead(updatedLead);
    } finally {
      setIsAddingNote(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      New: 'bg-blue-100 text-blue-800',
      Qualified: 'bg-purple-100 text-purple-800',
      Won: 'bg-green-100 text-green-800',
      Lost: 'bg-red-100 text-red-800',
      Contacted: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading || !lead) return <LoadingSpinner />;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
        <button
          onClick={() => navigate(`/leads/${id}/edit`)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Edit Lead
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Lead Name</h3>
            <p className="mt-1 text-lg text-gray-900">{lead.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Company</h3>
            <p className="mt-1 text-gray-900">{lead.company}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-gray-900">{lead.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
            <p className="mt-1 text-gray-900">{lead.phone || 'Not provided'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Deal Value</h3>
            <p className="mt-1 text-gray-900">${(lead.dealValue || 0).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Lead Source</h3>
            <p className="mt-1 text-gray-900">{lead.source}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Assigned Salesperson</h3>
            <p className="mt-1 text-gray-900">{lead.assignedSalesperson}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Created Date</h3>
            <p className="mt-1 text-gray-900">{formatDate(lead.createdAt)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
            <p className="mt-1 text-gray-900">{formatDate(lead.updatedAt)}</p>
          </div>
        </div>
      </div>

      <NotesSection
        notes={lead.notes || []}
        onAddNote={handleAddNote}
        isAdding={isAddingNote}
      />
    </div>
  );
};

export default LeadDetails;