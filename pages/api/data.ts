import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import { DatasetDataInfo } from 'types/data';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const cursor = db
      .collection<DatasetDataInfo>('datasetData')
      .find({})
      .sort({ _id: 1 });

    const dataList = await cursor.toArray();

    await cursor.close();

    return res.json({ dataList });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
