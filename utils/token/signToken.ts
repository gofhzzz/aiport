import jwt from 'jsonwebtoken';

const signToken: (userId: string, secret: string) => string = (
  userId,
  secret,
) => {
  return jwt.sign({ userId }, secret);
};

export default signToken;
