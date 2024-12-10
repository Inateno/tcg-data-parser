import { router } from '..';

import { cardRouter } from './cardRouter';
import { utilRouter } from './utilRouter';

export const appRouter = router({
  card: cardRouter,
  util: utilRouter,
});

export type AppRouter = typeof appRouter;
