import jsonwebtoken from 'jsonwebtoken';
import Unauthorized from '../../errors/unauthorized.js';

async function jwtVerifier(req, _res, next) {
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
