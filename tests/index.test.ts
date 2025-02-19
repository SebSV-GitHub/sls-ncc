import test from "ava";
import chalk from "chalk";
import greet from "#src/core/greet.js";

test("Greet", (t) => {
	t.is(greet("Seb"), `Hello, ${chalk.bgHex("#23F0C7")("Seb")}!`);
});
