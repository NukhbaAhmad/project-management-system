import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/api/userService";
import {
  UserResponse,
  UpdateUserPayload,
  DeleteUserResponse,
} from "@/types/user";
import { showToast } from "@/lib/toast";
import { parsedError } from "@/lib/errorHandler";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => userService.GET_USER(userId),
    select: (res: UserResponse) => res.data,
    enabled: !!userId,
  });
};

// ---------- MUTATIONS ----------
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { loginUser, user } = useAuth();

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateUserPayload;
    }) => userService.UPDATE_USER(userId, payload),
    onSuccess: (res: UserResponse) => {
      showToast.success(res.message || "Profile updated successfully");
      const updatedUser = res.data;
      if (user && loginUser) {
        const token = localStorage.getItem("token");
        if (token) loginUser(updatedUser, token);
      }
      queryClient.invalidateQueries({ queryKey: ["user", updatedUser.id] });
    },
    onError: (error: any) => {
      showToast.error(parsedError(error, "Update failed"));
    },
  });
};

export const useDeleteUser = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userId: string) => userService.DELETE_USER(userId),
    onSuccess: (res: DeleteUserResponse) => {
      showToast.success(res.message || "Account deleted");
      logoutUser();
      navigate("/signin", { replace: true });
    },
    onError: (error: any) => {
      showToast.error(parsedError(error, "Deletion failed"));
    },
  });
};
