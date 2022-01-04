import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import Unauthorized from '../../errors/unauthorized.js';

dotenv.config();

async function jwtVerifier(req, res, next) {
  const secret = process.env.JWT_USERS_SECRET;
  const jwt = req.headers.authorization.split(' ')[1];
  try {
    const user = await jsonwebtoken.verify(jwt, secret);
    req.user = user;
  } catch (e) {
    throw new Unauthorized(e.message);
  }
  next();
  return null;
}


export default jwtVerifier;
