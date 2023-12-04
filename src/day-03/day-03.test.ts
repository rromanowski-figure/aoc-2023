import { expect, test } from 'bun:test';
import { loadInputFromFile } from '../util';
import { Day03 } from './day-03';

test('Day03 title', () => expect(Day03.title).toBe('Gear Ratios'));

test('Day03 - 1 - sample', async () => {
	const input = await loadInputFromFile('./src/day-03/day-03-1.sample');

	expect(Day03.part1(input)).toBe(4361);
});

test('Day03 - 1 - additional test 7', () => {
	const input = ['$..', '.11', '.11', '$..', '..$', '11.', '11.', '..$'];
	expect(Day03.part1(input)).toBe(44);
});

test('Day03 - 1 - additional test 8', () => {
	const input = ['11.$.'];
	expect(Day03.part1(input)).toBe(0);
});

test('Day03 - 2 - sample', async () => {
	const input = await loadInputFromFile('./src/day-03/day-03-2.sample');

	expect(Day03.part2(input)).toBe(467835);
});
