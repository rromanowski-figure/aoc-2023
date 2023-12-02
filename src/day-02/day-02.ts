
import { Day, Part } from "../DayRunner";
import { sum } from "../util";

type Game = [number, string[]]
type Color = 'red' | 'blue' | 'green'
type Cube = {
    n: number,
    color: Color,
}

// Sample input:
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
function parseGame(s: string): Game {
    const [game, info] = s.split(': ')
    const gameId = parseInt(game.match(/Game (\d+)/)![1])

    return [gameId, info.split("; ")]
}

// Sample input:
// 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
function parseCubes(s: string): Array<Cube> {
    return s.split(", ").map(cube => {
        const match = cube.match(/(\d+) ([a-z]+)/)!
        return { n: parseInt(match[1]), color: match[2] as Color }
    })
}

const part1: Part = (input: string[]): number => {
    const potentialBag = parseCubes('12 red, 13 green, 14 blue')

    const values = input.map(line => {
        const [gameId, info] = parseGame(line)

        const hasAllValidSubsets = info.every(subset => {
            const cubes = parseCubes(subset)
            // check if cubes can come from potentialBag
            return cubes.every(c => !!(potentialBag.find(target => target.color == c.color && target.n >= c.n)))
        })

        if(hasAllValidSubsets) return gameId
        else return 0
    })
    
    return sum(values)
}

const part2: Part = (input: string[]): number => {
    const powers = input.map(line => {
        const [_, info] = parseGame(line)

        let maxBlue = 0, maxGreen = 0, maxRed = 0

        info.forEach(subset => {
            const cubes = parseCubes(subset)

            cubes.forEach(c => {
                switch(c.color){
                    case 'red': maxRed = Math.max(c.n, maxRed); break;
                    case 'green': maxGreen = Math.max(c.n, maxGreen); break;
                    case 'blue': maxBlue = Math.max(c.n, maxBlue); break;
                }
            })
        })
 
        return maxBlue * maxGreen * maxRed
    })

    return sum(powers)
}

export const Day02 = {
    title: "Cube Conundrum",
    part1,
    part2,
} satisfies Day