// DoneModel.js

import './connect';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const DoneSchema = new Schema({
  _id: Number,
  userId: String,
  date: Date,
  startTime: {
    type: String,
    default: Date.now()
  },
  endTime: String,
  done: String,
  remark: String,
  feel: Number,
  ext: String
}, {
  versionKey: false
});

const DoneModel = mongoose.model('done', DoneSchema);

export default DoneModel;
