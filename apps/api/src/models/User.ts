import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  username: string;
  password: string;
  photoURL?: string;
  role: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  photoURL: {
    type: String,
  },

  role: {
    type: String,
    required: true,
    enum: ['A', 'D'],
  },
});

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

export default model<IUser>('User', UserSchema);
