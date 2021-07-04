import React, { } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './PMappingUI.css'

function PMappingUI({ piece, onNextPiece, finishPers }) {


  return (
      <div id='mappingWrapper'>
          <div id='mappingUI'>
              <ReactAudioPlayer
              id='audioPlayer'
              src="audio/Dragon_Boy.mp3"
              autoPlay
              controls />
          </div>
      </div>
  )
}

export default PMappingUI;
