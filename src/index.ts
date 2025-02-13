import { join } from "node:path";
import { createWriteStream } from "node:fs";
import ncc from "@vercel/ncc";
import _ from "lodash";
import archiver from "archiver";
import type Serverless from "serverless";

const packageJson = `{"type": "module"}`;

class Ncc {
	static tags = ["build"];
	private readonly hooks;

	constructor(private readonly serverless: Serverless) {
		this.hooks = {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			"package:createDeploymentArtifacts": async () => this.build(),
		};
	}

	async build() {
		const { servicePath } = this.serverless.config;
		const { functions } = this.serverless.service;

		const result = await Promise.allSettled(
			Object.entries(functions).map(async ([name, function_]) => {
				if ("handler" in function_) {
					const { handler } = function_;
					const [handlerFile] = handler.split(".");
					const handlerFilename = `${handlerFile}.ts`;

					const zipFilename = `${name}.zip`;
					const zipPath = join(servicePath, `.serverless/${zipFilename}`);

					const { code } = await ncc(join(servicePath, handlerFilename), {
						minify: true,
					});

					_.set(function_, "package.artifact", zipPath);
					return new Promise<void>((resolve, reject) => {
						const archive = archiver("zip", { zlib: { level: 9 } });
						const output = createWriteStream(zipPath);
						archive.pipe(output);

						output.on("end", async () => {
							resolve();
						});
						output.on("close", () => {
							resolve();
						});
						archive.on("error", (error) => {
							reject(error);
						});

						archive.append(code, { name: `${handlerFile}.js` });
						archive.append(packageJson, { name: "package.json" });

						void archive.finalize();
					});
				}
			})
		);
	}
}

export default Ncc;
