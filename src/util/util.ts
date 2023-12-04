export function error(errorMessage: string): never {
	throw new Error(errorMessage);
}

export function getDayFromArgv(argv: string[]) {
	if (argv.includes('--all')) return 'all';

	const dayFlag = '--day';
	if (argv.includes(dayFlag)) {
		return argv[argv.findIndex((arg) => arg == dayFlag) + 1];
	} else {
		error('day argument not provided');
	}
}

export async function loadInputFromFile(filename: string): Promise<string[]> {
	const input = await Bun.file(filename).text();

	return input.split('\n');
}

export function parseDayAndPart(s: string): [string, string | undefined] {
	const [day, ...part] = s.split('.');
	return [day, part.length == 0 ? undefined : part[0]];
}

const isInteractive = Bun.argv.includes('-i')
export function print(message: string, interactive: boolean = isInteractive) {
	if(interactive) prompt(message)
	else { console.log(message) }
}