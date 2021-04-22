import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { client } = await connectMongo();

    return res.json({ status: client.isConnected() });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
