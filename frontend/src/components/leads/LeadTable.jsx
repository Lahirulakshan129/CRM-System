import { Link } from "react-router-dom";

const LeadTable = ({ leads, onDelete, deletingId }) => {
  const getStatusColor = (status) => {
    const colors = {
      NEW: "bg-blue-100 text-blue-800",
      QUALIFIED: "bg-purple-100 text-purple-800",
      WON: "bg-green-100 text-green-800",
      LOSS: "bg-red-100 text-red-800",
      CONTACTED: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No leads found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deal Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Salesperson
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {lead.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {lead.company}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${(lead.dealValue || 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {lead.source}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {lead.assignedSalesperson}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Link
                  to={`/leads/${lead.id}`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  View
                </Link>
                <Link
                  to={`/leads/${lead.id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(lead.id)}
                  disabled={deletingId === lead.id}
                  className="text-red-600 hover:text-red-900 disabled:opacity-50"
                >
                  {deletingId === lead.id ? "..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
