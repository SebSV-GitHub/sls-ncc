import process from "node:process";
import {
	describe,
	beforeEach,
	afterEach,
	it,
	expect,
	jest,
} from "@jest/globals";
import log from "../../src/index.js";

describe("Index", () => {
	let writeSpy: jest.Spied<typeof process.stdout.write>;

	beforeEach(() => {
		writeSpy = jest.spyOn(process.stdout, "write");
	});

	afterEach(() => {
		writeSpy.mockRestore();
	});

	describe("log", () => {
		it("should log (formatted) example", async () => {
			await log("example");
			expect(writeSpy).toHaveBeenCalled();
		});
	});
});
