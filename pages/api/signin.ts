import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandler } from '@utils/index';
import { setTokenOnCookie } from '@lib/cookie';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    setTokenOnCookie(res, '@your_secret_token');

    res.redirect('/dashboard');
    return;
  }

  return res.status(400).end();
};

export default withErrorHandler(handler);
