import {isSafe} from "./isSafe.ts";

export function isSafeDamped(line: number[]): boolean {
    const full = isSafe(line);

    if (full) {
        return true;
    }
    for (let i = 0; i < line.length; i++) {
        const l2 = line.filter((v, j) => j !== i);
        if (isSafe(l2)) {
            return true;
        }
    }


    return false;
}