import { DayRunner } from "./DayRunner";
import { getDayFromArgv } from "./util";

const day = getDayFromArgv(Bun.argv)

new DayRunner().run(day)
