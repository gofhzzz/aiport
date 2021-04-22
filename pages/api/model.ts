import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const cursor = db.collection('model').find({}).sort({ created: -1 });

    const models = (await cursor.toArray()) as ModelInfo[];

    await cursor.close();

    return res.json({ models });
  }

  if (req.method === 'POST') {
    const { name, framework, isPublic, owner } = req.body;

    const { db } = await connectMongo();

    const { insertedId } = await db.collection('model').insertOne({
      name,
      framework,
      isPublic,
      owner,
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
