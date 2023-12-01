import { expect, test } from "bun:test";
import { Day01 } from "./day-01";
import { loadInputFromFile } from "../util";

test("Day01", () => expect(Day01.title).toBe("Trebuchet?!"))

test("Day01 - 1 - sample", async () => {
    const input = await loadInputFromFile("./src/day-01/day-01-1.sample")
    
    expect(Day01.part1(input)).toBe(142)
})

test("Day01 - 2 - sample", async () => {
    expect(Day01.part2(["eighthree"])).toBe(83)

    const input = await loadInputFromFile("./src/day-01/day-01-2.sample")
    
    expect(Day01.part2(input)).toBe(281)
})