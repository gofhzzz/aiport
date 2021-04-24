import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const cursor = db.collection('project').find({}).sort({ lastUpdated: -1 });

    const projects = (await cursor.toArray()) as ProjectInfo[];

    await cursor.close();

    return res.json({ projects });
  }

  if (req.method === 'POST') {
    const { name } = req.body;

    const { db } = await connectMongo();

    const { insertedId } = await db.collection('project').insertOne({
      name,
      owner: 'gjk287',
      isPublic: true,
      collaborators: [],
      experimanets: 0,
      running: 0,
      created: new Date(),
      lastUpdated: new Date(),
    });

    return res.json({ projectId: insertedId });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
