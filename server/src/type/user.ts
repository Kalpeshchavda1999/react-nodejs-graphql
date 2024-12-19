export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  isModified(path: string): boolean;
}
export interface IUserModel extends IUser {
  toGraph(): object;
  toObject(): object;
  toJSON(): object;
  comparePassword(candidate: string): Promise<boolean>;
}
