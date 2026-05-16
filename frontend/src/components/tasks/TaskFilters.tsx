import React, { useState, useEffect } from "react";
import { Project } from "@/types/project";

interface Filters {
  project_id: string;
  title: string;
  status: string;
  is_trashed: boolean;
}

interface TaskFiltersProps {
  filters: Filters;
  projects: Project[];
  onFilterChange: (filters: Filters) => void;
  debounceMs?: number;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  projects,
  onFilterChange,
  debounceMs = 800,
}) => {
  const [title, setTitle] = useState(filters.title);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== filters.title) {
        onFilterChange({ ...filters, title });
      }
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [title, debounceMs, filters, onFilterChange]);

  const handleProjectChange = (project_id: string) => {
    onFilterChange({ ...filters, project_id });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({ ...filters, status });
  };

  const handleTrashedChange = (checked: boolean) => {
    onFilterChange({ ...filters, is_trashed: checked });
  };

  return (
    <div className="mb-6 flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Project
        </label>
        <select
          value={filters.project_id}
          onChange={(e) => handleProjectChange(e.target.value)}
          className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Search title
        </label>
        <input
          type="text"
          placeholder="Search tasks..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

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

export default TaskFilters;
