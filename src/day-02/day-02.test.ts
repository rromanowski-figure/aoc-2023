
import { expect, test } from "bun:test";
import { Day02 } from "./day-02";
import { loadInputFromFile } from "../util";

test("playground", () => {
    const [game, rest] = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green".split(": ")
    expect(game).toBe("Game 1")
    const [subset, ...subsets] = rest.split("; ")
    expect(subset).toBe("3 blue, 4 red")
    const [move, ...moves] = subset.split(", ")
    expect(move).toBe("3 blue")
    const match = move.match(/(\d+) ([a-z]+)/)!
    expect(match[1]).toBe("3")
    expect(match[2]).toBe("blue")

})

test("Day02 title", () => expect(Day02.title).toBe("Cube Conundrum"))

test("Day02 - 1 - sample", async () => {
    const input = await loadInputFromFile("./src/day-02/day-02-1.sample")
    
    expect(Day02.part1(input)).toBe(8)
})

test("Day02 - 2 - sample", async () => {
    const input = await loadInputFromFile("./src/day-02/day-02-2.sample")
    
    expect(Day02.part2(input)).toBe(2286)
})