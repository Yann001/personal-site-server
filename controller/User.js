import userModel from '../model/user/user';

class User {
  constructor () {}
  async registry (req, res, next) {
    let
      userName = req.body.userName,
      password = req.body.password,
      nickName = req.body.nickName;

    let model = new userModel({
      userName,
      password,
      nickName
    });

     let ret = await model.save();

     if (ret) {
       res.json({
        result: {
          code: 200,
          msg: 'ok'
        },
        data: ret.doc
       });
     } else {
       res.json({
        result: {
          code: 300,
          msg: 'model save error'
        },
        data: ret.err
       });
     }
  }
}

export default new User();
