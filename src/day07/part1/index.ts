import { readFileLineByLine } from '../../utils/readInput';

const input = await readFileLineByLine('./src/day07/part1/input.txt');

const hands: Array<{ cards: string[]; bet: number }> = [];

const mapCard = (card: string): number => {
  if (card === 'T') {
    return 10;
  }

  if (card === 'J') {
    return 11;
  }

  if (card === 'Q') {
    return 12;
  }

  if (card === 'K') {
    return 13;
  }

  if (card === 'A') {
    return 14;
  }

  return parseInt(card);
};

const compareCards = (a: Array<string>, b: Array<string>) => {
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    const cardA = mapCard(a[i]);
    const cardB = mapCard(b[i]);

    if (cardA === cardB) {
      continue;
    }

    result = cardB - cardA;
    break;
  }

  return result;
};

const rankHands = (
  mappedHands: Array<{ originalHand: string[]; parsedCards: Array<{ value: string; count: number }>; bet: number }>
) => {
  const rankedHands = mappedHands.map((hand) => {
    const rankedHand: { rank: number; bet: number; originalHand: Array<string> } = {
      rank: 0,
      bet: hand.bet,
      originalHand: hand.originalHand,
    };

    const { parsedCards } = hand;
    if (parsedCards.length === 1) {
      rankedHand.rank = 7; //'five of a kind';
    }
    if (parsedCards.length === 2) {
      if (parsedCards[0].count === 4) {
        rankedHand.rank = 6; //'four of a kind';
      } else {
        rankedHand.rank = 5; //'full house';
      }
    }
    if (parsedCards.length === 3) {
      if (parsedCards[0].count === 3) {
        rankedHand.rank = 4; // 'three of a kind';
      } else {
        rankedHand.rank = 3; // 'two pair';
      }
    }
    if (parsedCards.length === 4) {
      rankedHand.rank = 2; // one pair
    }
    if (parsedCards.length === 5) {
      rankedHand.rank = 1; // high card
    }

    return rankedHand;
  });

  return rankedHands.sort((a, b) => {
    if (a.rank === b.rank) {
      return compareCards(a.originalHand, b.originalHand);
    }
    return b.rank - a.rank;
  });
};

input.forEach((line) => {
  const [hand, bet] = line.split(' ');
  hands.push({ cards: hand.split(''), bet: parseInt(bet) });
});

const mappedHands = hands.map((hand) => {
  const { cards, bet } = hand;
  const parsedCards: Array<{ value: string; count: number }> = [];

  cards.forEach((card) => {
    const parsedCard = parsedCards.find((parsedCard) => parsedCard.value === card);

    if (parsedCard) {
      parsedCard.count++;
    } else {
      parsedCards.push({ value: card, count: 1 });
    }
  });

  parsedCards.sort((a, b) => b.count - a.count);

  return { originalHand: cards, parsedCards, bet };
});

const rankedHands = rankHands(mappedHands);

console.log(JSON.stringify(rankedHands, null, 2));

const total = rankedHands.reverse().reduce((acc, hand, index) => {
  const { bet, rank } = hand;
  const multiplier = index + 1;
  const winnings = bet * multiplier;

  return acc + winnings;
}, 0);

console.log('TOTAL', total);
