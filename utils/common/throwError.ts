import { NextApiResponse } from 'next';

const throwError: (
  res: NextApiResponse,
  code?: number,
  statusCode?: number,
  additionalInfo?: unknown,
) => void = (res, code = -1, statusCode = 500, additionalInfo) => {
  let message: string;

  switch (code) {
    case 101:
      message = 'Already has been added';
      break;
    case 904:
      message = 'Upload encoded videos first. (aws s3)';
      break;
    default:
      message = 'Database connection lost.';
  }

  res.statusCode = statusCode;
  const error = new Error(message) as CustomError;
  error.code = code;
  if (additionalInfo) error.additionalInfo = additionalInfo;
  throw error;
};

export default throwError;
