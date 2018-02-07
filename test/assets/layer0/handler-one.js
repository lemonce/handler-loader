module.exports = async function handlerOne(ms) {
	let result;

	await new Promise((resolve) => {
		setTimeout(resolve, ms);

		result =3;
	});

	return result;
}