export interface ICreateClientPayload {
  name: string;
  email: string;
}

export interface IClient {
  name: string;
  email: string;
}

export interface IClientState {
  clients: IClient[];
  loading: boolean;
  error: string | null;
  creating: boolean;
}
