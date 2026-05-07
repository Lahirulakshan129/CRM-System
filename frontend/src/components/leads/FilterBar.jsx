import { useEffect, useState } from "react";
import api from "../../api/axios";

const FilterBar = ({ filters, onFilterChange, searchTerm, onSearchChange }) => {
  const [statusOptions, setStatusOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [salespersonOptions, setSalespersonOptions] = useState([]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const [statusRes, sourceRes, salespersonRes] = await Promise.all([
        api.get("/leads/statuses"),
        api.get("/leads/sources"),
        api.get("/users/salespeople"),
      ]);

      setStatusOptions(statusRes.data);
      setSourceOptions(sourceRes.data);

      setSalespersonOptions([
        { id: "all", name: "All" },
        ...salespersonRes.data,
      ]);
    } catch (err) {
      console.error("Failed to load filter options", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* SEARCH */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Name, email, or company..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>

          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>

            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* SOURCE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>

          <select
            value={filters.source}
            onChange={(e) => onFilterChange("source", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>

            {sourceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* SALES PERSON */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salesperson
          </label>

          <select
            value={filters.salesperson}
            onChange={(e) => onFilterChange("salesperson", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>

            {salespersonOptions.map((person) => (
              <option key={person.id} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
