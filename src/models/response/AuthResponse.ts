import { IUser } from "../IUser.ts";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  User: IUser;
}
