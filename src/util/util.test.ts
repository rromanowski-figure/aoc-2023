import { expect, test } from "bun:test";

function parseDayAndPart(s: string): [string, string | undefined] {
    const [day, ...part] = s.split(".")
    return [day, (part.length == 0 ? undefined : part[0])]
}
test("split ony day string", () => {
    const [day, part] = parseDayAndPart("01")
    expect(day).toBe("01")
    expect(part).toBeUndefined()
})

test("split day and part string", () => {
    const [day, part] = parseDayAndPart("01.1")
    expect(day).toBe("01")
    expect(part).toBe("1")
})