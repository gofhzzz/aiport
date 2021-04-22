import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler } from '@utils/index';
import { removeTokenOnCookie } from '@lib/cookie';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    removeTokenOnCookie(res);

    res.redirect('/');
    return;
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
