import React from "react";
import { Task } from "@/types/task";
import {
  EditIcon as PencilIcon,
  DeleteIcon as TrashIcon,
  RestoreIcon as ArrowPathIcon,
} from "@/icons";
import formatStatus from "@/utils/general";
import LoadingSpinner from "../loader";
import NoData from "../noData/NoData";

interface TasksTableProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onRestore: (task: Task) => void;
}

const statusColor = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  in_progress:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

const TasksTable: React.FC<TasksTableProps> = ({
  tasks,
  loading,
  onEdit,
  onDelete,
  onRestore,
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (tasks.length === 0) {
    return <NoData />;
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
              State
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                {task.title}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {task.description || "-"}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {task.is_trashed ? (
                  <span className="inline-flex rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-400">
                    Trashed
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-800 dark:text-green-400">
                    Active
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusColor[task.status]}`}
                >
                  {formatStatus(task.status)}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                {new Date(task.createdAt).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  {!task.is_trashed ? (
                    <>
                      <button
                        onClick={() => onEdit(task)}
                        className="text-brand-600 dark:text-white hover:text-brand-800 dark:hover:text-gray-300"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(task)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400"
                        title="Move to trash"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => onRestore(task)}
                      className="text-green-600 hover:text-green-900 dark:text-green-400"
                      title="Restore"
                    >
                      <ArrowPathIcon className="h-5 w-5" />
                    </button>
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

export default TasksTable;
