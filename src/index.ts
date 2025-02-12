import process from "node:process";
import _ from "lodash";
import { format } from "date-fns";
import greet from "./modules/example.js";

async function log(message: string) {
	return new Promise<string>((resolve) => {
		setImmediate(() => {
			const string_ = `[${format(new Date(), "dd-MM-yyyy")}] <${_.random(6)}>: ${greet(message)}`;
			process.stdout.write(string_);
			resolve(string_);
		});
	});
}

export default log;
