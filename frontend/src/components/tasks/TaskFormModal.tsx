// components/tasks/TaskFormModal.tsx
import React, { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { Project } from "@/types/project";
import { validateFields } from "@/validations/formValidation";
import { showToast } from "@/lib/toast";
import { payload } from "@/constants";
import { InputField } from "../form";

interface Props {
  isOpen: boolean;
  task?: Task | null;
  projects: Project[];
  onClose: () => void;
  onSubmit: (data: {
    project_id: string;
    title: string;
    description?: string;
    status?: string;
  }) => void;
  isLoading: boolean;
}

export const TaskFormModal: React.FC<Props> = ({
  isOpen,
  task,
  projects,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    project_id: "",
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        project_id: task.project_id,
        title: task.title,
        description: task.description || "",
        status: task.status,
      });
    } else {
      setFormData({
        project_id: projects[0]?.id || "",
        title: "",
        description: "",
        status: "pending",
      });
    }
  }, [task, projects, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const keysToValidate = task ? payload.task.update : payload.task.create;
    const validation = validateFields(formData, keysToValidate);
    if (!validation.isValid) {
      showToast.error(validation.message);
      return;
    }
    onSubmit({
      project_id: formData.project_id,
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      status: formData.status,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {task ? "Edit Task" : "Create Task"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {!task && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project *
              </label>
              <select
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              >
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <InputField
              id="title"
              label="Title"
              required={true}
              type="text"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputField
              id="description"
              label="Description"
              name="description"
              type="text"
              placeholder="Enter task description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-[#465FFF] px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : task ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
