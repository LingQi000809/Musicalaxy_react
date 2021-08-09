import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

function PieceMappingCard({ piece, mapping, onEditSwitch }) {
    const [overlayDisply, setOverlayDisplay] = useState(false)

    const rectHeight = 50
    const divStyle={
        width: 300, // ReactAudioPlayer width
        height: rectHeight*4.5,  // 3 blocks + 1 audio player + margins
        padding: "1.5rem",
        margin: "1rem",
        display: "inline-block"
    }
    const rectStyle={
        height: rectHeight,
        border: "0.5px solid black",
        display: "block"
    }
    const overlayStyle={
        ...divStyle, 
        borderRadius: "1rem",
        opacity: overlayDisply? "1": "0",
        backgroundColor: "#1E1E1ED0"
    }
    const editBtnStyle={
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
        borderRadius: 0,
    }

    return (
        // future: onhover -> fade div background and show edit option (add a layer div)
        <div id={piece + "_wrapper"} style={{position: "relative", display:"inline-block", transition: "all 1s"}}
            onMouseEnter={()=>setOverlayDisplay(true)} onMouseLeave={()=>setOverlayDisplay(false)}>
            <div id={piece} className="card" style={divStyle}>
                <ReactAudioPlayer
                    src={"audio_20s/" + piece + ".m4a"}
                    controls 
                />
                <div id="colors" style={{marginTop: "1rem"}}>
                    {mapping.map((rect)=>{
                    return <div style={{...rectStyle, backgroundColor: rect.color, width: rect.size}}
                                key={rect.color}></div>
                    })}
                </div>
            </div>
            <div className="overlay" style={overlayStyle}>
                <button style={editBtnStyle} onClick={()=>{
                    onEditSwitch(piece)
                }}> EDIT </button>
            </div>
        </div>
    )
}


export default PieceMappingCard;
