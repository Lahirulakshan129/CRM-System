// src/utils/helpers.js
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(value)
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}