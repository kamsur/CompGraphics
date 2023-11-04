"use strict";

///////////////////////////
//// global variables  ////
///////////////////////////

// pixel scale
let pixelScale = 10;

// line
let line = new Line(    new Point( 10 / pixelScale,  10 / pixelScale),
                        new Point(180 / pixelScale, 180 / pixelScale),
                        new Color(0, 0, 0));

//////////////
//// gui  ////
//////////////

// event listener for gui
function onChangePixelScale(value) {
    // rescale line
    let s = pixelScale / value;
    line.startPoint.x = line.startPoint.x * s;
    line.startPoint.y = line.startPoint.y * s;
    line.endPoint.x = line.endPoint.x * s;
    line.endPoint.y = line.endPoint.y * s;
    // set new scaling factor
    pixelScale = value;
    // rerender scene
    RenderCanvas1();
}

function onMouseDownCanvas1(e) {
    let rect = document.getElementById("canvas1").getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    console.log("onMouseDownCanvas1: " + x + " " + y);

    // set new points
    if (e.ctrlKey) {
        line.endPoint.x = x / pixelScale;
        line.endPoint.y = y / pixelScale;
    } else {
        line.startPoint.x = x / pixelScale;
        line.startPoint.y = y / pixelScale;
    }

    // rerender image
    RenderCanvas1();
}


//////////////////////////////
//// bresenham algorithm  ////
//////////////////////////////

function bresenham(image, line) {
    // ensure integer coordinates
    let x0 = Math.floor(line.startPoint.x);
    let y0 = Math.floor(line.startPoint.y);
    let x1 = Math.floor(line.endPoint.x);
    let y1 = Math.floor(line.endPoint.y);

    if(x0>x1){
        x0 += x1;
        x1 = x0-x1;
        x0 -= x1;
        y0 += y1;
        y1 = y0-y1;
        y0 -= y1;
    }
    let m=(y1-y0)/(x1-x0);
    if(Math.abs(m)>1){
        x0 += y0;
        y0 = x0-y0;
        x0 -= y0;
        x1 += y1;
        y1 = x1-y1;
        x1 -= y1;
        //m=(y1-y0)/(x1-x0);
    }

    // TODO 2.1     Write code to draw a line
    //              between the start point and
    //              the end point. To make things
    //              easier, there are some comments
    //              on what to do next: 

    // compute deltas and update directions
    const delX=x1-x0;
    const delY=Math.abs(y1-y0);
    //const delY=y1-y0;
    let D=delX-2*delY;
    const delDE=-2*delY;
    const delDNE=2*(delX-delY);



    // set initial coordinates
    let y=y0;
    let y_step=1;
    if(m<0){
        y_step=-1;
    }


    // start loop to set nPixels
    //const nPixels = 2*Math.sqrt(Math.pow(delx,2)+Math.pow(dely,2)); // think about how many pixels need to be set - zero is not correct ;)
    for (let x = x0; x <= x1; x++) {
        // set pixel using the helper function setPixelS()
        if(Math.abs(m)>1){
            setPixelS(image, new Point(y,x), line.color, pixelScale);
        }
        else{
            setPixelS(image, new Point(x,y), line.color, pixelScale);
        }
        // update error
        // update coordinates depending on the error
        if(D<0){
            y+=y_step;
            D=D+delDNE;
        }
        else{
            D=D+delDE;
        }


    }
}


//////////////////////////
//// render function  ////
//////////////////////////

function RenderCanvas1() {
    // get canvas handle
    let context = document.getElementById("canvas1").getContext("2d");
    let canvas = context.createImageData(200, 200);

    // clear canvas
    clearImage(canvas, new Color(255, 255, 255));

    // draw line
    bresenham(canvas, line);

    // draw start and end point with different colors
    setPixelS(canvas, line.startPoint, new Color(255, 0, 0), pixelScale);
    setPixelS(canvas, line.endPoint, new Color(0, 255, 0), pixelScale);

    // show image
    context.putImageData(canvas, 0, 0);
}


function setupBresenham(canvas) {
    // execute rendering
    RenderCanvas1();
    // add event listener
    document.getElementById("canvas1").addEventListener('mousedown', onMouseDownCanvas1, false);
}
