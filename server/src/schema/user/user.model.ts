import bcrypt from 'bcryptjs';
import { Document, Schema, model } from 'mongoose';
import { IUser } from '../../type/user';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
},
{
  timestamps: true,
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt
      .genSalt(5)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(next);
  }
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true, transform: function (doc, ret) {
  delete ret.password;
  return ret;
}});

userSchema.method('toGraph', function toGraph(this: any) {
  return JSON.parse(JSON.stringify(this));
});

userSchema.method('comparePassword', function comparePassword(
  this: any,
  candidate: string
) {
  if (!this.password) {
    throw new Error('User has not been configured with a password.');
  }
  if (!candidate) {
    return false;
  }
  return bcrypt.compare(candidate, this.password);
});
const User = model<IUser>('User', userSchema);

export default User;