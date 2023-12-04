import { Day, Part } from '../DayRunner';
import { SetWithContentEquality, error, print } from '../util';

type Grid = Array<Array<string>>;

type SubGridMode = 'topleft' | 'center'
export function subGrid(grid: Grid, origin: P2, height: number, width: number, mode: SubGridMode = 'topleft') {
	let subgrid = Array<Array<string>>()

	switch(mode) {
		case 'topleft':
			for (let r = origin.row; r < origin.row + height; r++) {
				let row: Array<string> = []
				for (let c = origin.col; c < origin.col + width; c++) {
					row.push(grid[r][c])
				}
				subgrid.push(row)
			}
			break;
		case 'center':
			const hOffset = (height - 1) / 2
			const wOffset = (width - 1) / 2
			for (let r = origin.row - hOffset; r <= origin.row + hOffset; r++) {
				let row: Array<string> = []
				for (let c = origin.col - wOffset; c <= origin.col + wOffset; c++) {
					row.push(grid[r][c])
				}
				subgrid.push(row)
			}
			return subgrid
	}

	return subgrid
}

type P2 = { row: number; col: number };

export const adjacentCoordinates = (grid: Grid, { row, col }: P2): Array<P2> => {
	const lastRowIndex = grid.length - 1;
	const lastColumnIndex = grid[0].length - 1;

	const coords = new SetWithContentEquality<P2>()
	
	// Above
	coords.add({ row: Math.max(0, row - 1), col: Math.max(0, col - 1) })
	coords.add({ row: Math.max(0, row - 1), col })
	coords.add({ row: Math.max(0, row - 1), col: Math.min(lastColumnIndex, col + 1) })
	// L and R
	coords.add({ row, col: Math.max(0, col - 1) })
	coords.add({ row, col: Math.min(lastColumnIndex, col + 1) })
	// Below
	coords.add({ row: Math.min(lastRowIndex, row + 1), col: Math.max(0, col - 1) })
	coords.add({ row: Math.min(lastRowIndex, row + 1), col })
	coords.add({
		row: Math.min(lastRowIndex, row + 1),
		col: Math.min(lastColumnIndex, col + 1),
	})

	return coords.values().filter(p => !(p.row == row && p.col == col));
};

const isSymbol = (c: string) => /[^0-9\.]/.test(c);
const isDigit = (c: string): boolean => /[0-9]/.test(c);
const isSymbolAdjacent = (grid: Grid, row: number, col: number): boolean => {
	return Array.from(adjacentCoordinates(grid, { row, col })).reduce(
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

		// TODO: decrement col and exit if pass left
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

		// TODO: increment col and exit if pass right
		if (currentCol == Math.min(grid[0].length, currentCol + 1)) break;
		currentCol++;
	}

	return [coords, parseInt(digits)];
};
const part2: Part = (input: string[]): number => {
	let sum = 0;
	let currentDigits: string = '';

	const grid: Grid = input.map((line) => line.split(''));
	const height = grid.length;
	const width = grid[0].length;
	grid.every((row) => row.length == width)
		? () => {}
		: error('not an even grid');
	console.log(`Grid: ${height}x${width}`);

	input.forEach((line, row) => {
		line.split('').forEach((c, col) => {
			if (isGear(c)) {
				console.log(`\nfound * at (${row},${col}):\n${
					subGrid(grid, { row, col }, 3, 3, "center")
						.map(r => r.join(""))
						.join("\n")
				}`);

				let firstNumber: number | undefined = undefined;
				let secondNumber: number | undefined = undefined;

				let coords = adjacentCoordinates(grid, { row, col })

				// if gear, look for adjacent digit, for first digit, find full number,
				while (coords.length > 0) {
					const { row, col } = coords.shift()!;
					console.log(`(${row},${col})`)

					if (isDigit(grid[row][col])) {
						const [coordsToRemove, n] = findFullNumber(
							grid,
							row,
							col,
						);

						console.log('coords to remove', coordsToRemove)
						
						coords = coords.filter(
							(c) => !(coordsToRemove.some(cr => cr.row == c.row && cr.col == c.col)),
						);
						console.log('new coords', coords)
						
						if (!firstNumber) firstNumber = n;
						else {
							secondNumber = n;
							break;
						}
					}
				}

				// if second digit not part of first number, find full number and add to sum
				if (firstNumber && secondNumber) {
					print(`found 2 numbers: ${firstNumber} * ${secondNumber} = ${firstNumber * secondNumber} + ${sum} = ${sum + firstNumber * secondNumber}`)
					sum = sum + firstNumber * secondNumber;
				} else if (firstNumber) {
					print(`found 1 number: ${firstNumber}`)
				} else {
					print(`found 0 numbers: ${firstNumber}`)
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
