import { NextApiResponse } from 'next';
import { withErrorHandler, connectMongo } from '@utils/index';
import verifyToken from '@utils/token/verifyToken';
import { throwError } from '@utils/common';

const handler: (
  req: RequestWithUserId,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'POST') {
    verifyToken(req, res);

    const { db } = await connectMongo();

    const { datasetId } = req.query;

    const tempItem = await db.collection('user').findOne({
      _id: req.userId,
      dataset: { $exists: 1 },
    });

    if (tempItem && tempItem.dataset.includes(datasetId)) {
      return throwError(res, 101, 404);
    }

    const { upsertedId } = await db.collection('user').updateOne(
      { _id: req.userId },
      {
        $push: {
          dataset: datasetId,
        },
      },
    );

    return res.json({ upsertedId });
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
