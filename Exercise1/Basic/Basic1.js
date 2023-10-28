"use strict"

function drawPixelwiseCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1a)      Copy the code from Example.js
    //                and modify it to create a 
    //                circle.
    let x=0,y=0;
    for (let i = 0; i < 4 * 200 * 200; i += 4) {
        let d=Math.pow(x-100, 2)+Math.pow(y-100, 2);
        if(d<=Math.pow(50,2)){
	    img.data[i] = 0;
		img.data[i + 1] = 255;
		img.data[i + 2] = 0;
		img.data[i + 3] = 255;
        }
        x+=1;
        if (x==200){
            x=0;
            y+=1;
        }
	}



    context.putImageData(img, 0, 0);
}

function drawContourCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1b)      Copy your code from above
    //                and extend it to receive a
    //                contour around the circle.
    let x=0,y=0;
    for (let i = 0; i < 4 * 200 * 200; i += 4) {
        let d=Math.pow(x-100, 2)+Math.pow(y-100, 2);
        if(d<=Math.pow(45,2)){
	    img.data[i] = 0;
		img.data[i + 1] = 255;
		img.data[i + 2] = 0;
		img.data[i + 3] = 255;
        }
        else if(d<=Math.pow(55,2)&&d>Math.pow(45,2)){
            img.data[i] = 0;
            img.data[i + 1] = 127;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
            }
        x+=1;
        if (x==200){
            x=0;
            y+=1;
        }
	}



    

    context.putImageData(img, 0, 0);
}

function drawSmoothCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1c)      Copy your code from above
    //                and extend it to get rid
    //                of the aliasing effects at
    //                the border.
    let x=0,y=0;
    for (let i = 0; i < 4 * 200 * 200; i += 4) {
        let d=Math.pow(x-100, 2)+Math.pow(y-100, 2);
        if(d<Math.pow(45,2)){
            img.data[i] = 0;
            img.data[i + 1] = 255;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
            }
        else if(d<Math.pow(55,2)&&d>Math.pow(45,2)){
            img.data[i] = 0;
            img.data[i + 1] = 127;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
            }
        else if(d==Math.pow(45,2)){
            img.data[i] = 0;
            img.data[i + 1] = 192;
            img.data[i + 2] = 0;
            img.data[i + 3] = 255;
            }
        else if(d==Math.pow(55,2)){
            img.data[i] = 127;
            img.data[i + 1] = 192;
            img.data[i + 2] = 127;
            img.data[i + 3] = 255;
            }
            x+=1;
            if (x==200){
                x=0;
                y+=1;
            }
    }



    context.putImageData(img, 0, 0);
}
