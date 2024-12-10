import { Card, Cards, CardUnion } from 'db';
import lorcana from './cards/lorcana-cards.json';
import mtg from './cards/mtg-cards.json';

const cards: Card[] = [] satisfies Cards;

type SpecificDataParser = Record<string, CardUnion>;

// this must be updated, but it could be a data coming from a database
// it is just to illustrate how we could parse each game's data
// and making something universal
const cardsGameSpecificData: SpecificDataParser = {
  // we could add a function to enforce type / trigger an error
  mtg: {
    color: '',
    mana: 0,
    power: 0,
  },
  lorcana: {
    ink_cost: 0,
  },
  pokemon: {
    element: '',
    hp: 0,
  },
};

// parse each json manually
// but this could be a loop function with a rest api reading a json flux
mtg.forEach((data) => cards.push(decodeCardFromData(data, 'mtg')));
lorcana.forEach((data) => cards.push(decodeCardFromData(data, 'lorcana')));

export const mockCards = cards;

function decodeCardFromData(cardData: any, gameID: string): Card {
  const tags = computeTags(cardData, gameID);
  let card = {
    ...computeStandardData(cardData, gameID),
    specific_data: computeSpecificData(cardData, gameID),
    tags,
  } satisfies Card;

  return card;
}

// quick function to show how to compute tags
// must be refined but this gives an idea
function computeTags(cardData: any, gameID: string): string[] {
  const tags: string[] = [gameID.toLowerCase()]; // should add all names variant also

  for (let i in cardData) {
    tags.push(i);
    tags.push(
      ...cardData[i].toString().toLowerCase().replace(/,/gu, '').split(' '),
    );
  }

  return tags;
}

// standard data accross all cards
function computeStandardData(cardData: any, gameID: string) {
  return {
    id: cardData.id,
    rarity: cardData.rarity,
    name: cardData.name,
    game_id: gameID, // should be an object id
  };
}

// compute specific data
function computeSpecificData(cardData: any, gameID: string): CardUnion {
  const specificDataParser = cardsGameSpecificData[gameID];
  if (!specificDataParser) {
    const err = 'gameID has no declaration to gather the specific data';
    console.error(err);
    throw err;
  }

  const specificCardData: any = {};

  for (const [k, v] of Object.entries(specificDataParser)) {
    specificCardData[k] = cardData[k] ?? v;
  }

  return specificCardData as CardUnion;
}
