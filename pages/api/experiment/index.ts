import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const cursor = db.collection('experiment').find({});

    const experiments = await cursor.toArray();
    await cursor.close();

    return res.json({ experiments });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
