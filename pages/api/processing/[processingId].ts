import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { processingId } = req.query;

    const { db } = await connectMongo();

    const processing = await db
      .collection('processing')
      .findOne({ _id: new ObjectId(String(processingId)) });

    return res.json({ processing });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
