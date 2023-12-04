import { expect, test } from 'bun:test';
import { loadInputFromFile } from '../util';
import { Day04 } from './day-04';

test('Day04 title', () => expect(Day04.title).toBe('Scratchcards'));

test('Day04 - 1 - sample', async () => {
	const input = await loadInputFromFile('./src/day-04/day-04-1.sample');

	expect(Day04.part1(input)).toBe(13);
});

test('Day04 - 2 - sample', async () => {
	const input = await loadInputFromFile('./src/day-04/day-04-2.sample');

	expect(Day04.part2(input)).toBe(30);
});
