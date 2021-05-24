import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { sampleId } = req.query;

    if (typeof sampleId !== 'string') return res.status(400).end();

    const { db } = await connectMongo();

    const sample = await db
      .collection('projectSample')
      .findOne({ _id: new ObjectId(sampleId) });

    return res.json({ sample });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
