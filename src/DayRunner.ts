import { Day01 } from './day-01/day-01';
import { Day02 } from './day-02/day-02';
import { Day03 } from './day-03/day-03';
import { Day04 } from './day-04/day-04';
import { error, loadInputFromFile, parseDayAndPart } from './util';

export class DayRunner {
	private days: Map<string, Day> = new Map([
		['01', Day01],
		['02', Day02],
		['03', Day03],
		['04', Day04],
		// Add new days above here
	]);

	run = async (s: string) => {
		const [d, part] = parseDayAndPart(s);

		const day = this.getDay(d);

		console.log(this.buildHeader(`Day ${d} - ${day.title}`));

		if (part == '1' || !part) {
			const start = performance.now();
			const result1 = day.part1(
				await loadInputFromFile(`src/day-${d}/day-${d}-1.input`),
			);
			const duration =
				Math.round((performance.now() - start) * 100) / 100;
			console.log(`Part 1 (${duration}ms): ${result1}`);
		}

		if (part == '2' || !part) {
			const start = performance.now();
			const result2 = day.part2(
				await loadInputFromFile(`src/day-${d}/day-${d}-2.input`),
			);
			const duration =
				Math.round((performance.now() - start) * 100) / 100;
			console.log(`Part 2 (${duration}ms): ${result2}`);
		}
	};

	runAll = async () => {
		for (const [k, _] of this.days) {
			await this.run(k);
		}
	};

	private getDay = (d: string): Day =>
		this.days.get(d) ?? error(`day ${d} not initialized`);

	private buildHeader = (s: string): string => {
		const header = `--  ${s}  --`;
		const border = '-'.repeat(header.length);
		return `\n${border}\n${header}\n${border}`;
	};
}

export type Part = (input: string[]) => number;

export type Day = {
	title: string;
	part1: Part;
	part2: Part;
};
