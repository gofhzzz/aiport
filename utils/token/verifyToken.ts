import { NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { throwError } from '@utils/common';
import { ObjectId } from 'bson';

const { JWT_SECRET } = process.env;

const verifyToken: (req: RequestWithUserId, res: NextApiResponse) => void = (
  req,
  res,
) => {
  if (!JWT_SECRET) return throwError(res, -2);

  const {
    headers: { authorization },
    cookies: { 'aiport-token': cookieToken },
  } = req;
  let accessToken: string;

  if (authorization && authorization.startsWith('Bearer ')) {
    accessToken = authorization.split('Bearer ')[1];
  } else if (cookieToken) {
    accessToken = cookieToken;
  } else {
    return throwError(res, 3, 400);
  }

  try {
    const { userId } = jwt.verify(accessToken, JWT_SECRET) as {
      userId: string;
    };

    return (req.userId = new ObjectId(String(userId)));
  } catch (err) {
    if (err.name === 'TokenExpiredError') return throwError(res, 100, 401);

    return throwError(res, 4, 401);
  }
};

export default verifyToken;
