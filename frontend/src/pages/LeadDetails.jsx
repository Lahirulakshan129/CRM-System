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
      New: 'bg-blue-50 text-blue-700',
      Qualified: 'bg-purple-50 text-purple-700',
      Won: 'bg-emerald-50 text-emerald-700',
      Lost: 'bg-rose-50 text-rose-700',
      Contacted: 'bg-amber-50 text-amber-700'
    };
    return colors[status] || 'bg-gray-50 text-gray-700';
  };

  if (loading || !lead) return <LoadingSpinner />;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="w-full px-2 sm:px-0 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/leads')}
            className="text-sm text-gray-500 hover:text-gray-700 mb-2"
          >
            ← Back to Leads
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Lead Details
          </h1>
        </div>

        <button
          onClick={() => navigate(`/leads/${id}/edit`)}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Edit
        </button>
      </div>

      {/* Info Card */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          <div>
            <p className="text-xs text-gray-500 mb-1">Lead Name</p>
            <p className="text-gray-800 font-medium">{lead.name}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Company</p>
            <p className="text-gray-800">{lead.company}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-gray-800">{lead.email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Phone</p>
            <p className="text-gray-800">{lead.phone || 'Not provided'}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <span className={`px-2 py-1 text-xs rounded-md ${getStatusColor(lead.status)}`}>
              {lead.status}
            </span>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Deal Value</p>
            <p className="text-gray-800 font-medium">
              ${(lead.dealValue || 0).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Source</p>
            <p className="text-gray-800">{lead.source}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Salesperson</p>
            <p className="text-gray-800">{lead.assignedSalesperson}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Created</p>
            <p className="text-gray-800">{formatDate(lead.createdAt)}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Updated</p>
            <p className="text-gray-800">{formatDate(lead.updatedAt)}</p>
          </div>

        </div>
      </div>

      {/* Notes */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-5">
        <NotesSection
          notes={lead.notes || []}
          onAddNote={handleAddNote}
          isAdding={isAddingNote}
        />
      </div>

    </div>
  );
};

export default LeadDetails;