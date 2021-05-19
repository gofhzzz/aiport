// Declarations for global interfaces & types
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest } from 'next';
import { ObjectId } from 'mongodb';

declare global {
  interface RequestWithUserId extends NextApiRequest {
    userId: ObjectId;
  }

  interface RequestWithFile extends RequestWithUserId {
    files: any[];
    file: any;
  }

  interface CustomError extends Error {
    code?: number;
    additionalInfo?: any;
  }
}
