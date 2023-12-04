import { Day, Part } from '../DayRunner';
import { error, sum } from '../util';

const parseNumbers = (line: string): [number, string[], string[]] => {
	const cardRegex =
		/Card\s+(?<cardId>\d+): (?<winningNumbers>[\d\s]+) \| (?<myNumbers>[\d\s]+)/;

	const { cardId, myNumbers, winningNumbers } =
		line.match(cardRegex)?.groups ?? error(`${line} doesn't match regex`);

	return [
		parseInt(cardId),
		winningNumbers.trim().split(/\s+/g),
		myNumbers.trim().split(/\s+/g),
	];
};

const score = (matchCount: number): number =>
	matchCount == 0 ? 0 : 2 ** (matchCount - 1);

const part1: Part = (input: string[]): number => {
	const scores = input.map((line, i) => {
		const [_, winningNumbers, myNumbers] = parseNumbers(line);

		const matchingNumbers = myNumbers.filter((n) =>
			winningNumbers.includes(n),
		);

		return score(matchingNumbers.length);
	});

	return sum(scores);
};

const part2: Part = (input: string[]): number => {
	const cards = new Map<number, number>([]);
	let maxCardId = 0;

	input.forEach((line, i) => {
		const [cardId, winningNumbers, myNumbers] = parseNumbers(line);

		maxCardId = Math.max(cardId, maxCardId);

		const matchingNumbers = myNumbers.filter((n) =>
			winningNumbers.includes(n),
		);

		// const cardCount = (cards.get(cardId) ?? 0) + 1;
		// cards.set(cardId, cardCount);
		cards.update(cardId, (c) => c + 1, 0);

		for (let i = cardId + 1; i <= cardId + matchingNumbers.length; i++) {
			const count = cards.get(i) ?? 0;
			cards.set(i, count + cardCount);
		}
	});

	return sum(
		[...cards.entries()].filter((e) => e[0] <= maxCardId).map((e) => e[1]),
	);
};

export const Day04 = {
	title: 'Scratchcards',
	part1,
	part2,
} satisfies Day;
