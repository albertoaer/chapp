export interface LoginData {
  name: string;
  picture: string;
}

export interface Identification {
  name: string;
  id: number;
  token: string;
}

export interface Info {
  name: string;
  picture: string;
  id: number;
  description: string;
  login: string
}

export type UserEvent =
  { type: 'log in', identification: Identification } |
  { type: 'log out', identification: null };