export interface User {
  username: string;
  first_name: string;
  last_name: string;
}

export interface FullUser {
  date_joined: string;
  email: string;
  first_name: string;
  last_name: string;
  groups: any;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
  password: string;
  user_permissions: any;
  username: string;
}
