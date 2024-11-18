export interface IUsersTable {
  id: number;
  name: string;
  username: string;
  status: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface IUserParams {
  name: string;
  status: number | string;
}
