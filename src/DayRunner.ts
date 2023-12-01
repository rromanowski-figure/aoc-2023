import { Day01 } from "./day-01/day-01"
import { error, loadInputFromFile, parseDayAndPart } from "./util"

export class DayRunner {
    days: Map<String, Day> = new Map([
        ["01", Day01]
    ])

    run = async (s: string) => {
        const [d, part] = parseDayAndPart(s)

        const day: Day = this.days.get(d) ?? error(`day ${d} not initialized`)

        console.log(this.buildHeader(`Day ${d} - ${day.title}`))
        
        if (part == "1" || !part) {
            const result1 = day.part1(await loadInputFromFile(`src/day-${d}-1.input`))
            console.log(`Part 1: ${result1}`)
        }

        if (part == "2" || !part) {
            const result2 = day.part2(await loadInputFromFile(`src/day-${d}-2.input`))
            console.log(`Part 2: ${result2}`)
        }        
    }

    buildHeader = (s: string): string => {
        const header = `--  ${s}  --`
        const border = '-'.repeat(header.length)
        return `${border}\n${header}\n${border}`
    }
}

export type Part = (input: string[]) => number

export type Day = {
    title: string,
    part1: Part,
    part2: Part,
}