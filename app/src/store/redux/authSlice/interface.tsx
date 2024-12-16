export interface IUser {
  id: number;
  email: string;
  username: string;
}

export interface IAuthState {
  token: string | null;
  user: IUser | null;
  loading: boolean;
  error: string | null;
  creating: boolean;
}

export interface IResponse {
  status: string;
  message: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
}

export interface ILoginFormValues  {
  email: string;
  password: string;
};

export interface IRegisterFormValues  {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
};
