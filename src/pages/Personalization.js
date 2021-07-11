import React, { useState } from 'react';
import './Personalization.css';

import ClrCanvas from '../Components/ClrCanvas';
import PMappingUI from '../Components/PMappingUI';

function Personalization({ onPageSwitch }) {
  const pieceQueue = buildPieceQueue();
  const [curPieceId, setCurPieceId] = useState(0);
  const [mappings, setMappings] = useState([]);
  const [hoverClr, setHoverClr] = useState('#FFFFFF');
  const [selectedClr, setSelectedClr] = useState('#FFFFFF');

  function buildPieceQueue(){
    let pieces = ["Clair_de_Lune", "Dragon_Boy", "HeartBroken_Kiki", "Life_Incredible_Again", "Secret_Duo"];
    return pieces;
  }

  console.log(mappings,mappings[curPieceId])
  
  function switchToLast(curMapping) {
    storeMappings(curMapping);
    setCurPieceId(curPieceId-1);
  }

  function switchToNext(curMapping) {
    storeMappings(curMapping);
    setCurPieceId(curPieceId+1);
  }

  function finish(curMapping){
    storeMappings(curMapping);
    onPageSwitch({nextPage: 'WORKSPACE'})
  }

  function updateHoverColor(clr){
    setHoverClr(clr);
  }
  function updateSelectedColor(clr){
    setSelectedClr(clr);
  }

  function storeMappings(curMapping){
    resetUI();
    setMappings(mappings => {
      let num = mappings.length;
      if (num===0){
        return [curMapping];
      } else if (curPieceId===0){
        return [curMapping, ...mappings.slice(1,)];
      } else if (curPieceId===num-1){
        return [...mappings.slice(0,num-1), curMapping]
      } else{
        return [...mappings.slice(0,curPieceId), curMapping, ...mappings.slice(curPieceId+1,)]
      }
    });
  }

  function resetUI(){
    updateHoverColor('white');
    updateSelectedColor('white');
  }

  const mappingUIProps = {
    isFirst: curPieceId===0,    
    isLast: curPieceId===pieceQueue.length-1,
    pieceName: pieceQueue[curPieceId],    
    onLastPiece: switchToLast,
    onNextPiece: switchToNext,
    finishPers: finish,
    hoverClr: hoverClr,
    selectedClr: selectedClr
  }

  return (
    <div className='page' id='personalization-page'>
      <ClrCanvas updateHoverClr={updateHoverColor} 
      updateSelectedClr={updateSelectedColor}/>
      <PMappingUI {...mappingUIProps} />
    </div>
  )
}

//Todo: when switch back, stored

export default Personalization;
