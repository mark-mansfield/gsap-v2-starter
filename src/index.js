import React, { useState } from 'react';
import { render } from 'react-dom';
import Scoreboard from './App';
// import ScoreBoard from './ScoreBoard-class;
// import ScoreBoard from './ScoreBoard-with-hooks

// Simulate showing and hiding graphics
const App = () => {
  const [animation, setAnimation] = useState([]);

  // simulate a change in state, start the animation
  const toggleDefaultAnimation = () => {
    if (animation.length >= 1) {
      setAnimation([]);
    }
    if (animation.length === 0) {
      let tmpObj = [{ animation: 'defaultAnimation', delay: 0 }];
      setAnimation(tmpObj);
    }
  };

  // simulate a change in state
  const toggleTeamStat = () => {
    if (animation.length === 0) {
      return;
    }
    if (animation.find(({ animation }) => animation === 'teamStat') === undefined) {
      setAnimation([...animation, { animation: 'teamStat', delay: 0.6 }]);
    } else {
      let tmpArr = animation[0];
      setAnimation([tmpArr]);
    }
  };

  return (
    <div className="app" id="app">
      <Scoreboard animation={animation} awayTeamColor="white" homeTeamColor="#db251e" />
      <div className="toggle-buttons">
        <button onClick={toggleDefaultAnimation}>toggle default component</button>
        <button onClick={toggleTeamStat}>toggle teamStat component</button>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
