export interface ICreateClientPayload {
  email: string;
  password: string;
}

export interface IClient {
  id: string;
  name: string;
  email: string;
}

export interface IClientState {
  clients: IClient[];
  loading: boolean;
  error: string | null;
  creating: boolean;
}
