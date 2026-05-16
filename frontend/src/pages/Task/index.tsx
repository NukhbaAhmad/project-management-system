import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useRestoreTask,
} from "@/hooks/useTaskMutation";
import { useGetProjects } from "@/hooks/useProjectMutation";
import TaskFilters from "@/components/tasks/TaskFilters";
import TasksTable from "@/components/tasks/TaskTable";
import Pagination from "@/components/common/Pagination";
import { TaskFormModal } from "@/components/tasks/TaskFormModal";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { Task } from "@/types/task";

const Tasks: React.FC = () => {
  // Filters
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    project_id: "",
    title: "",
    status: "",
    is_trashed: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    type: "delete" | "restore";
    task: Task;
  } | null>(null);

  // Fetch projects for the dropdown
  const { data: projectsData } = useGetProjects({
    page: 1,
    limit: 100,
    is_trashed: false,
  });
  const projects = projectsData?.results || [];

  // Fetch tasks
  const { data, isLoading } = useTasks({
    page,
    limit: 10,
    project_id: filters.project_id || undefined,
    title: filters.title || undefined,
    status:
      (filters.status as "pending" | "in_progress" | "completed") || undefined,
    is_trashed: filters.is_trashed,
  });

  const tasks = data?.tasks || [];
  const pagination = data?.pagination || {
    page: 1,
    pages: 1,
    total: 0,
    limit: 10,
  };

  // Mutations
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();
  const restoreMutation = useRestoreTask();

  const handleCreate = (formData: any) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        setModalOpen(false);
        setPage(1);
      },
    });
  };

  const handleUpdate = (formData: any) => {
    if (!editingTask) return;
    updateMutation.mutate(
      { id: editingTask.id, payload: formData },
      {
        onSuccess: () => {
          setModalOpen(false);
          setEditingTask(null);
        },
      }
    );
  };

  const handleDelete = (task: Task) => {
    deleteMutation.mutate(task.id, { onSuccess: () => setConfirmDialog(null) });
  };

  const handleRestore = (task: Task) => {
    restoreMutation.mutate(task.id, {
      onSuccess: () => setConfirmDialog(null),
    });
  };

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    restoreMutation.isPending;

  const [searchParams] = useSearchParams();
  const projectIdFromUrl = searchParams.get("project_id");

  useEffect(() => {
    if (projectIdFromUrl) {
      setFilters((prev) => ({ ...prev, project_id: projectIdFromUrl }));
    }
  }, [projectIdFromUrl]);
  return (
    <div className="w-full bg-[#0d1321]">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold text-gray-100">Tasks</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-md bg-[#465FFF] px-4 py-2 text-white hover:bg-brand-600 transition"
          >
            + New Task
          </button>
        </div>

        <TaskFilters
          filters={filters}
          projects={projects}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
        />

        <TasksTable
          tasks={tasks}
          loading={isLoading}
          onEdit={(task: Task) => {
            setEditingTask(task);
            setModalOpen(true);
          }}
          onDelete={(task: Task) => setConfirmDialog({ type: "delete", task })}
          onRestore={(task: Task) =>
            setConfirmDialog({ type: "restore", task })
          }
        />

        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={setPage}
        />

        <TaskFormModal
          isOpen={modalOpen}
          task={editingTask}
          projects={projects}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          isLoading={isMutating}
        />

        {confirmDialog && (
          <ConfirmModal
            isOpen={true}
            title={
              confirmDialog.type === "delete"
                ? "Move to trash?"
                : "Restore task?"
            }
            message={`Are you sure you want to ${confirmDialog.type === "delete" ? "delete" : "restore"} "${confirmDialog.task.title}"?`}
            confirmLabel={
              confirmDialog.type === "delete" ? "Move to trash" : "Restore"
            }
            isDanger={confirmDialog.type === "delete"}
            onConfirm={() => {
              if (confirmDialog.type === "delete")
                handleDelete(confirmDialog.task);
              else handleRestore(confirmDialog.task);
            }}
            onCancel={() => setConfirmDialog(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks;
