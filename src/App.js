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

  const [isAnimating, setIsAnimating] = useState(false);
  const [rootTimeline] = useState(new TimelineMax({ paused: true }));

  const { animation } = props;

  let prevProps = useRef();
  let defaultSvgRef = useRef();

  // set up timelines on initial render
  useEffect(() => {
    console.warn('setting up initial timeline');
    //  sample timline
    rootTimeline.from(defaultSvgRef, 0.5, {
      scale: 0,
      transformOrigin: '50% 50%',
      autoAlpha: 0
    });

    // sample - update this for next props consumption
    prevProps.current = animation;
  }, []);

  // detect changes in props
  useEffect(() => {
    console.warn('props changed');

    // sample - get the name property of each animation object - used in logic
    const defaultAnimation = animation.find(({ animation }) => animation === 'defaultAnimation');

    /**
     * * gracefully allow for rapid props updates useing a time delay
     * * this means we let whatever is currently animating to finish first
     */

    if (isAnimating) {
      console.log('PAUSING *******************');
      setTimeout(() => {
        console.log('PAUSING COMPLETE');
      }, 1500);
    }

    // sample - Animation control Logic
    if (prevProps.current.length === 0 && defaultAnimation !== undefined) {
      /*  orig second condition logic animation.length === 1 */
      rootTimeline.delay(animation[0].delay);
      rootTimeline.play();
    }

    // sample - update previous props now we have consumed them.
    prevProps.current = animation;
  }, [props]);

  return (
    <div className="App">
      <svg width="110px" height="110px" viewBox="0 0 110 110" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g ref={e => (defaultSvgRef = e)} id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle id="Oval" fill="#CCCCCC" cx="55" cy="55" r="55"></circle>
        </g>
      </svg>
    </div>
  );
};

export default App;
