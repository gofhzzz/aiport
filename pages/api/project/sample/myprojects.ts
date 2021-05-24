import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const cursor = db
      .collection('myProjectSample')
      .find({})
      .sort({ lastUpdated: -1 });

    const projects = await cursor.toArray();

    await cursor.close();

    return res.json({ projects });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
