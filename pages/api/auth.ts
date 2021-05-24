import { NextApiRequest, NextApiResponse } from 'next';
import { connectMongo, withErrorHandler } from '@utils/index';
import { removeTokenOnCookie, setTokenOnCookie } from '@lib/auth/cookie';
import signToken from '@utils/token/signToken';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('Missing JWT_SECRET');

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).end();

    const { db } = await connectMongo();

    const exUser = await db.collection('user').findOne({ username });

    if (!exUser) return res.status(404).send('No such user.');

    if (exUser.password !== password)
      return res.status(401).send('Password wrong.');

    const accessToken = signToken(exUser._id, jwtSecret);

    setTokenOnCookie(res, accessToken);

    return res.status(204).end();
  }

  if (req.method === 'DELETE') {
    removeTokenOnCookie(res);

    return res.status(204).end();
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
