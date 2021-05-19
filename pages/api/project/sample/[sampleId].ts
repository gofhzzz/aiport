import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { sampleId } = req.query;

    const { db } = await connectMongo();

    const sample = await db
      .collection('projectSample')
      .findOne({ _id: new ObjectId(String(sampleId)) });

    return res.json({ sample });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
