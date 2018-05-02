import mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

const Schema = mongoose.Schema;

const doneSchema = new Schema({
  userId: String,
  date: Date,
  startTime: {
    type: Number,
    default: Date.now()
  },
  endTime: Number,
  done: String,
  remark: String,
  feel: Number,
  ext: String
}, {
  versionKey: false
});

doneSchema.plugin(autoIncrement, { model: 'Done', field: 'id'});
const done = mongoose.model('Done', DoneSchema);

export default done;