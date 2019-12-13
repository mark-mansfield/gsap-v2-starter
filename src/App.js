import React, { useEffect, useState, useRef } from 'react';
import { TimelineMax } from 'gsap/all';
import './App.css';

const App = props => {
  /**
   * * TODO
   * * 1. set up animating state
   * * 2. set up refs for props objects ( ie each animation object) to be used in login
   * * 3. set up refs for svg in the DOM
   * * set up timelines in state
   * * set up animation definitions
   * * add in logic
   * * write dom tests
   */

  const [rootTimeline] = useState(new TimelineMax({ paused: true }));

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
