import mongoose, { Document, Schema } from "mongoose";
import { IClient } from "./client";

export interface IProject extends Document {
 name :string;
 type :string;
 clientId: mongoose.Types.ObjectId | IClient;
}
export interface IProjectModel extends IProject {
  toGraph(): object;
  toObject(): object;
  toJSON(): object;
}
