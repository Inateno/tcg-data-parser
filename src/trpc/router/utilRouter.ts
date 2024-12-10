import { Cards, db } from 'db';
import { DeepMutable, mockCards } from 'utils';

import { publicProcedure, router } from '..';

export const utilRouter = router({
  seedDb: publicProcedure.mutation(() => {
    db.cards = structuredClone(mockCards) as unknown as DeepMutable<Cards>;

    return 'Database initialized successfully.' as const;
  }),
});
