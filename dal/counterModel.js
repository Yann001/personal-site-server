// counterModel.js

import './connect'
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CounterSchema = new Schema({
  _id: String,
  sequenceValue: {
    type: Number,
    default: 1
  }
}, {
  versionKey: false
})

const CounterModel = mongoose.model('counter', CounterSchema)

export default CounterModel
