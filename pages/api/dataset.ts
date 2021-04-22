import { NextApiRequest, NextApiResponse } from 'next';
import isNumeric from 'validator/lib/isNumeric';
import { withErrorHandler, connectMongo } from '@utils/index';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const cursor = db.collection('dataset').find({}).sort({ created: -1 });

    const datasets = (await cursor.toArray()) as DatasetInfo[];

    await cursor.close();

    return res.json({ datasets });
  }

  if (req.method === 'POST') {
    const { name, type, size, isOriginal, isPublic } = req.body;

    if (!isNumeric(size)) return res.status(400).send('invalid size');

    const { db } = await connectMongo();

    const { insertedId } = await db.collection('dataset').insertOne({
      name,
      type,
      size: Number(size),
      isOriginal,
      isPublic,
      owner: 'gjk287',
      collaborators: [],
      watch: 0,
      star: 0,
      created: new Date(),
    });

    return res.json({ modelId: insertedId });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
