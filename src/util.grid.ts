class Grid2D<T> {
	private grid: Array<Array<T>>;

	constructor(grid: Array<Array<T>>) {
		this.grid = grid;
	}

	private getRowIndexOrMin(row: number): number {
		return Math.max(0, row);
	}
	private getRowIndexOrMax(row: number): number {
		return Math.min(this.grid.length - 1, row);
	}
	private getColIndexOrMin(col: number): number {
		return Math.max(0, col);
	}
	private getColIndexOrMax(col: number): number {
		return Math.min(this.grid[0].length - 1, col);
	}
	getAdjacent(row: number, col: number): Array<[number, number, T]> {
		return [];
	}
}
