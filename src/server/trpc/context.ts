import { getServerSession } from '#auth';
import { inferAsyncReturnType } from '@trpc/server';
import { db } from '../db';
import { H3Event } from 'h3';

export const createContext = async (event: H3Event) => {
  return {
    session: await getServerSession(event),
    db
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;
