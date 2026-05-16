import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateUser, useDeleteUser } from "@/hooks/useUserMutation";
import Button from "@/components/form/Button";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { showToast } from "@/lib/toast";

const Profile: React.FC = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    updateMutation.mutate({
      userId: user.id,
      payload: {
        name: formData.name,
        username: formData.username,
      },
    });
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    console.log("user", user);
    if (!user?.id) {
      showToast.error(
        "User information not available. Please refresh the page."
      );
      return;
    }
    deleteMutation.mutate(user.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="w-full text-[#e2e8f0] p-1">
      <div className="max-w-[1600px] mx-auto rounded-2xl border border-[#1f2937] bg-[#111827] p-8 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1f2937] pb-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="h-15 w-15 rounded-full bg-[#5865f2]/10 border border-[#5865f2]/30 flex items-center justify-center text-[#5865f2] font-bold text-2xl uppercase">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {user?.name}
              </h2>
              <p className="text-sm text-[#94a3b8] mt-0.5">@{user?.username}</p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-lg border border-[#1f2937] bg-[#1e293b]/40 px-4 py-2 text-sm font-semibold text-[#e2e8f0] transition hover:bg-[#1e293b]/80"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span>Edit</span>
            </button>
          )}
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <div className="flex flex-col">
              <label className="mb-2 text-xs font-semibold tracking-wider uppercase text-[#94a3b8]">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#1f2937] bg-[#0d1321] px-4 py-2.5 text-sm font-medium text-[#e2e8f0] outline-none transition focus:border-[#5865f2] focus:ring-1 focus:ring-[#5865f2]"
                />
              ) : (
                <p className="text-base font-bold text-white py-1">
                  {user?.name}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-xs font-semibold tracking-wider uppercase text-[#94a3b8]">
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#1f2937] bg-[#0d1321] px-4 py-2.5 text-sm font-medium text-[#e2e8f0] outline-none transition focus:border-[#5865f2] focus:ring-1 focus:ring-[#5865f2]"
                />
              ) : (
                <p className="text-base font-bold text-white py-1">
                  {user?.username}
                </p>
              )}
            </div>

            <div className="flex flex-col md:col-span-2 max-w-xl">
              <label className="mb-2 text-xs font-semibold tracking-wider uppercase text-[#94a3b8]">
                Email Address
              </label>
              <p className="text-base font-bold text-white py-1">
                {user?.email}
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center justify-end gap-3 border-t border-[#1f2937] pt-6">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  if (user) {
                    setFormData({
                      name: user.name,
                      username: user.username,
                      email: user.email,
                    });
                  }
                }}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#94a3b8] hover:text-white transition"
              >
                Cancel
              </button>
              <Button
                type="submit"
                text="Save Changes"
                isLoading={updateMutation.isPending}
                className="!w-auto !mt-0 px-6 bg-[#5865f2] hover:bg-[#4752c4] focus:ring-[#5865f2]"
              />
            </div>
          )}
        </form>

        {!isEditing && (
          <div className="mt-8 pt-4 border-t border-[#1f2937] flex flex-wrap sm:flex-nowrap items-center justify-between gap-6">
            <div>
              <p className="text-xs text-[#94a3b8] mt-1 max-w-md leading-relaxed">
                Permanently delete the user and all of its related projects &
                tasks.
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              text="Delete Account"
              isLoading={deleteMutation.isPending}
              className="!w-auto !mt-0 px-5 bg-red-600/10 !text-red-400 border border-red-500/20 hover:bg-red-600 hover:!text-white transition focus:ring-red-500"
            />
          </div>
        )}
      </div>

      {/* Confirm Modal for Delete */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Account"
        message="CRITICAL WARNING: Are you sure you want to permanently delete your account? This action cannot be reversed. All your projects and tasks will be permanently lost."
        confirmLabel="Delete Permanently"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};

export default Profile;
