import { ApiResponse } from "./general";

// Define your core User model object structure
export interface User {
  name: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface AuthResponse extends ApiResponse {
  data: {
    user: User;
    access_token: string;
  };
}
