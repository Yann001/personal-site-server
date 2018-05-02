import mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  password: String,
  nickName: String,
  role: Number,
  avatar: String,
  phone: String,
  email: String,
  gender: Number,
  birth: Number,
  extra: String
});

userSchema.plugin(autoIncrement, { model: 'User', field: 'id' });
const user = mongoose.model('User', userSchema);

export default user;
