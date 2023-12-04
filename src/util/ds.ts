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