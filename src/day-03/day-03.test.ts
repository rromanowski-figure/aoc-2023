import { expect, test } from 'bun:test';
import { loadInputFromFile } from '../util';
import { Day03 } from './day-03';
import { adjacentCoordinates, boundedSubGrid, subGrid } from '../util'

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

test("Day03 - adjacent", () => {
	const grid = [
		["1","2","3"],
		["1","2","3"],
		["1","2","3"],
	]
	expect(adjacentCoordinates(grid, {row: 0, col: 0})).toBeArrayOfSize(3)
	expect(adjacentCoordinates(grid, {row: 0, col: 1})).toBeArrayOfSize(5)
	expect(adjacentCoordinates(grid, {row: 1, col: 0})).toBeArrayOfSize(5)
	expect(adjacentCoordinates(grid, {row: 1, col: 1})).toBeArrayOfSize(8)

	expect(subGrid(grid, {row: 0, col: 0}, 1, 1)).toEqual([["1"]])
	expect(subGrid(grid, {row: 0, col: 1}, 1, 1)).toEqual([["2"]])
	expect(subGrid(grid, {row: 1, col: 0}, 2, 2)).toEqual([["1","2"],["1","2"]])
	expect(subGrid(grid, {row: 1, col: 1}, 2, 2)).toEqual([["2","3"],["2","3"]])
	expect(subGrid(grid, {row: 1, col: 1}, 3, 3, 'center')).toEqual(grid)

	expect(boundedSubGrid(grid, {row: 0, col: 0}, {row: 0, col: 0})).toEqual([["1"]])
	expect(boundedSubGrid(grid, {row: 0, col: 0}, {row: 2, col: 2})).toEqual(grid)
})
test('Day03 - 2 - sample', async () => {
	const input = await loadInputFromFile('./src/day-03/day-03-2.sample');

	expect(Day03.part2(input)).toBe(467835);
});
