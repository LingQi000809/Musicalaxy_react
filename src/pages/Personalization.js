import React, { useState } from 'react';
import './Personalization.css';

import PMappingUI from '../Components/PMappingUI';

function Personalization({ onPageSwitch }) {
  const [curPiece, setCurPiece] = useState();
  
  function switchNextPiece() {

  }


  const mappingUIProps = {
    piece: curPiece,
    onNextPiece: switchNextPiece,
    finishPers: onPageSwitch({nextPage: 'WORKSPACE'})
  }

  return (
    <div className='page' id='personalization-page'>
      <div id='colorPicker'>
        <img src='img/colorSquare.png' alt='Pick Color' id='colorSquare'></img>
      </div>
      <PMappingUI {...mappingUIProps}/>
    </div>

      
  )
}


export default Personalization;
