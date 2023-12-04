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

export function sum(numbers: number[]): number {
	return numbers.reduce((sum, x) => sum + x, 0);
}

String.prototype.debug = function (label: string = '') {
	console.log(`${label.length == 0 ? '' : `${label}: `}${this}`);
};

export function parseDayAndPart(s: string): [string, string | undefined] {
	const [day, ...part] = s.split('.');
	return [day, part.length == 0 ? undefined : part[0]];
}

Map.prototype.update = function <K, V>(
	k: K,
	transform: (v: V) => V,
	defaultValue: V,
) {
	const value = this.get(k) ?? defaultValue;
	const newValue = transform(value);
	this.set(k, newValue);
	return newValue;
};

export class SetWithContentEquality<T> {
    private items: T[] = [];
    private getKey: (item: T) => string;

    constructor(getKey: (item: T) => string = JSON.stringify) {
        this.getKey = getKey;
    }

    add(item: T): void {
        const key = this.getKey(item);
        if (!this.items.some(existing => this.getKey(existing) === key)) {
            this.items.push(item);
        }
    }

    has(item: T): boolean {
        return this.items.some(existing => this.getKey(existing) === this.getKey(item));
    }

    values(): T[] {
        return [...this.items];
    }
}

export function print(message: string, interactive: boolean = false) {
	if(interactive) prompt(message)
	else { console.log(message) }
}