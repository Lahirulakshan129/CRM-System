// src/pages/EditLead.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLeads } from '../contexts/LeadsContext'
import LeadForm from '../components/leads/LeadForm'
import LoadingSpinner from '../components/LoadingSpinner'

const EditLead = () => {
  const { id } = useParams()
  const { getLeadById, updateLead, loading } = useLeads()
  const navigate = useNavigate()
  const [lead, setLead] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const foundLead = getLeadById(id)
    if (foundLead) {
      setLead(foundLead)
    } else {
      navigate('/leads')
    }
  }, [id, getLeadById, navigate])

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      const dealValue = parseFloat(formData.dealValue) || 0
      await updateLead(id, { ...formData, dealValue })
      navigate('/leads')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !lead) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Lead</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <LeadForm initialData={lead} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}

export default EditLead