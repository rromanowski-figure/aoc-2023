import { Day, Part } from "../DayRunner";
import { sum } from "../util";

const firstAndLastDigitsAsNumber = (s: string): number => parseInt(`${s[0]}${s[s.length - 1]}`)

const part1: Part = (input: string[]): number => {
    const twoDigitsOnly = input.map(line => {
        const digitsOnly = line.replaceAll(/[^\d]/g, "")
        
        return firstAndLastDigitsAsNumber(digitsOnly)
    })
    
    return sum(twoDigitsOnly)
}

const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const wordRegex = new RegExp(`(${words.join("|")})`, "g")

function recursivelyReplace(line: string): string {
    const newLine = line.replaceAll(wordRegex, (match: string): string => {
        const i = words.findIndex( w => w == match);

        // words can overlap by at most one letter, so keep it there for next iteration
        return `${i}${match.charAt(match.length-1)}`
    })

    if (newLine != line) return recursivelyReplace(newLine)

    return newLine
}

const part2: Part = (input: string[]): number => {
    const twoDigitsOnly = input.map(line => {
        const digitsOnly = recursivelyReplace(line)
        
        return firstAndLastDigitsAsNumber(digitsOnly.replaceAll(/[^\d]/g, ""))
    })

    return sum(twoDigitsOnly)
}

export const Day01 = {
    title: "Trebuchet?!",
    part1,
    part2,
} satisfies Day