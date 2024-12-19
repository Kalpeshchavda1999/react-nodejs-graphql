import { Document} from "mongoose";

export interface IClient extends Document {
  name:string;
  email: string;
}
export interface IClientModel extends IClient {
  toGraph(): object;
  toObject(): object;
  toJSON(): object;
}
