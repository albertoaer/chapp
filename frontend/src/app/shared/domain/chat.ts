import { User } from ".";

export interface Instance {
  name: string;
  picture: string;
  owner: User.Info;
}