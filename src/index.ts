import { DayRunner } from "./DayRunner";
import { getDayFromArgv } from "./util";

const day = getDayFromArgv(Bun.argv)

const runner = new DayRunner()
if (day == "all") {
    runner.runAll()
} else {
    runner.run(day)
}

