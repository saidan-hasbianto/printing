import { Groups } from './groups';

export class Users {
  id: string;
  url: string;
  username: string;
  email: string;
  password: string;
  oldpassword?: string;
  newpassword?: string;
  confirmpassword?: string;
  first_name: string;
  last_name: string;
  groups: Groups[] = [];
}
