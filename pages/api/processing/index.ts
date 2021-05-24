import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const cursor = db
      .collection('processing')
      .find({})
      .sort({ lastUpdated: -1 });

    const processings = await cursor.toArray();

    await cursor.close();

    return res.json({ processings });
  }

  if (req.method === 'POST') {
    const { augmentations, preprocessing, template } = req.body;

    const { db } = await connectMongo();

    await db.collection('processing').insertOne({
      templateName: template.name,
      templateType: template.type,
      augmentations,
      preprocessing,
      created: new Date(),
      lastUpdated: new Date(),
    });

    return res.status(204).end();
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
