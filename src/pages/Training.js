import React, { } from 'react';
import PieceMappingCard from '../Components/PieceMappingCard';

function Training({ onPageSwitch, pieceMappingMap }) {
  let cardComps = [];
  pieceMappingMap.forEach((mapping, piece)=>{
    cardComps.push(<PieceMappingCard key={piece} 
      piece={piece} mapping={mapping}/>)
  })

  return (
    // piece mapping info
    // training button
    <div className='page' id='training-page'> 
      <div id="cards">
        {cardComps}
      </div>
    </div>
  )
}


export default Training;
