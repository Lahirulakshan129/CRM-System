// src/pages/CreateLead.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLeads } from '../contexts/LeadsContext'
import LeadForm from '../components/leads/LeadForm'

const CreateLead = () => {
  const { addLead } = useLeads()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      const dealValue = parseFloat(formData.dealValue) || 0
      await addLead({ ...formData, dealValue })
      navigate('/leads')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Lead</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <LeadForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  )
}

export default CreateLead