import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { datasetId } = req.query;

    const { db } = await connectMongo();

    const dataset = await db
      .collection('dataset')
      .findOne({ _id: new ObjectId(String(datasetId)) });

    return res.json({ dataset });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
