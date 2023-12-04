export function timed<V>(block: () => V): [number, V] {
    const start = performance.now();
    const result = block()
    const duration = Math.round((performance.now() - start) * 100) / 100;
    return [duration, result]
}