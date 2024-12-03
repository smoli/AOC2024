Advent of Code 2024
===================

## Solve a new day

Create a new folder for the day with the necessary files.

```shell
deno --allow-read --allow-write main.ts c <DayNumber>
```

## Run a solution

```shell
deno --allow-read main.ts r <DayNumber> [<UseActualData>]
```

If `UseActualData` is any value, the data from `actual.txt` will be used.

## Watch a solution

```shell
deno --allow-read main.ts w <DayNumber> [<UseActualData>]
```

Watches for file changes in the days directory and reruns the tests.

> This is a crude implementation and re-imports the solution module every time. 
> It therefore leaks memory.

