// @ts-nocheck
import { expect, test } from "bun:test";
import { Day__DAY__ } from "./day-__DAY__";
import { loadInputFromFile } from "../util";

test("Day__DAY__ title", () => expect(Day__DAY__.title).toBe("__TITLE__"))

test("Day__DAY__ - 1 - sample", async () => {
    const input = await loadInputFromFile("./src/day-__DAY__/day-__DAY__-1.sample")
    
    expect(Day__DAY__.part1(input)).toBe(0)
})

test("Day__DAY__ - 2 - sample", async () => {
    const input = await loadInputFromFile("./src/day-__DAY__/day-__DAY__-2.sample")
    
    expect(Day__DAY__.part2(input)).toBe(0)
})