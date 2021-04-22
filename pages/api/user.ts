import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { 'aiport-token': token } = req.cookies;

    if (!token) return res.status(401).end();

    const { db } = await connectMongo();

    const user = await db.collection('user').findOne({});

    return res.json(user);
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
