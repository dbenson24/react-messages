import {
  Router
}
from 'express';
import request from 'request';
import jwt from 'jsonwebtoken';

const router = new Router();

router.get('/', (req, res, next) => {
  console.log("Hit the user server request with token", req.cookies.token);
  if (req.cookies.token) {
    let user = jwt.verify(req.cookies.token, "test");
    if(user) {
        res.send({user: user});
    } else {
        res.send({err: "Invalid Token"});
    }
  } else {
      res.send({err: "No Token Cookie present, please authenticate"});
  }
});

export default router;