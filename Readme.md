Advent of Code 2024
===================

## Solve a new day

Create a new folder for the day with the necessary files.

```shell
deno task new <DayNumber>
```

This will create the following files:

* actual.txt - put the input data for the puzzle here
* demo.txt - put the demo input from the puzzle description here
* demoSolutions.txt - put the results for the demo inputs from the puzzle description here. One line for each solutiuon for the demo input
* solution.test.ts - you can put unit tests here
* solutions.ts - your solution. Implement the two functions `solve1` and `solve2`.

### Automatically download input

You can create an `.env`-file in the root directory and put you login session cookie
from the AoC-Website in there. If the cookie is present, the tool will automatically download
the input data and put it in the `actual.txt`-file.

```
session=<YOUR SESSION COOKIE-VALUE HERE>
```

**Remember to update your `.env`-file everytime you log into AoC.**


## Watch a solution

```shell
deno task watch <DayNumber>
```

Watches for file changes in the days directory and reruns the tests.

> This is a crude implementation and re-imports the solution module every time. 
> as a new instance. It therefore leaks memory.

The watcher will run your solutions using the demo input. If the result matches the
expectation it will rerun the solution again with the actual input.

The output looks something like this:

```
Rerunning Day 4
===================================================================================

    Puzzle 1: 2557 (actual) - 18 (demo)
    Puzzle 2: 9 (demo)

Rerunning Day 4
===================================================================================

    Puzzle 1: 2557 (actual) - 18 (demo)
    Puzzle 2: 1854 (actual) - 9 (demo)

```

## Run a solution

```shell
deno task run <DAY> [<ACTUAL>]
```

If `ACTUAL` is any value, the data from `actual.txt` will be used.

## Unit testing

If you want to use unit tests/test driven development, run 

```shell
deno test --watch
```

Run it in the root directory to run tests for all days or run it in a specific folder -
preferable for tdd.
