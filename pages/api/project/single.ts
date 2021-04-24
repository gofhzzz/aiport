import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const project = await db
      .collection('project')
      .findOne({ _id: new ObjectId('6083819fd7f0a9318ae5bc7d') });

    return res.json({ project });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
