import { Day, Part } from '../DayRunner';
import { error } from '../util';

type Grid = Array<Array<string>>;

const adjacentCooridnates = (
	grid: Grid,
	row: number,
	col: number,
): Set<[number, number]> => {
	const height = grid.length - 1;
	const width = grid[0].length - 1;

	// TODO: tuples in TS compare by reference not value, so Set has duplicates and current point also
	const coords: Set<[number, number]> = new Set([
		// Above
		[Math.max(0, row - 1), Math.max(0, col - 1)],
		[Math.max(0, row - 1), col],
		[Math.max(0, row - 1), Math.min(width, col + 1)],
		// L and R
		[row, Math.max(0, col - 1)],
		[row, Math.min(width, col + 1)],
		// Below
		[Math.min(height, row + 1), Math.max(0, col - 1)],
		[Math.min(height, row + 1), col],
		[Math.min(height, row + 1), Math.min(width, col + 1)],
	]);

	return coords;
};

const isSymbol = (c: string) => /[^0-9\.]/.test(c);
const isDigit = (c: string): boolean => /[0-9]/.test(c);
const isSymbolAdjacent = (grid: Grid, row: number, col: number): boolean => {
	return Array.from(adjacentCooridnates(grid, row, col)).reduce(
		(acc, [row, col]) => acc || isSymbol(grid[row][col]),
		false,
	);
};

const part1: Part = (input: string[]): number => {
	let sum = 0;
	let currentDigits: string = '';
	let shouldCount = false;

	const checkAndReset = () => {
		if (shouldCount) sum += parseInt(currentDigits);

		currentDigits = '';
		shouldCount = false;
	};

	const grid: Grid = input.map((line) => line.split(''));
	const height = grid.length;
	const width = grid[0].length;
	grid.every((row) => row.length == width)
		? () => {}
		: error('not an even grid');
	console.log(`Grid: ${height}x${width}`);

	input.forEach((line, row) => {
		line.split('').forEach((c, col) => {
			// check each char, if digit add to cur digits, and check for surrounding symbol
			if (isDigit(c)) {
				currentDigits = currentDigits.concat(c);
				shouldCount = shouldCount || isSymbolAdjacent(grid, row, col);
			} else {
				// if non-digit, add if necessary, and reset state
				checkAndReset();
			}
		});
		// thanks reddit for telling me to reset (AND check!) on EOL
		// (another time test case doesn't cover an edge case)
		checkAndReset();
	});

	return sum;
};

const part2: Part = (input: string[]): number => {
	return -1;
};

export const Day03 = {
	title: 'Gear Ratios',
	part1,
	part2,
} satisfies Day;
