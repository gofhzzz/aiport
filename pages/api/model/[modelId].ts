import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { modelId } = req.query;

    const { db } = await connectMongo();

    const model = await db
      .collection('model')
      .findOne({ _id: new ObjectId(String(modelId)) });

    return res.json({ model });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
