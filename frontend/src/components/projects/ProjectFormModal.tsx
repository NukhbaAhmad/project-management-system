// components/project/ProjectFormModal.tsx
import React, { useState, useEffect } from "react";
import { Project } from "@/types/project";
import { validateFields } from "@/validations/formValidation";
import payloads from "@/constants/payloads";
import { showToast } from "@/lib/toast";

interface Props {
  isOpen: boolean;
  project?: Project | null;
  onClose: () => void;
  onSubmit: (data: { title: string; description?: string }) => void;
  isLoading: boolean;
}

export const ProjectFormModal: React.FC<Props> = ({
  isOpen,
  project,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Reset form when modal opens/closes or project changes
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
      });
    }
  }, [project, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine which validation schema to use
    const keysToValidate = project
      ? payloads.project.update // editing → update validation
      : payloads.project.create; // creating → create validation

    const validation = validateFields(formData, keysToValidate);

    if (!validation.isValid) {
      showToast.error(validation.message);
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {project ? "Edit Project" : "Create Project"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
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
              {isLoading ? "Saving..." : project ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
