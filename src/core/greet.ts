import chalk from "chalk";

function greet(name: string) {
	return `Hello, ${chalk.bgHex("#23F0C7")(name)}!`;
}

export default greet;
