export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  status: number;
  data: User;
  message?: string;
}

export interface UpdateUserPayload {
  name?: string;
  username?: string;
}

export interface DeleteUserResponse {
  status: number;
  message: string;
}
