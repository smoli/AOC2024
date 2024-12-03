export function iterateAndMap<T, U>(arr: T[], predicate: (c: T, index: number, prev: T | null) => U): U[] {
    let prev: T | null = null;
    let i = 0;
    let ret: U[] = [];

    for (let item of arr) {
        ret.push(predicate(item, i, prev));

        prev = item;
        i += 1;
    }

    return ret;
}