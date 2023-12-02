
import { expect, test } from "bun:test";
import { Day02 } from "./day-02";
import { loadInputFromFile } from "../util";

test("Day02 title", () => expect(Day02.title).toBe("Cube"))

test("Day02 - 1 - sample", async () => {
    const input = await loadInputFromFile("./src/day-02-1.sample")
    
    expect(Day02.part1(input)).toBe(0)
})

test("Day02 - 2 - sample", async () => {
    const input = await loadInputFromFile("./src/day-02-2.sample")
    
    expect(Day02.part2(input)).toBe(0)
})