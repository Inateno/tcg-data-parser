import { z } from 'zod';

const PokemonData = z.object({
  element: z.string(),
  hp: z.number(),
});
const MTGData = z.object({
  color: z.string(),
  mana: z.number(),
  power: z.number(),
});
const LorcanaData = z.object({
  ink_cost: z.number(),
});

const GameCardsUnion = PokemonData.or(MTGData).or(LorcanaData);

// I used zod because it let us make schema close from what it would looks like
// with mongoose
export const CardConfigSchema = z.object({
  id: z.string(), // universal
  name: z.string(), // universal
  rarity: z.string(), // universal
  // could link to a "Game" DB that store rules but also useful to show all cards from a game
  game_id: z.string(), // mtg / lorcana / pokemon

  specific_data: GameCardsUnion,

  /**
   * Here I used an array but it could be a simple aggregated string
   * but both solutions needs to be considered, tested and benchmarked.
   * String could be faster if we use regex, but array would be faster if we don't
   * need regex
   * however we could counter the regex need by a better aggregation
   * Maybe the best is to use both options at the same time (tags / tags_str) ?
   *
   * in any case it must be indexed: createIndex( { tags: 1 } )
   * and use $in for searching with keywords (with an array)
   * or use $text: { $search: '' } (with a text field)
   */
  tags: z.array(z.string()), // contain an aggregated array of each specific data
});

// types inference should be somewhere else to avoid loop imports
export type Card = z.infer<typeof CardConfigSchema>;
export type Cards = ReadonlyArray<Card>;
export type CardUnion = z.infer<typeof GameCardsUnion>;
