// db.js

class Dal {
  constructor () {
    console.log('no useless constructor')
  }
  add (model, callback) {
    model.create(model, (err) => callback(err))
  }
  get (model, conditions, callback) {
    model.find(conditions, (err, data) => callback(err, data))
  }
  getById (model, id, callback) {
    model.findById(id, (err, data) => callback(err, data))
  }
  getOne (model, conditions, callback) {
    model.findOne(conditions, (err, data) => callback(err, data))
  }
  update (model, conditions, callback) {
    if (model._id) {
      delete model._id
    }
    model.update(conditions, model, (err) => callback(err))
  }
}

export default Dal
