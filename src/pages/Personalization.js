import React, { useState } from 'react';
import './Personalization.css';

import ClrCanvas from '../Components/ClrCanvas';
import PMappingUI from '../Components/PMappingUI';

function Personalization({ curMappings, startPieceId, curPieces, onPageSwitch }) {
  const [hoverClr, setHoverClr] = useState('#FFFFFF');
  const [selectedClr, setSelectedClr] = useState('#FFFFFF');
  const defaultPieces = ["Clair_de_Lune", "Dragon_Boy", "HeartBroken_Kiki", "Life_Incredible_Again", "Secret_Duo"];
  const pieceQueue = curPieces? curPieces: defaultPieces;

  function finish(mappings){
    // add transition page: loading / training progress
    // backend - storedMappings loading & training
    onPageSwitch({
      nextPage: 'TRAINING',
      pieceMappingMap: compileMappings(mappings)
    })
  }

  function updateHoverColor(clr){
    setHoverClr(clr);
  }
  function updateSelectedColor(clr){
    setSelectedClr(clr);
  }

  function resetColors(){
    updateHoverColor('white');
    updateSelectedColor('white');
  }

  function compileMappings(mappings){
    let pieceMappingMap = new Map()
    for (let i=0; i<mappings.length; i++){
      let curMapping = mappings[i];
      // skip pieces for which the user doesn't select any color
      if (curMapping.length===0) continue;
      // record the piece name as key and mappings as value
      pieceMappingMap.set(pieceQueue[i], curMapping)
    }
    console.log(pieceMappingMap)
    return pieceMappingMap
  }

  const mappingUIProps = {
    pieceQueue: pieceQueue,
    finishPers: finish,
    hoverClr: hoverClr,
    selectedClr: selectedClr,
    resetColors: resetColors,
    curMappings: curMappings? curMappings: [], 
    startPieceId: startPieceId? startPieceId: 0,
  }

  return (
    <div className='page' id='personalization-page'>
      <ClrCanvas updateHoverClr={updateHoverColor} 
      updateSelectedClr={updateSelectedColor}/>
      <PMappingUI {...mappingUIProps}/>
    </div>
  )
}

export default Personalization;
