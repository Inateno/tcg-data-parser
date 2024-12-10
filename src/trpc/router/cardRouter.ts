import { z } from 'zod';

import { Card, db } from 'db';
import { sleep } from 'utils';

import { publicProcedure, router } from '..';

export const cardRouter = router({
  list: publicProcedure.query(async () => {
    await sleep(1000);

    return db.cards;
  }),

  keyword: publicProcedure
    .input(z.string().min(1))
    .query(async ({ input: keywords }) => {
      const cards: Card[] = [];

      const words = new Set(keywords.toLowerCase().split(' '));
      let intersectSort: { index: number; intersectQuantity: number }[] = [];
      db.cards.forEach((c) => {
        const tags = new Set(c.tags);
        const intersectResult = [...tags.intersection(words)];

        if (intersectResult.length) {
          cards.push(c);
          intersectSort.push({
            index: cards.length - 1,
            intersectQuantity: intersectResult.length,
          });
        }
      });

      intersectSort = intersectSort.sort(
        (a, b) => b.intersectQuantity - a.intersectQuantity,
      );

      const sortedCards: Card[] = [];
      intersectSort.forEach((res) => {
        sortedCards.push(cards[res.index]);
      });

      return {
        resultNumber: sortedCards.length,
        keywords,
        cards: sortedCards,
      };
    }),

  search: publicProcedure
    .input(z.string().min(1))
    .query(async ({ input: cardName }) => {
      const card = db.cards.find((card) => card.name.match(cardName));

      if (card) {
        return card;
      }

      return `Card cannot be found with partial name:${cardName}.` as const;
    }),
});
