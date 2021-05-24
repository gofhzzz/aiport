import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { modelId } = req.query;

    if (typeof modelId !== 'string') return res.status(400).end();

    const { db } = await connectMongo();

    const model = await db
      .collection('model')
      .findOne({ _id: new ObjectId(modelId) });

    return res.json({ model });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
