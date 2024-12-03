Advent of Code 2024
===================

## Solve a new day

Create a new folder for the day with the necessary files.

```shell
deno --allow-read --allow-write main.ts c <DayNumber>
```

## Watch a solution

```shell
deno --allow-read main.ts w <DayNumber>
```

Watches for file changes in the days directory and reruns the tests.

> This is a crude implementation and re-imports the solution module every time. 
> as a new instance. It therefore leaks memory.

## Run a solution

```shell
deno --allow-read main.ts r <DayNumber> [<UseActualData>]
```

If `UseActualData` is any value, the data from `actual.txt` will be used.

## Unit testing

If you want to use unit tests/test driven development, run 

```shell
deno test --watch
```

Run it in the root directory to run tests for all days or run it in a specific folder -
preferable for tdd.
