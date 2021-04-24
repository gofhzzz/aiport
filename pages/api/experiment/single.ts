import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const experiment = await db.collection('experiment').findOne({
      _id: new ObjectId('6083cdedd7f0a9318ae5bc87'),
    });

    return res.json({ experiment });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
