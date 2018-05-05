import { Groups } from './groups';

export interface Users {
  url: string;
  username: string;
  email: string;
  password: string;
  groups: Groups[];
}
