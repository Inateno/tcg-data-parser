import { DeepMutable, mockCards } from 'utils';

import { Cards } from './Card';

export const db = {
  // should be a mongoose here
  cards: structuredClone(mockCards) as unknown as DeepMutable<Cards>,
};
