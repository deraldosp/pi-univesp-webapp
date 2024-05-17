import type { IUser } from "../users/types";

export interface IAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: IUser
}

export interface IAuth {
  data: IAuthToken
}

export interface ICredentials {
  email: string;
  password: string;
}