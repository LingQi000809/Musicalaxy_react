import React, { } from 'react';
import PieceMappingCard from '../Components/PieceMappingCard';
import './Training.css';

function Training({ onPageSwitch, pieceMappingMap }) {
  let cardComps = [];

  console.log(pieceMappingMap)
  function editPieceMapping(piece){
    let pieceNames = Array.from(pieceMappingMap.keys());
    let pieceMappings = Array.from(pieceMappingMap.values());
    let pieceId = pieceNames.indexOf(piece);
    onPageSwitch({
      nextPage: 'PERSONALIZATION',
      startPieceId: pieceId,
      curMappings: pieceMappings,
      curPieces: pieceNames
    })
  }

  pieceMappingMap.forEach((mapping, piece)=>{
    cardComps.push(<PieceMappingCard key={piece} 
      piece={piece} mapping={mapping}
      onEditSwitch={editPieceMapping}/>)
  })

  return (
    // piece mapping info
    // training button
    <div className='page' id='training-page'> 
      {/* <p className='page-title'> Added Music-Color Mappings</p> */}
      <div id="cards">
        {cardComps}
      </div>
      {pieceMappingMap.length==0
      ? <button id="training-btn"> START TRAINING </button>
      : <div>
          <p id="no-mappings-text"> No Mappings Added </p> 
          <button id="home-btn"> RETURN HOME</button> 
        </div>}
      
    </div>
  )
}


export default Training;
