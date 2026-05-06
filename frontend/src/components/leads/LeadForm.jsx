import { useState } from 'react';

const LeadForm = ({ initialData = {}, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    company: initialData.company || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    source: initialData.source || 'Website',
    assignedSalesperson: initialData.assignedSalesperson || 'John Doe',
    status: initialData.status || 'New',
    dealValue: initialData.dealValue || '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.company.trim()) newErrors.company = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.status) newErrors.status = 'Required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);
    onSubmit(formData);
  };

  const inputStyle =
    'w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500';

  const labelStyle = 'text-xs text-gray-500 mb-1';

  const sourceOptions = ['Website', 'Referral', 'Social Media', 'Advertisement', 'Direct'];
  const salespersonOptions = ['Lahiru', 'Kasun', 'Saman', 'Nimal', 'Nipun'];
  const statusOptions = ['New', 'Qualified', 'Won', 'Lost', 'Contacted'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <p className={labelStyle}>Lead Name *</p>
          <input name="name" value={formData.name} onChange={handleChange} className={inputStyle} />
          {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <p className={labelStyle}>Company *</p>
          <input name="company" value={formData.company} onChange={handleChange} className={inputStyle} />
          {errors.company && <p className="text-xs text-rose-500 mt-1">{errors.company}</p>}
        </div>

        <div>
          <p className={labelStyle}>Email *</p>
          <input name="email" value={formData.email} onChange={handleChange} className={inputStyle} />
          {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <p className={labelStyle}>Phone</p>
          <input name="phone" value={formData.phone} onChange={handleChange} className={inputStyle} />
        </div>

        <div>
          <p className={labelStyle}>Source</p>
          <select name="source" value={formData.source} onChange={handleChange} className={inputStyle}>
            {sourceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <p className={labelStyle}>Salesperson</p>
          <select name="assignedSalesperson" value={formData.assignedSalesperson} onChange={handleChange} className={inputStyle}>
            {salespersonOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        <div>
          <p className={labelStyle}>Status *</p>
          <select name="status" value={formData.status} onChange={handleChange} className={inputStyle}>
            {statusOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {errors.status && <p className="text-xs text-rose-500 mt-1">{errors.status}</p>}
        </div>

        <div>
          <p className={labelStyle}>Deal Value</p>
          <input type="number" name="dealValue" value={formData.dealValue} onChange={handleChange} className={inputStyle} />
        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">

        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Lead'}
        </button>

      </div>

    </form>
  );
};

export default LeadForm;