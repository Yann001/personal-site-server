// done.js

import express from 'express'
import DoneModel from '../dal/doneModel'
import { getNextSequenceValue } from '../api/counter'

const router = express.Router()

router.get('/api/record/add', (req, res) => {
  console.log('/api/record/add')
  try {
    let promiseId = getNextSequenceValue('done')
    promiseId.then(
      (counter) => {
        let model = {
          _id: counter.sequenceValue,
          userId: req.query.userId || '',
          date: req.query.date || '',
          startTime: req.query.startTime || '',
          endTime: req.query.endTime || '',
          done: req.query.done || '',
          feel: req.query.feel || '',
          remark: req.query.remark || '',
          ext: req.query.ext || ''
        }
        let entity = new DoneModel(model)
        let promise = entity.save()
        promise.then(
          (doc) => {
            console.log('添加成功: ' + doc)
            res.send({ code: 1, data: doc })
          },
          (err) => {
            console.log('添加失败: ' + err)
            res.send({ code: 0, data: err })
          })
      },
      (errId) => {
        console.log('获取自增长id失败')
        res.send({ code: -1, data: errId })
      }
    )
  } catch (ex) {
    console.log('添加失败: ' + ex)
    res.send({ code: -1, data: ex })
  }
})

router.get('/api/record/get', (req, res) => {
  console.log('/api/record/get')
  let userId = req.query.userId
  let condition = { userId }
  try {
    DoneModel.find(condition, (err, docs) => {
      if (err) {
        console.log(err)
        res.send({ code: 0, data: err })
      } else {
        console.log(docs)
        res.send({ code: 1, data: docs })
      }
    })
  } catch (ex) {
    console.log(ex)
    res.send({ code: -1, data: ex })
  }
})

router.get('/api/record/delete', (req, res) => {
  console.log('/api/record/delete')
  let doneId = req.query.doneId || ''
  let userId = req.query.userId || ''
  let condition = {
    userId,
    _id: doneId
  }
  try {
    DoneModel.remove(condition, (err) => {
      if (err) {
        console.log(err)
        res.send({ code: 0, data: err })
      } else {
        console.log('删除成功')
        res.send({ code: 1, data: '' })
      }
    })
  } catch (ex) {
    console.log(ex)
    res.send({ code: -1, data: ex })
  }
})

router.get('/api/record/update', (req, res) => {
  console.log('/api/record/update')
  let userId = req.query.userId || ''
  let doneId = req.query.doneId || ''
  let model = {
    userId,
    date: req.query.date || '',
    startTime: req.query.startTime || '',
    endTime: req.query.endTime || '',
    done: req.query.done || '',
    feel: req.query.feel || '',
    remark: req.query.remark || '',
    ext: req.query.ext || ''
  }
  let condition = {
    userId,
    _id: doneId
  }
  try {
    DoneModel.update(condition, model, (err, raw) => {
      if (err) {
        console.log(err)
        res.send({ code: 0, data: err })
      } else {
        console.log(raw)
        res.send({ code: 1, data: raw })
      }
    })
  } catch (ex) {
    console.log(ex)
    res.send({ code: -1, data: ex })
  }
})

export default router
