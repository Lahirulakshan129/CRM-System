// src/pages/EditLead.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLeads } from '../contexts/LeadsContext';
import LeadForm from '../components/leads/LeadForm';
import LoadingSpinner from '../components/LoadingSpinner';

const EditLead = () => {
  const { id } = useParams();
  const { getLeadById, updateLead, loading } = useLeads();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const foundLead = getLeadById(id);
    if (foundLead) {
      setLead(foundLead);
    } else {
      navigate('/leads');
    }
  }, [id, getLeadById, navigate]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const dealValue = parseFloat(formData.dealValue) || 0;
      await updateLead(id, { ...formData, dealValue });
      navigate('/leads');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !lead) return <LoadingSpinner />;

  return (
    <div className="w-full px-2 sm:px-0 space-y-6">

      <div>
        <button
          onClick={() => navigate(`/leads/${id}`)}
          className="text-sm text-gray-500 hover:text-gray-700 mb-2"
        >
          ← Back to Lead
        </button>

        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Edit Lead
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Update lead information and details
        </p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-6">
        <LeadForm
          initialData={lead}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>

    </div>
  );
};

export default EditLead;