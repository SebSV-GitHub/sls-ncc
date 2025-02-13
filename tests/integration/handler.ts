const hello = () => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "Hello, World!",
		}),
	};
};

export { hello };
