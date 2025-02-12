import { createJsWithBabelEsmPreset, type JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
	...createJsWithBabelEsmPreset({
		tsconfig: "./tests/unit/tsconfig.json",
	}),
	testEnvironment: "node",
	moduleNameMapper: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
};

export default config;
