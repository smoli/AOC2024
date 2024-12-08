import {readFileAsLineArray} from "../common/readFileAsLineArray.ts";

enum NodeTypes {
    UNKNOWN,
    ADD,
    MUL,
    CONC,
    EQ,
    NUM,
    BOOL
}

type Node = {
    op1?: Node;
    op2?: Node;
    type: NodeTypes
    value?: number | boolean
}


function toString(node: Node, unknowns: NodeTypes[]): string {

    let i = 0;

    function locEval(node: Node): string {
        switch (node.type) {
            case NodeTypes.UNKNOWN:
                const op = unknowns[i++];

                switch (op) {
                    case NodeTypes.ADD:
                        return `${locEval(node.op1)} + ${locEval(node.op2)}`

                    case NodeTypes.MUL:
                        return `${locEval(node.op1)} * ${locEval(node.op2)}`

                    case NodeTypes.CONC:
                        return `${locEval(node.op1)} || ${locEval(node.op2)}`
                }


                break;


            case NodeTypes.BOOL:
            case NodeTypes.NUM:
                return node.value;

            case NodeTypes.EQ:
                const a = locEval(node.op1);
                const b = locEval(node.op2);
                return `${a} === ${b}`

        }
    }

    return locEval(node);
}



function evaluate(node: Node, unknowns: NodeTypes[]): number | boolean {

    let i = 0;

    function locEval(node: Node): number | boolean {
        switch (node.type) {
            case NodeTypes.UNKNOWN:
                const op = unknowns[i++];

                switch (op) {
                    case NodeTypes.ADD:
                        return locEval(node.op1) + locEval(node.op2)

                    case NodeTypes.MUL:
                        return locEval(node.op1) * locEval(node.op2)

                    case NodeTypes.CONC:
                        return Number(`${locEval(node.op1)}${locEval(node.op2)}`);
                }


                break;


            case NodeTypes.BOOL:
            case NodeTypes.NUM:
                return node.value;

            case NodeTypes.EQ:
                const a = locEval(node.op1);
                const b = locEval(node.op2);
                return a === b
        }
    }


    return locEval(node);
}

function cartesian<T>(dimensions: T[][] ): T[][] {
    let ret: T[][] = [[]];

    const addDimension = (results: T[][], dimension: T[]): T[][] => {
        const ret: T[][] = [];

        for (const value of dimension) {
            for (const line of results) {
                ret.push([...line, value]);
            }
        }

        return ret;
    }

    for (const dimension of dimensions) {
        ret = addDimension(ret, dimension);
    }

    return ret;
}


function parse(line: string): { node: Node, unknowns: number, left: number } {
    const [left, right] = line.split((":")).map(s => s.trim());
    const nums = right.split(" ").map(s => Number(s));

    let node: Node = {
        type: NodeTypes.UNKNOWN,
        op1: {
            type: NodeTypes.NUM,
            value: nums[0],
        },
        op2: {
            type: NodeTypes.NUM,
            value: nums[1],
        }
    };

    for (let i = 2; i < nums.length; i++) {
        const n: Node = {
            type: NodeTypes.UNKNOWN,
            op1: node,
            op2: {
                type: NodeTypes.NUM,
                value: nums[i]
            }
        }

        node = n;
    }

    node = {
        type: NodeTypes.EQ,
        op1: {
            type: NodeTypes.NUM,
            value: Number(left)
        },
        op2: node
    };

    return { left: Number(left), node, unknowns: nums.length - 1 };
}


function solve(data: string[], operations: NodeTypes[]): number {
    let sum = 0;


    const combos = {};

    for (const line of data) {
        const { left, node, unknowns } = parse(line);

        if (!combos[unknowns]) {
            const dimensions: NodeTypes[][] = new Array(unknowns).fill(operations);
            combos[unknowns] = cartesian(dimensions)
        }

        const unknownCombos: NodeTypes[][] = combos[unknowns];

        for (const operators of unknownCombos) {
            if (evaluate(node, operators)) {
                sum += left;
                break;
            }
        }
    }

    return sum;
}

export async function solve1(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    const operations: NodeTypes[] = [NodeTypes.ADD, NodeTypes.MUL];
    return solve(data, operations);
}

export async function solve2(fileName: string): any {
    let data = await readFileAsLineArray(fileName);

    const operations: NodeTypes[] = [NodeTypes.ADD, NodeTypes.MUL, NodeTypes.CONC];
    return solve(data, operations);
}

