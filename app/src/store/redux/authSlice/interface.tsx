export interface CreateUserPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  token: string;
  loading: boolean;
  error: string | null;
  creating: boolean;
}
