import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();

async function jwtVerifier(req, res, next) {
  const secret = process.env.JWT_USERS_SECRET;
  const jwt = req.headers.authorization.split(' ')[1];
  let userInfo = null;
  try {
    userInfo = await jsonwebtoken.verify(jwt, secret);
  } catch (e) {
    next(e);
    return null;
  }
  req.user = userInfo;
  next();
  return null;
}


export default jwtVerifier;
