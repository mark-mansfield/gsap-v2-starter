import React, { useEffect, useState, useRef } from 'react';
import { TimelineMax } from 'gsap/all';
import './App.css';

const App = props => {
  // set up timelines on initial render
  useEffect(() => {
    console.warn('setting up initial timeline');
  }, []);

  // detect changes in props
  useEffect(() => {
    console.warn('props changed');
  }, [props]);

  return (
    <div className="App">
      <h1>App works!</h1>
    </div>
  );
};

export default App;
