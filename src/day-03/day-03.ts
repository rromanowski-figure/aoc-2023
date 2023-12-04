import { Day, Part } from '../DayRunner';
import { Grid, P2, adjacentCoordinates, error, gridOf, print, subGrid } from '../util';

const isSymbol = (c: string) => /[^0-9\.]/.test(c);
const isDigit = (c: string): boolean => /[0-9]/.test(c);
const isSymbolAdjacent = (grid: Grid, row: number, col: number): boolean => {
	return adjacentCoordinates(grid, { row, col }).reduce(
		(acc, { row, col }) => acc || isSymbol(grid[row][col]),
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

	const grid: Grid = gridOf(input)

	grid.forEach((line, row) => {
		line.forEach((c, col) => {
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

const isGear = (c: string) => /\*/.test(c);
const findFullNumber = (
	grid: Grid,
	row: number,
	col: number,
): [Array<P2>, number] => {
	let digits = '';
	let coords: Array<P2> = [];

	// go left and prepend until no more digits
	let currentCol = col;
	while (isDigit(grid[row][currentCol])) {
		digits = grid[row][currentCol].concat(digits);
		coords.unshift({ row, col: currentCol });

		if (currentCol == Math.max(0, currentCol - 1)) break;
		currentCol--;
	}
	// go right and append until no more digits
	if (currentCol == Math.min(grid[0].length, currentCol + 1))
		return [coords, parseInt(digits)];

	currentCol = col + 1;
	while (isDigit(grid[row][currentCol])) {
		digits = digits.concat(grid[row][currentCol]);
		coords.push({ row, col: currentCol });

		if (currentCol == Math.min(grid[0].length, currentCol + 1)) break;
		currentCol++;
	}

	return [coords, parseInt(digits)];
};

const part2: Part = (input: string[]): number => {
	const grid: Grid = gridOf(input)

	let sum = 0;

	grid.forEach((line, row) => {
		line.forEach((c, col) => {
			if (isGear(c)) {
				let firstNumber: number | undefined = undefined;
				let secondNumber: number | undefined = undefined;

				let coords = adjacentCoordinates(grid, { row, col })

				// if gear, look for adjacent digit, for first digit, find full number,
				while (coords.length > 0) {
					const { row, col } = coords.shift()!;

					if (isDigit(grid[row][col])) {
						const [coordsToRemove, n] = findFullNumber(
							grid,
							row,
							col,
						);
						
						coords = coords.filter(
							(c) => !(coordsToRemove.some(cr => cr.row == c.row && cr.col == c.col)),
						);
						
						if (!firstNumber) firstNumber = n;
						else {
							secondNumber = n;
							break;
						}
					}
				}

				// if second digit not part of first number, find full number and add to sum
				if (firstNumber && secondNumber) {
					sum = sum + firstNumber * secondNumber;
				}
			}
		});
	});

	return sum;
};

export const Day03 = {
	title: 'Gear Ratios',
	part1,
	part2,
} satisfies Day;
