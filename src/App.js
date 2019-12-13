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
  const default_animation_component = useRef();
  const prevProps = useRef();
  const { animation } = props;
  // set up timelines on initial render
  useEffect(() => {
    console.warn('setting up initial timeline');

    // update this for next props consumption
    prevProps.current = animation;
  }, []);

  // detect changes in props
  useEffect(() => {
    console.warn('props changed');

    // update previous props now we have consumed them
    prevProps.current = animation;
  }, [props]);

  return (
    <div className="App">
      <h1>App works!</h1>
    </div>
  );
};

export default App;
