import { JwtPayload } from "jsonwebtoken";

export interface IAuthenticatedPayload extends JwtPayload {
    email: string;
  }
  
  export interface IRegisterRequestBody {
    username: string;
    email: string;
    password: string;
  }
  
  export interface ILoginRequestBody {
    email: string;
    password: string;
  }
  
  export interface ILoginResponse {
    token: string;
    user: object;
  }
  
  export interface IVerifyTokenResponse {
    data: any; // Custom object depending on your authentication logic
  }
  
  export interface ICreateTokenResult {
    token: string;
    user: object;
  }
  
  export interface IErrorResponse {
    message: string;
    error?: string | undefined;
  }
  