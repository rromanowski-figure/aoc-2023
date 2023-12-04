import { SetWithContentEquality, error, print } from ".";

export type Grid = Array<Array<string>>;

export function gridOf(input: string[]): Grid {
    const grid = input.map((line) => line.split(''));

	const height = grid.length;
	const width = grid[0].length;

	grid.every((row) => row.length == width)
		? () => {}
		: error('not an even grid');

	print(`Grid: ${height}x${width}`);

    return grid
}

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
export function boundedSubGrid(grid: Grid, tl: P2, br: P2): Array<Array<string>> {
	if (br.row < tl.row || br.col < tl.col) error("Bottom right must be greater than top left")

	let subgrid = Array<Array<string>>()

	for (let r = tl.row; r <= br.row; r++) {
		let row: Array<string> = []
		for (let c = tl.col; c <= br.col; c++) {
			row.push(grid[r][c])
		}
		subgrid.push(row)
	}

	return subgrid
}

export type P2 = { row: number; col: number };

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