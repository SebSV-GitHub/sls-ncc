import greet from "#core/greet.js";

async function messageFromTheFuture(name: string) {
	return new Promise<void>((resolve) => {
		setTimeout(
			() => {
				console.log(greet(name));
				resolve();
			},
			Math.random() * 1000 + 1000
		);
	});
}

export default messageFromTheFuture;
