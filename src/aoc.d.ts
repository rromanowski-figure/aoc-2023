interface String {
    debug(label: string = ""): void;
}

interface Map<K, V> {
    update(key: K, transform: (v: V) => V, defaultValue: V)
}