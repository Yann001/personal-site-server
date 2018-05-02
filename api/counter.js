// counter.js

import CounterModel from '../dal/counterModel'

export const getNextSequenceValue = (tableName) => {
  return CounterModel.findOneAndUpdate({_id: tableName}, { $inc: { sequenceValue: 1 } })
}
