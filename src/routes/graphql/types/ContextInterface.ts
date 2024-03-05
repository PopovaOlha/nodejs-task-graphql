import { PrismaClient } from '@prisma/client';
import { LoaderInterface } from './LoaderInterface.js';

export interface ContextInterface {
  db: PrismaClient;
  loaders: LoaderInterface;
}
