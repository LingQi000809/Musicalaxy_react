import { useEffect, useRef, useState } from 'react';
import './ClrCanvas.css';

function ClrCanvas({updateHoverClr, updateSelectedClr}) {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(()=>{
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imgRef.current;
      img.width = canvas.clientWidth;
      img.height = canvas.clientHeight;
    //   BUG: pixels not changed when resized
      img.onload = () =>{
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        img.style.display = 'none';
      }
    });

    function getMouseClr(e){
        const canvas = canvasRef.current;
        let canvasRect = canvas.getBoundingClientRect();
        let x = e.clientX - canvasRect.left;
        let y = e.clientY - canvasRect.top;
        const ctx = canvas.getContext("2d");
        let pixel = ctx.getImageData(x,y,1,1).data;
        let curClr = 'rgba(' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ', ' + pixel[3] / 255 + ')';
        return curClr;
    }

    return(
        <div id='colorPicker'>
          <canvas id="canvas" ref={canvasRef} 
            onMouseMove={e => {
                let curClr = getMouseClr(e);
                updateHoverClr(curClr);
            }}
            onClick={e=>{
                let curClr = getMouseClr(e);
                updateSelectedClr(curClr);
            }
            }/>
          <img id="colorSquare" ref={imgRef} src='img/colorSquare.png' />
        </div>
      )
  }
  
  export default ClrCanvas