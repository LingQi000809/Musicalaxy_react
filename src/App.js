import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
// import { useToggle } from './hooks/customeHooks';
// import { CSSTransition } from 'react-transition-group';

import './App.css';
import Personalization from './pages/Personalization';
import Training from './pages/Training';
import Workspace from './pages/Workspace'

function App() {
  const [curPage, setCurPage] = useState('PERSONALIZATION');
  // const [nextPage, setNextPage] = useState(null);
  // const [isAnimated, toggleAnimated] = useToggle();
  const [pageSpecialProps, setPageSpecialProps] = useState({})

  // page switch
  const startPageSwitch = useCallback((pageSwitchData) => {
    let nextPage = pageSwitchData.nextPage;
    setCurPage(nextPage);
    switch (nextPage){
      case "PERSONALIZATION":
        setPageSpecialProps({
          startPieceId: pageSwitchData.startPieceId,
          curMappings: pageSwitchData.curMappings,
          curPieces: pageSwitchData.curPieces
        });
        break;
      case "TRAINING":
        setPageSpecialProps({
          pieceMappingMap: pageSwitchData.pieceMappingMap
        });
        break;
      default:
        setPageSpecialProps({});
        break;
    }
    // setNextPage(nextPage);
    // toggleAnimated();
  }, [setCurPage, setPageSpecialProps])

  // function finishPageSwitch() {
  //   setCurPage(nextPage);
  //   setNextPage(null);
  //   toggleAnimated();
  // }

  function renderSwitch(curPage){
    switch(curPage){
      case 'PERSONALIZATION':
        return <Personalization {...pageProps} {...pageSpecialProps}/>;
      case 'TRAINING':
        return <Training {...pageProps} {...pageSpecialProps}/>
      case 'WORKSPACE':
        return <Workspace {...pageProps}/>;
      default:
        return <></>;
    }
  }

  // animation props

  // const AnimationProps = {
  //   in: isAnimated,
  //   timeout: 1000,
  // }

  // const fromProps = {
  //   ...AnimationProps,
  //   classNames: 'from',
  //   onEntered: finishPageSwitch
  // }

  // const toProps = {
  //   ...AnimationProps,
  //   classNames: 'to'
  // }

  // page props
  const pageProps = {
    onPageSwitch: startPageSwitch
  };

  

  return (
    <>
      {renderSwitch(curPage)}
      {/* <CSSTransition {...fromProps}>
        {renderSwitch(curPage)}
      </CSSTransition>
      <CSSTransition {...toProps}>
        {renderSwitch(nextPage)}
      </CSSTransition> */}
    </>
  );
}

export default App;