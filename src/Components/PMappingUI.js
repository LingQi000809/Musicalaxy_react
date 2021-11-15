import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ResizableRect from './ResizableRect';
import './PMappingUI.css'

function PMappingUI({ pieceQueue, finishPers, 
    hoverClr, selectedClr, resetColors,
    curMappings, startPieceId
 }) {
    ///////////////
    // VARIABLES //
    ///////////////
    const [curPieceId, setCurPieceId] = useState(startPieceId);
    const [piecePath, setPiecePath] = useState(null);
    const [rerender, forceRerender] = useState(true)
    const [instructionDisplay, setInstructionDisplay] = useState(false)

    const [storedMappings, setMappings] = useState(curMappings? curMappings: []); // mapping for each piece
    const [mapping, setMapping] = useState([]); //[{color, size}]
    const baseWidth = 50; // must be a percentage
    const [warnDisplay, setWarnDisplay] = useState(false);

    const squaresDivRef = useRef()
    const highlight_text_style = {
        color: "rgb(252, 172, 172)",
        fontStyle: "italic"
    }


    ///////////
    // PIECE //
    ///////////
    useEffect(()=>{
        console.log("setting current mapping");
        setMapping(storedMappings.length <= curPieceId
            ? []
            : storedMappings[curPieceId]);
    },[curPieceId, storedMappings]);

    useEffect(()=>{
        setPiecePath("audio_20s/" + pieceQueue[curPieceId] + ".m4a");
    }, [curPieceId, pieceQueue])


    ///////////////////////////
    // CURRENT PIECE MAPPING //
    ///////////////////////////
    function addMapping(){
        if (mapping.length < 3){
            setWarnDisplay(false);
            setMapping(mapping =>{
                if (mapping.length === 0){
                    return [{color: selectedClr, size: baseWidth}];
                } else {
                    return [...mapping, {color: selectedClr, size: baseWidth}]
                }
            });
        } else{
            setWarnDisplay(true);
        }
    }
    function removeMapping(id){
        setWarnDisplay(false);
        setMapping(mapping =>{
            if (mapping.length === 1){
                return [];
            } else if (id === 0){
                return mapping.slice(1,);
            } else if (id === mapping.length-1){
                return mapping.slice(0,id);
            } else {
                return [...mapping.slice(0,id), ...mapping.slice(id+1,)];
            }
        });
    }

    ////////////
    // SQUARE //
    ////////////
    const updateSize = useCallback((id, newSize)=>{
        // not using setMapping here -> prevent infinite loop (dependency: mapping)
        // changing elements in mapping doesn't change the array reference 
        mapping[id].size = newSize
        forceRerender(false)
        forceRerender(true)
    },[mapping])

    ////////////
    // SWITCH //
    ////////////
    function goBack(){
        console.log("going back to id:", curPieceId-1)
        setCurPieceId(curPieceId-1);
        resetUI();
    }
    function goNext(){
        console.log("going next to id:", curPieceId+1)
        setCurPieceId(curPieceId+1);
        resetUI();
    }
    function onFinish(){
        resetUI();
        finishPers(storedMappings);
    }
    function resetUI(){
        setWarnDisplay(false);
        resetColors();
    }
    function showInstructions(){
        setInstructionDisplay(true)
    }
    function hideInstructions(){
        setInstructionDisplay(false)
    }

    //////////////
    // MAPPINGS //
    //////////////
    useEffect(()=>{  
        let num = storedMappings.length;
        if (curPieceId >= num){
            storedMappings.push(mapping);
        } else{
            storedMappings.splice(curPieceId, 1, mapping)
        }
    }, [mapping, curPieceId, storedMappings])

    return (
      <div id='mappingWrapper'>
        <div id='mappingUI'>
        <p id='colorQ'> What's the color of this music? </p>
        <ReactAudioPlayer
        id='audioPlayer'
        src={piecePath}
        autoPlay controls loop />
        <div id='selection'>
            <div id='hoverClr' style={{backgroundColor: hoverClr}}></div>
            <div id='selectedClr' style={{backgroundColor: selectedClr}}></div>
        </div>
        <svg id='add-icon' onClick={addMapping} vxmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
            <g fill='white'>
                <path d="M22,44c-3.309,0-6-2.665-6-5.941V28H5.941C2.665,28,0,25.309,0,22s2.665-6,5.941-6H16V5.941C16,2.665,18.691,0,22,0
                s6,2.665,6,5.941V16h10.059C41.335,16,44,18.691,44,22s-2.665,6-5.941,6H28v10.059C28,41.335,25.309,44,22,44z M5.941,18
                C3.805,18,2,19.832,2,22s1.805,4,3.941,4H18v12.059C18,40.195,19.832,42,22,42s4-1.805,4-3.941V26h12.059C40.195,26,42,24.168,42,22
                s-1.805-4-3.941-4H26V5.941C26,3.805,24.168,2,22,2s-4,1.805-4,3.941V18H5.941z"/>
            </g>
        </svg>
        </div>

        {curPieceId===0
        ? <></>
        : <svg id='back-icon' onClick={goBack} vxmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175">
            <g fill='#C0D4FF'>
                <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/>
            </g>
        </svg>}
        {curPieceId===pieceQueue.length-1
        ? <></>
        :<svg id='next-icon' onClick={goNext} vxmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175">
            <g fill='#C0D4FF'>
                <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/> 
            </g> 
        </svg>}
        <p id='selected-colors'
        style={{display:mapping.length===0?'none':'block'}}>
             Selected color(s): </p>
        {/* <p id='pers-ins'
        style={{display:mapping.length===0?'none':'block'}}>
             Click to increase a color's weight.<br/> Double click to reduce it. </p> */}
        <div id='pers-squares' ref={squaresDivRef}>
            {Object.keys(mapping).map((id) => {
                let i=parseInt(id);
                return <ResizableRect id={i} key={i} clr={mapping[i].color} 
                    baseWidth={baseWidth} maxWidth={squaresDivRef.current.offsetWidth} size={mapping[i].size} 
                    removeSquare={removeMapping}
                    updateSize={updateSize} />
            }
            )}
        </div>
        <p id='max-warning' 
        style={warnDisplay ? {display: "initial"} : {display: "none"}}>
             Up to 3 colors! </p>

        <svg id='finish-icon' onClick={onFinish} vxmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <g fill='white'>
                <path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
	            <path d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411C39.251,14.885,38.62,14.922,38.252,15.336z"/>            
            </g> 
        </svg>
        <svg id='info-icon' onMouseEnter={showInstructions} onMouseLeave={hideInstructions}
            vxmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <g fill='#C0D4FF'>
                <path d="M26,0C11.663,0,0,11.663,0,26s11.663,26,26,26s26-11.663,26-26S40.337,0,26,0z M26,50C12.767,50,2,39.233,2,26
                    S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"/>
                <path d="M26,37c-0.553,0-1,0.447-1,1v2c0,0.553,0.447,1,1,1s1-0.447,1-1v-2C27,37.447,26.553,37,26,37z"/>
                <path d="M26.113,9.001C26.075,9.001,26.037,9,25.998,9c-2.116,0-4.106,0.815-5.615,2.304C18.847,12.819,18,14.842,18,17
                    c0,0.553,0.447,1,1,1s1-0.447,1-1c0-1.618,0.635-3.136,1.787-4.272c1.153-1.137,2.688-1.765,4.299-1.727
                    c3.161,0.044,5.869,2.752,5.913,5.913c0.029,2.084-0.999,4.002-2.751,5.132C26.588,23.762,25,26.794,25,30.158V33
                    c0,0.553,0.447,1,1,1s1-0.447,1-1v-2.842c0-2.642,1.276-5.105,3.332-6.432c2.335-1.506,3.706-4.063,3.667-6.84
                    C33.939,12.599,30.401,9.061,26.113,9.001z"/>
            </g> 
        </svg>
        <div className="modal-wrapper" style={{display: instructionDisplay?"initial":"none"}}>
            <div className="modal" id="personalization-instructions"
                onMouseEnter={showInstructions} onMouseLeave={hideInstructions}>
                <p style={{textAlign: "center"}}>
                <span style={{color: "#C0D4FF", fontSize: "larger", fontStyle: "italic"}}> 
                    "Music is colorful."&nbsp;&nbsp;
                </span>
                Let the machine learn how you perceive music in a colorful way.
                </p>
                <ul> 
                    <li> For each excerpt, select 0-3 colors via the <span style={highlight_text_style}> add </span> icon. Selected colors will show up as rectangles. </li>
                    <li> You may <span style={highlight_text_style}> assign weights </span> to a color by dragging its right edge.</li>
                    <li> You can also find the <span style={highlight_text_style}> delete </span> icon on hover. </li>
                    <li> Go <span style={highlight_text_style}>next</span> or go <span style={highlight_text_style}>back</span> by clicking the arrows on the bottom.</li>
                    <li> Finish personalization at any time.</li>
                </ul>
            </div>
        </div>
      </div>
  )
}

export default PMappingUI;
