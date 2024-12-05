export function makeWindowGenerator<T>(data: T[], width: number): Generator<T[]> {
    let index = 0;

    return function* kjh(): Generator<T[]> {
        for (let i = 0; i <= data.length - width; i++) {
            const r: T[] = [];
            for (let k = 0; k < width; k++) {
                r.push(data[i + k]);
            }

            yield r;
        }
    }
}