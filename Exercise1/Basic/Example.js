"use strict"

function drawIntoCanvas(canvas) {
	console.log("This is an exemplary log!");
	let context = canvas.getContext("2d");
	let img = context.createImageData(200, 200);

	// "img.data" is a 1D array of size 200*200*4, containing the rgba pixel data in uint8 format.
	// The image data layout is [height, width, channel], i.e. [200, 200, 4] in this case.
	// For example, "img.data[842]" accesses the blue channel of the 10th pixel in the second row of the image.
	// (0, 0) corresponds to the top left corner of the canvas.

	for (let i = 0; i < 4 * 200 * 200; i += 4) {
	    img.data[i] = 100;
		img.data[i + 1] = 200;
		img.data[i + 2] = 255;
		img.data[i + 3] = 255;
	}

	context.putImageData(img, 0, 0);
}
