const TOKEN = 'f29c2a7f59fa42cebe5ec271d54fcc27';
const QR_URL = 'https://mpc.getswish.net/qrg-swish/api/v1/commerce';

const fetchQRCode = async () => {
	let response = undefined;
	try {
		response = await fetch(QR_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: TOKEN,
				format: 'png',
				size: 200,
			}),
		});
	} catch (e) {
		console.log(e);
	}

	if (response) return response;

	return undefined;
};

const drawQRCode = async (response) => {
    if(!response) return;
	const canvas = document.getElementById('qrcanvas');

	const blob = await response.blob();
	const imageBitmap = await createImageBitmap(blob);
	const ctx = canvas?.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(imageBitmap, 0, 0);
};

const main = async () => {
	const response = await fetchQRCode();
	drawQRCode(response);
};

main();
