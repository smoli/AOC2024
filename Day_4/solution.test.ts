import {describe, it} from "jsr:@std/testing/bdd";
import {expect} from "jsr:@std/expect";
import {traverse} from "./traverse.ts";
import {getWindow} from "./getWindow.ts";


describe("traverse", () => {

    it("ltr", () => {

        const data = ["ABCDE", "FGHIJ"];

        let r = "";

        traverse(data, 0, 0, 1, 0, c => {
            r += c;
        });

        expect(r).toBe("ABCDE");

        r = "";

        traverse(data, 2, 1, 1, 0, c => {
            r += c;
        });

        expect(r).toBe("HIJ");
    });


    it("rtl", () => {

        const data = ["ABCDE", "FGHIJ"];

        let r = "";

        traverse(data, 4, 0, -1, 0, c => {
            r += c;
        });

        expect(r).toBe("EDCBA");

        r = "";

        traverse(data, 2, 1, -1, 0, c => {
            r += c;
        });

        expect(r).toBe("HGF");
    });

    it("ttb", () => {

        const data = ["ABCDE",
            "FGHIJ",
            "KLMNO",
            "PQRST",
            "UVWXY"];

        let r = "";

        traverse(data, 2, 0, 0, 1, c => {
            r += c;
        });

        expect(r).toBe("CHMRW");

        r = "";

        traverse(data, 0, 3, 0, 1, c => {
            r += c;
        });

        expect(r).toBe("PU");
    });

    it("btt", () => {

        const data = ["ABCDE",
            "FGHIJ",
            "KLMNO",
            "PQRST",
            "UVWXY"];

        let r = "";

        traverse(data, 2, 4, 0, -1, c => {
            r += c;
        });

        expect(r).toBe("WRMHC");

        r = "";

        traverse(data, 0, 3, 0, -1, c => {
            r += c;
        });

        expect(r).toBe("PKFA");
    });


    it("tltbr", () => {
        const data = ["ABCDE",
            "FGHIJ",
            "KLMNO",
            "PQRST",
            "UVWXY"];

        let r = "";

        traverse(data, 0, 0, 1, 1, c => {
            r += c;
        });

        expect(r).toBe("AGMSY");

        r = "";

        traverse(data, 0, 3, 1, 1, c => {
            r += c;
        });

        expect(r).toBe("PV");
    });

    it("brttl", () => {
        const data = ["ABCDE",
            "FGHIJ",
            "KLMNO",
            "PQRST",
            "UVWXY"];

        let r = "";

        traverse(data, 4, 4, -1, -1, c => {
            r += c;
        });

        expect(r).toBe("YSMGA");

        r = "";

        traverse(data, 4, 3, -1, -1, c => {
            r += c;
        });

        expect(r).toBe("TNHB");
    });

});


describe('window', function () {
    it('should get a window of the data', function () {
        const data = [
            "ABCDE",
            "FGHIJ",
            "KLMNO",
            "PQRST",
            "UVWXY"];

        const r = getWindow(data, 1, 1, 3, 3);

        expect(r).toEqual([
            "GHI",
            "LMN",
            "QRS"
        ])
    });
});