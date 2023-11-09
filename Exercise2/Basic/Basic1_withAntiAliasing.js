"use strict";

///////////////////////////
//// global variables  ////
///////////////////////////

// pixel scale
let pixelScale = 10;

// line
let line = new Line(new Point(10 / pixelScale, 10 / pixelScale),
    new Point(180 / pixelScale, 180 / pixelScale),
    new Color(0, 0, 0, 255));

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

    let m = (y1 - y0) / (x1 - x0);
    if (Math.abs(m) > 1) {
        x0 += y0;
        y0 = x0 - y0;
        x0 -= y0;
        x1 += y1;
        y1 = x1 - y1;
        x1 -= y1;
    }
    if (x0 > x1) {
        x0 += x1;
        x1 = x0 - x1;
        x0 -= x1;
        y0 += y1;
        y1 = y0 - y1;
        y0 -= y1;
    }

    // TODO 2.1     Write code to draw a line
    //              between the start point and
    //              the end point. To make things
    //              easier, there are some comments
    //              on what to do next: 

    // compute deltas and update directions
    const delX = x1 - x0;
    const delY = Math.abs(y1 - y0);
    let D = delX - 2 * delY;
    const delDE = -2 * delY;
    const delDNE = 2 * (delX - delY);



    // set initial coordinates
    let y = y0;
    let y_step = 1;
    if (m < 0) {
        y_step = -1;
    }
    let a = 0;
    let color=line.color;

    for (let x = x0; x <= x1; x++) {
        // set pixel using the helper function setPixelS()
        if(Number(x)===Number(x0)){
        if (Math.abs(m) > 1) {
            setPixelS(image, new Point(y, x), line.color, pixelScale);
        }
        else {
            setPixelS(image, new Point(x, y), line.color, pixelScale);
        }
    }
    else{
        a = (D/(2*delX))/2;
        if (D < 0) {
            y += y_step;
            D = D + delDNE;
            if(a>-0.5){
            if (Math.abs(m) > 1) {
                color.a=(1-Math.abs(a-0.5))*255;
                setPixelS(image, new Point(y, x), color, pixelScale);
                color.a=Math.abs(a-0.5)*255;
                setPixelS(image, new Point(y-y_step, x), color, pixelScale);
            }
            else {
                color.a=(1-Math.abs(a-0.5))*255;
                setPixelS(image, new Point(x, y), color, pixelScale);
                color.a=Math.abs(a-0.5)*255;
                setPixelS(image, new Point(x, y-y_step), color, pixelScale);
            }
        }
        else if(a<-0.5){
            if (Math.abs(m) > 1) {
                color.a=(1-Math.abs(a-0.5))*255;
                setPixelS(image, new Point(y, x), color, pixelScale);
                color.a=Math.abs(a-0.5)*255;
                setPixelS(image, new Point(y+y_step, x), color, pixelScale);
            }
            else {
                color.a=(1-Math.abs(a-0.5))*255;
                setPixelS(image, new Point(x, y), color, pixelScale);
                color.a=Math.abs(a-0.5)*255;
                setPixelS(image, new Point(x, y+y_step), color, pixelScale);
            }
        }
        else{
            if (Math.abs(m) > 1) {
                color.a=255;
                setPixelS(image, new Point(y, x), color, pixelScale);
            }
            else {
                color.a=255;
                setPixelS(image, new Point(x, y), color, pixelScale);
            }
        }
        }
        else {
            D = D + delDE;
            if(a<0.5){
                if (Math.abs(m) > 1) {
                    color.a=(1-Math.abs(a+0.5))*255;
                    setPixelS(image, new Point(y, x), color, pixelScale);
                    color.a=Math.abs(a+0.5)*255;
                    setPixelS(image, new Point(y+y_step, x), color, pixelScale);
                }
                else {
                    color.a=(1-Math.abs(a+0.5))*255;
                    setPixelS(image, new Point(x, y), color, pixelScale);
                    color.a=Math.abs(a+0.5)*255;
                    setPixelS(image, new Point(x, y+y_step), color, pixelScale);
                }
            }
            else if(a>0.5){
                if (Math.abs(m) > 1) {
                    color.a=(1-Math.abs(a+0.5))*255;
                    setPixelS(image, new Point(y, x), color, pixelScale);
                    color.a=Math.abs(a-0.5)*255;
                    setPixelS(image, new Point(y-y_step, x), color, pixelScale);
                }
                else {
                    color.a=(1-Math.abs(a+0.5))*255;
                    setPixelS(image, new Point(x, y), color, pixelScale);
                    color.a=Math.abs(a+0.5)*255;
                    setPixelS(image, new Point(x, y-y_step), color, pixelScale);
                }
            }
            else{
                if (Math.abs(m) > 1) {
                    color.a=255;
                    setPixelS(image, new Point(y, x), color, pixelScale);
                }
                else {
                    color.a=255;
                    setPixelS(image, new Point(x, y), color, pixelScale);
                }
            }
        }
    }
        // update error
        // update coordinates depending on the error


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
    setPixelS(canvas, line.startPoint, new Color(255, 0, 0, 255), pixelScale);
    setPixelS(canvas, line.endPoint, new Color(0, 255, 0, 255), pixelScale);

    // show image
    context.putImageData(canvas, 0, 0);
}


function setupBresenham(canvas) {
    // execute rendering
    RenderCanvas1();
    // add event listener
    document.getElementById("canvas1").addEventListener('mousedown', onMouseDownCanvas1, false);
}
