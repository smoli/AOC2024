import {iterateAndMap} from "../common/iterate.ts";

export function isSafe(line: number[]): boolean {

    let globDir = 0;

    let r: boolean[] = iterateAndMap(line, (c, i, prev) => {
        if (prev === null) {
            return true;
        } else {
            let d = Math.abs(c - prev);
            if (d < 1 || d > 3) {
                return false;
            }

            let dir = Math.sign(c - prev);

            if (dir !== globDir && globDir !== 0) {
                return false;
            }

            globDir = dir;
        }

        return true;
    });

    const hasErrors = r.indexOf(false);

    return hasErrors === -1;
}