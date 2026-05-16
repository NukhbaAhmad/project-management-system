// components/projects/ProjectFilters.tsx
import React, { useState, useEffect } from "react";

interface Filters {
  title: string;
  is_trashed: boolean;
}

interface ProjectFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  debounceMs?: number;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  debounceMs = 800,
}) => {
  const [title, setTitle] = useState(filters.title);

  // Debounced title update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== filters.title) {
        onFilterChange({ ...filters, title });
      }
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [title, debounceMs, filters, onFilterChange]);

  const handleTrashedChange = (checked: boolean) => {
    onFilterChange({ ...filters, is_trashed: checked });
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Search by Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={filters.is_trashed}
          onChange={(e) => handleTrashedChange(e.target.checked)}
          className="rounded border-gray-300 dark:border-gray-600"
        />
        Show trashed
      </label>
    </div>
  );
};

export default ProjectFilters;
