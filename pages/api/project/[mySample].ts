import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { ObjectId } from 'bson';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const { mySample } = req.query;

    if (typeof mySample !== 'string') return res.status(400).end();

    const project = await db
      .collection('myProjectSample')
      .findOne({ _id: new ObjectId(mySample) });

    return res.json({ project });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
