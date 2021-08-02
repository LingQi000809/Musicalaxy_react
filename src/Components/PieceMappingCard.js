import React, { } from 'react';
import ReactAudioPlayer from 'react-audio-player';

function PieceMappingCard({ piece, mapping }) {
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

    return (
        // audio player
        // mapping
        // future: edit individual piece option
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
    )
}


export default PieceMappingCard;
