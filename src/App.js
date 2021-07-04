import React, { useCallback, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './App.css';
import Personalization from './pages/Personalization';
import Workspace from './pages/Workspace'

function App() {
  const [curPage, setCurPage] = useState('PERSONALIZATION');
  const [nextPage, setNextPage] = useState(null);
  const [isAnimated, toggleAnimated] = useToggle();

  // animation props

  const AnimationProps = {
    in: isAnimated,
    timeout: 1000,
  }

  const fromProps = {
    ...AnimationProps,
    classNames: 'from',
    onEntered: finishPageSwitch
  }

  const toProps = {
    ...AnimationProps,
    classNames: 'to'
  }

  // page props

  const pageProps = {
    onPageSwitch: startPageSwitch
  };

  // page switch

  const startPageSwitch = useCallback((pageSwitchData) => {
    setNextPage(pageSwitchData.state);
    toggleAnimated();
  }, [toggleAnimated])

  function finishPageSwitch() {
    setCurPage(nextPage);
    setNextPage(null);
    toggleAnimated();
  }

  function renderSwitch(curPage){
    switch(curPage){
      case 'PERSONALIZATION':
        return <Personalization {...pageProps}/>;
      case 'WORKSPACE':
        return <Workspace {...pageProps}/>;
      default:
        return <></>;
    }
  }

  return (
    <>
    <CSSTransition {...fromProps}>
      {renderSwitch(curPage)}
    </CSSTransition>
    <CSSTransition {...toProps}>
      {renderSwitch(nextPage)}
    </CSSTransition>
    </>
  );
}

export default App;