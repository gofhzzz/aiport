import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const cursor = db.collection('feed').find({});

    const feeds = (await cursor.toArray()) as FeedInfo[];

    await cursor.close();

    return res.json({ feeds });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
