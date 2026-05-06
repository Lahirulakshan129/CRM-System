import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const LeadsContext = createContext();

export const useLeads = () => useContext(LeadsContext);

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const params = {};

      if (filters.status && filters.status !== 'All') params.status = filters.status;
      if (filters.source && filters.source !== 'All') params.source = filters.source;
      if (filters.salesperson && filters.salesperson !== 'All') params.salesperson = filters.salesperson;
      if (filters.search) params.search = filters.search;

      const response = await api.get('/leads', { params });
      setLeads(response.data);
    } catch (error) {
      console.error('Failed to fetch leads', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshLeads = useCallback((filters = {}) => {
    fetchLeads(filters);
  }, [fetchLeads]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const addLead = async (leadData) => {
    const response = await api.post('/leads', leadData);
    await fetchLeads();
    return response.data;
  };

  const updateLead = async (id, leadData) => {
    const response = await api.put(`/leads/${id}`, leadData);
    await fetchLeads();
    return response.data;
  };

  const deleteLead = async (id) => {
    await api.delete(`/leads/${id}`);
    await fetchLeads();
  };

  const addNote = async (leadId, content, author) => {
    const response = await api.post(`/leads/${leadId}/notes`, {
      content,
      createdBy: author,
    });
    await fetchLeads();
    return response.data;
  };

  const getLeadById = (id) => {
    return leads.find(lead => lead.id === parseInt(id));
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        loading,
        addLead,
        updateLead,
        deleteLead,
        addNote,
        getLeadById,
        refreshLeads,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};