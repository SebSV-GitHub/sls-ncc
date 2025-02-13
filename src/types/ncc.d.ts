declare module "@vercel/ncc" {
	export * from "@vercel/ncc";
	type NccOptions = {
		cache: string | false;
		externals: string[];
		filterAssetBase: string;
		minify: boolean;
		sourceMap: boolean;
		assetBuilds: boolean;
		sourceMapBasePrefix: string;
		sourceMapRegister: true;
		watch: boolean;
		license: string;
		target: string;
		v8cache: boolean;
		quiet: boolean;
		debugLog: boolean;
	};

	type Asset = {
		source:
			| string
			| {
					type: "Buffer";
					data: number[];
			  };
		permissions: number;
	};

	type NccOutput = {
		code: string;
		map: string | undefined;
		assets: Record<string, Asset>;
	};

	type Ncc = (
		entry: string,
		options: Partial<NccOptions>
	) => Promise<NccOutput>;

	export default ncc as Ncc;
}
