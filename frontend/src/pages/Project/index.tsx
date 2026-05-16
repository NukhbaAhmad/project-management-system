// pages/Projects.tsx
import React, { useState } from "react";
import {
  useGetProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  useRestoreProject,
  useRestoreProjectTasks,
} from "@/hooks/useProjectMutation";
import { Project } from "@/types/project";
import ProjectFilters from "@/components/projects/ProjectFilters";
import ProjectsTable from "@/components/projects/ProjectTable";
import Pagination from "@/components/common/Pagination";
import { ProjectFormModal } from "@/components/projects/ProjectFormModal";
import { ConfirmModal } from "@/components/common/ConfirmModal";

const Projects: React.FC = () => {
  // Local state
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ title: "", is_trashed: false });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    type: "delete" | "restore" | "restoreTasks";
    project: Project;
  } | null>(null);

  // React Query
  const { data, isLoading } = useGetProjects({
    page,
    limit: 10,
    title: filters.title || undefined,
    is_trashed: filters.is_trashed,
  });

  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();
  const restoreMutation = useRestoreProject();
  const restoreTasksMutation = useRestoreProjectTasks();

  const projects = data?.results || [];
  const pagination = {
    page: data?.page || 1,
    pages: data?.pages || 1,
    total: data?.total || 0,
    limit: 10,
  };

  // Handlers
  const handleCreate = (formData: { title: string; description?: string }) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        setModalOpen(false);
        setPage(1);
      },
    });
  };

  const handleUpdate = (formData: { title: string; description?: string }) => {
    if (!editingProject) return;
    updateMutation.mutate(
      { projectId: editingProject.id, payload: formData },
      {
        onSuccess: () => {
          setModalOpen(false);
          setEditingProject(null);
        },
      }
    );
  };

  const handleDelete = (project: Project) => {
    deleteMutation.mutate(
      { projectId: project.id },
      {
        onSuccess: () => setConfirmDialog(null),
      }
    );
  };

  const handleRestore = (project: Project) => {
    restoreMutation.mutate(
      { projectId: project.id },
      {
        onSuccess: () => setConfirmDialog(null),
      }
    );
  };

  const handleRestoreTasks = (project: Project) => {
    restoreTasksMutation.mutate(
      { projectId: project.id },
      {
        onSuccess: () => setConfirmDialog(null),
      }
    );
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProject(null);
  };

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending ||
    restoreMutation.isPending ||
    restoreTasksMutation.isPending;

  return (
    <div className="min-h-screen bg-[#0d1321] p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-100">Projects</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-md bg-[#465FFF] px-4 py-2 text-white hover:bg-brand-600 transition"
          >
            + New Project
          </button>
        </div>

        {/* Filters */}
        <ProjectFilters
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
        />

        {/* Table */}
        <ProjectsTable
          projects={projects}
          loading={isLoading}
          onEdit={openEditModal}
          onDelete={(p: Project) =>
            setConfirmDialog({ type: "delete", project: p })
          }
          onRestore={(p: Project) =>
            setConfirmDialog({ type: "restore", project: p })
          }
          onRestoreTasks={(p: Project) =>
            setConfirmDialog({ type: "restoreTasks", project: p })
          }
        />

        {/* Pagination */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={setPage}
        />

        {/* Modals */}
        <ProjectFormModal
          isOpen={modalOpen}
          project={editingProject}
          onClose={closeModal}
          onSubmit={editingProject ? handleUpdate : handleCreate}
          isLoading={isMutating}
        />

        {confirmDialog && (
          <ConfirmModal
            isOpen={true}
            title={
              confirmDialog.type === "delete"
                ? "Move to trash?"
                : confirmDialog.type === "restore"
                  ? "Restore project?"
                  : "Restore all tasks?"
            }
            message={
              confirmDialog.type === "delete"
                ? `Are you sure you want to move "${confirmDialog.project.title}" to trash?`
                : confirmDialog.type === "restore"
                  ? `Restore "${confirmDialog.project.title}"?`
                  : `Restore all tasks belonging to "${confirmDialog.project.title}"?`
            }
            confirmLabel={
              confirmDialog.type === "delete" ? "Move to trash" : "Restore"
            }
            isDanger={confirmDialog.type === "delete"}
            onConfirm={() => {
              if (confirmDialog.type === "delete")
                handleDelete(confirmDialog.project);
              if (confirmDialog.type === "restore")
                handleRestore(confirmDialog.project);
              if (confirmDialog.type === "restoreTasks")
                handleRestoreTasks(confirmDialog.project);
            }}
            onCancel={() => setConfirmDialog(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
