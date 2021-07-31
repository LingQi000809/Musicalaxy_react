import React, {useState, useRef, useCallback, useEffect} from 'react';

function Square({id, clr, baseWidth, maxWidth, size, removeSquare, updateSize}) {
    const squareRef = useRef();
    const wrapperRef = useRef();
    const [interfaceDisplay, setInterfaceDisplay] = useState(false);
    const [mouseDownForResize, setMouseDown] = useState(false);

    let wrapperStyle = {
        position: "relative",
        width: size,
        height: "30%",
        marginBottom: "2px"
    }
    let squareStyle = {
        display: "block",
        backgroundColor: clr,
        width: "100%",
        height: "100%",
        border: "0.5px solid black"
    }
    let closeStyle = {
        display: interfaceDisplay?"initial":"none",
        cursor: "pointer",
        height: "28%",
        position: "absolute",
        top: "4px",
        left: "4px"
    }
    let dragStyle={
        display: interfaceDisplay?"initial":"none",
        height: "55%",
        position: "absolute",
        left: "100%",
        top: "50%",
        transform: "translate(-60%, -50%)",
        opacity: "50%",
        cursor:"col-resize"
    }

    function deleteMe(){
        removeSquare(id);
    }
    function showInterface(){
        setInterfaceDisplay(true)
    }
    function hideInterface(){
        setInterfaceDisplay(false)
    }
    const mouseMoveHandler = useCallback(e=>{
        let wrapperRect = wrapperRef.current.getBoundingClientRect();
        let wrapperLeft = wrapperRect.left;
        let minWidth = maxWidth * parseInt(baseWidth.slice(0, -1)) / 100
        let mouseLeft = e.clientX;
        let newSize = mouseLeft - wrapperLeft;
        if (newSize < minWidth || newSize > maxWidth){
            return
        }
        updateSize(id, newSize);
    }, [baseWidth, id, maxWidth, updateSize])

    const mouseUpHandler = useCallback(e=>{
        console.log("mouse up, removed event listeners")
        setMouseDown(false);
        window.removeEventListener('mouseup', mouseUpHandler)
        window.removeEventListener('mousemove', mouseMoveHandler)
    }, [setMouseDown, mouseMoveHandler])

    useEffect(()=>{
        if (mouseDownForResize){
            console.log("mouse down, added event listeners")
            window.addEventListener('mouseup', mouseUpHandler)
            window.addEventListener('mousemove', mouseMoveHandler)
        }
    }, [mouseDownForResize, mouseMoveHandler, mouseUpHandler])
    
    
    return(
        <div id='square-wrapper' style={wrapperStyle} ref={wrapperRef}>
            <div ref={squareRef} style={squareStyle} 
                onMouseEnter={showInterface} onMouseLeave={hideInterface}>
            </div>
            <svg id='drag' style={dragStyle}
                onMouseEnter={showInterface} onMouseLeave={hideInterface}
                onMouseDown={()=> {
                    console.log("mouse down for resizing")
                    setMouseDown(true)
                }} 
                vxmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
                <g fill='black'>
                    <path d="M15.5,0c-0.552,0-1,0.447-1,1v40c0,0.553,0.448,1,1,1s1-0.447,1-1V1C16.5,0.447,16.052,0,15.5,0z"/>
                    <path d="M20.5,0c-0.552,0-1,0.447-1,1v40c0,0.553,0.448,1,1,1s1-0.447,1-1V1C21.5,0.447,21.052,0,20.5,0z"/>
                </g>
            </svg>
            <svg id='close-icon' style={closeStyle} 
                onClick={deleteMe} onMouseEnter={showInterface} onMouseLeave={hideInterface} 
                vxmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.2 475.2">
                <g fill='black'>
                    <path d="M405.6,69.6C360.7,24.7,301.1,0,237.6,0s-123.1,24.7-168,69.6S0,174.1,0,237.6s24.7,123.1,69.6,168s104.5,69.6,168,69.6
                    s123.1-24.7,168-69.6s69.6-104.5,69.6-168S450.5,114.5,405.6,69.6z M386.5,386.5c-39.8,39.8-92.7,61.7-148.9,61.7
                    s-109.1-21.9-148.9-61.7c-82.1-82.1-82.1-215.7,0-297.8C128.5,48.9,181.4,27,237.6,27s109.1,21.9,148.9,61.7
                    C468.6,170.8,468.6,304.4,386.5,386.5z"/>
                    <path d="M342.3,132.9c-5.3-5.3-13.8-5.3-19.1,0l-85.6,85.6L152,132.9c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1
                    l85.6,85.6l-85.6,85.6c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.6-85.6l85.6,85.6c2.6,2.6,6.1,4,9.5,4
                    c3.5,0,6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-85.4-85.6l85.6-85.6C347.6,146.7,347.6,138.2,342.3,132.9z"/>
                </g> 
            </svg>  
        </div>
    )
  }
  
  export default Square