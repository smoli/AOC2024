export function compare(a: any, b: any): boolean {
    if (typeof b === "string") {
        return `${a}` === b;
    }

    if (typeof b === "number") {
        return Number(a) === b;
    }
}