import React from "react";
import { Project } from "@/types/project";
import {
  EditIcon as PencilIcon,
  DeleteIcon as TrashIcon,
  RestoreIcon as ArrowPathIcon,
  RestoreTasksIcon as DocumentArrowDownIcon,
} from "@/icons";
import NoData from "@/components/noData/NoData";

interface ProjectsTableProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
  onRestore: (project: Project) => void;
  onRestoreTasks: (project: Project) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects,
  loading,
  onEdit,
  onDelete,
  onRestore,
  onRestoreTasks,
}) => {
  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Loading projects...
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <NoData />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
          {projects.map((project) => (
            <tr
              key={project.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                {project.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {project.description || "-"}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {project.is_trashed ? (
                  <span className="inline-flex rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-400">
                    Trashed
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-400">
                    Active
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  {!project.is_trashed ? (
                    <>
                      <button
                        onClick={() => onEdit(project)}
                        className="text-brand-600 dark:text-white hover:text-brand-800 dark:hover:text-gray-300 cursor-pointer"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(project)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 cursor-pointer"
                        title="Move to trash"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => onRestore(project)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400"
                        title="Restore project"
                      >
                        <ArrowPathIcon className="h-5 w-5" />
                      </button>
                      {!project.is_trashed && (
                        <button
                          onClick={() => onRestoreTasks(project)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                          title="Restore all tasks"
                        >
                          <DocumentArrowDownIcon className="h-5 w-5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
