import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();

async function jwtVerifier(req, res, next) {
  const secret = process.env.JWT_USERS_SECRET;
  const jwt = req.headers.authorization.split(' ')[1];
  try {
    const user = await jsonwebtoken.verify(jwt, secret);
    req.user = user;
  } catch (e) {
    next(e);
    return null;
  }
  next();
  return null;
}


export default jwtVerifier;
