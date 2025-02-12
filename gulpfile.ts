import { Transform } from "node:stream";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import {
	src,
	dest,
	type TaskFunction,
	parallel,
	watch as gulpWatch,
	series,
} from "gulp";
import ts from "gulp-typescript";
import type Vinyl from "vinyl";

const asyncExec = promisify(exec);

const transpileGlob = "src/**/*";
const transpile: TaskFunction = () => {
	const tsProject = ts.createProject("./tsconfig.json");
	return src(transpileGlob).pipe(tsProject()).pipe(dest("dist"));
};

const packGlob = "package.json";
const pack: TaskFunction = () => {
	return src(packGlob)
		.pipe(
			new Transform({
				objectMode: true,
				transform(file: Vinyl.BufferFile, _, callback) {
					const buffer = Buffer.from(file.contents);
					const content = JSON.parse(buffer.toString()) as Record<string, any>;

					const { devDependencies, scripts, ...rest } = content;

					file.contents = Buffer.from(JSON.stringify({ ...rest }, null, 2));

					callback(null, file);
				},
			})
		)
		.pipe(dest("dist"));
};

const licenseGlob = "LICENSE";
const license: TaskFunction = () => {
	return src(licenseGlob).pipe(dest("dist"));
};

const run: TaskFunction = async () => {
	const { stdout, stderr } = await asyncExec("npm start", {
		cwd: "tests/integration",
	});

	console.log(`[stdout]: ${stdout}`);
	console.log(`[stderr]: ${stderr}`);
};

const build = parallel(transpile, pack, license);
const watch: TaskFunction = () => {
	return gulpWatch(
		[transpileGlob, packGlob],
		{ ignoreInitial: false },
		series(build, run)
	);
};

export default build;
export { watch };
