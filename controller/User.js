import userModel from '../model/user/user';

class User {
  constructor() { }
  async registry(req, res, next) {
    console.log(`post on '/user/resgistry'`);
    let
      userName = req.body.userName,
      password = req.body.password,
      nickName = req.body.nickName;

    let model = new userModel({
      userName,
      password,
      nickName
    });
    try {
      let ret = await model.save();
      res.json({
        result: {
          code: 200,
          msg: 'ok'
        },
        data: ret
      });
    } catch (error) {
      res.json({
        result: {
          code: 400,
          msg: 'model save error'
        },
        data: error
       });
    }
  }
}

export default new User();
