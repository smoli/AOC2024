import { expect } from "jsr:@std/expect";

import {isSafe} from "./isSafe.ts";
import {isSafeDamped} from "./isSafeDamped.ts";

Deno.test("Trivial", () => {
    expect(isSafe([1, 2, 3, 4, 5])).toBe(true);
    expect(isSafe([1, 1, 3, 4, 5])).toBe(false);
    expect(isSafe([2, 1, 3, 4, 5])).toBe(false);
});

Deno.test("Damped", () => {
    expect(isSafeDamped([1, 2, 3, 4, 5])).toBe(true);
    expect(isSafeDamped([1, 1, 3, 4, 5])).toBe(true);
    expect(isSafeDamped([2, 1, 3, 4, 5])).toBe(true);
    expect(isSafeDamped([1, 2, 9, 10, 11])).toBe(false);
    expect(isSafeDamped([1, 2, 3, 4, 50])).toBe(true);
    expect(isSafeDamped([1, 20, 21, 22, 23])).toBe(true);
})