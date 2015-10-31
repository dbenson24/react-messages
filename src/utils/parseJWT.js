import secrets from '../secrets';
import jwt from 'jsonwebtoken';

const parseJWT = (req, res, next) => {
  if (req.cookies.token) {
    try {
      req.user = jwt.verify(req.cookies.token, secrets.jwt);
      res.cookie("user", req.user, {
        httpOnly: false,
        secure: false
      });
    }
    catch (err) {
      req.user = false;
      res.clearCookie('token');
      res.clearCookie('user');
      req.cookies.token = null;
      req.cookies.user = null;
    }
  }
  else {
    req.user = false;
    res.clearCookie('user');
    req.cookies.user = null;
  }
  next();
}

export default parseJWT;