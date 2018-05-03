import mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  user: {
    type: Number,
    ref: 'User'
  },
  title: String,
  abstract: String,
  createTime: Number,
  updateTime: Number,
  mdCode: String,
  htmlCode: String,
  type: {
    id: Number,
    name: String
  },
  tag: Array,
  readCount: {
    type: Number,
    default: 0
  },
  extra: String
});

blogSchema.plugin(autoIncrement, { model: 'Blog', field: 'id' });
const blog = mongoose.model('Blog', blogSchema);

export default blog;
