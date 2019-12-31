import React, { useState } from 'react';
import { render } from 'react-dom';

import IntroV1 from './components/intro/Intro-fadeIn-scaleX';
import IntroV2 from './components/intro/Intro-fadeIn-tiles';
import IntroV3 from './components/intro/Intro-fadeIn-scaleY';
import IntroV4 from './components/intro/Intro-fadeIn-scaleXY';
import MatchIdV1 from './components/matchId/MatchId-fadeIn-scaleX';
import MatchIdV2 from './components/matchId/MatchId-fadeIn-tiles';
import MatchIdV3 from './components/matchId/MatchId-fadeIn-scaleY';
import MatchIdV4 from './components/matchId/MatchId-fadeIn-scaleXY';
import PenaltiesV1 from './components/penalties/penalties.basic';
import TeamStatV1 from './components/teamStat/teamStatV1';
import homeTeam from './assets/images/homeTeam.png';
import awayTeam from './assets/images/awayTeam.png';
import addSmall from './assets/images/ad-300X70.png';

const App = () => {
  const [animation, setAnimation] = useState([]);
  const [homeTeamPenaltyScore, setHomeTeamPenaltyScore] = useState(0);
  const [awayTeamPenaltyScore, setAwayTeamPenaltyScore] = useState(0);

  // launch any overlay except penalties
  const launchOverLay = componentName => {
    const animationExists = animation.find(({ animation }) => (animation === componentName) !== undefined);
    if (animationExists) {
      setAnimation([]);
    }
    if (!animationExists) {
      let tmpObj = [{ animation: componentName, delay: 0 }];
      setAnimation(tmpObj);
      setTimeout(() => {
        setAnimation([]);
      }, 6000);
    }
  };

  const toggelPenalties = componentName => {
    const animationExists = animation.find(({ animation }) => animation === componentName) !== undefined;
    if (animationExists) {
      setAnimation([]);
    }
    if (!animationExists) {
      let tmpObj = [{ animation: componentName, delay: 0 }];
      setAnimation(tmpObj);
    }
  };

  // update home team shootout score
  const updateHomeTeamShootoutScore = () => {
    if (animation.find(({ animation }) => animation === 'PenaltiesV1') !== undefined) {
      let score = homeTeamPenaltyScore;
      setHomeTeamPenaltyScore((score += 1));
    }
  };

  // update away team shootout score
  const updateAwayTeamShootoutScore = () => {
    if (animation.find(({ animation }) => animation === 'PenaltiesV1') !== undefined) {
      let score = awayTeamPenaltyScore;
      setAwayTeamPenaltyScore((score += 1));
    }
  };

  return (
    <div className="App" id="app">
      <div className="left-panel" style={{ paddingLeft: '40px', paddingRight: '40px' }}>
        <div className="wrapper">
          <h1>Football Theme</h1>

          <h2>Match Id Overlay ideas</h2>
          <ul>
            <li>
              <button
                onClick={() => launchOverLay('matchIdV1')}
                disabled={animation.find(({ animation }) => animation === 'matchIdV1') !== undefined}>
                Fade in Slide out
              </button>
            </li>
            <li>
              <button
                onClick={() => launchOverLay('matchIdV2')}
                disabled={animation.find(({ animation }) => animation === 'matchIdV2') !== undefined}>
                Scale, Fade, in w Tiles
              </button>
            </li>
            <li>
              <button
                onClick={() => launchOverLay('matchIdV3')}
                disabled={animation.find(({ animation }) => animation === 'matchIdV3') !== undefined}>
                Fade in Slide up
              </button>
            </li>
            <li>
              <button
                onClick={() => launchOverLay('matchIdV4')}
                disabled={animation.find(({ animation }) => animation === 'matchIdV4') !== undefined}>
                Fade, Scale in diagonally
              </button>
            </li>
          </ul>

          <h2>Intro Overlay ideas</h2>
          <ul>
            <li>
              <button
                onClick={() => launchOverLay('IntroV1')}
                disabled={animation.find(({ animation }) => animation === 'IntroV1') !== undefined}>
                Fade in Slide out
              </button>
            </li>
            <li>
              <button
                onClick={() => launchOverLay('IntroV2')}
                disabled={animation.find(({ animation }) => animation === 'IntroV2') !== undefined}>
                Scale, Fade, in w Tiles
              </button>
            </li>
            <li>
              <button
                onClick={() => launchOverLay('IntroV3')}
                disabled={animation.find(({ animation }) => animation === 'IntroV3') !== undefined}>
                Fade in Slide up
              </button>
            </li>
            <li>
              <button
                onClick={() => launchOverLay('IntroV4')}
                disabled={animation.find(({ animation }) => animation === 'IntroV4') !== undefined}>
                Fade, Scale in diagonally
              </button>
            </li>
          </ul>
          <h2>Penalties Overlay ideas</h2>
          <ul>
            <li>
              <button
                onClick={() => toggelPenalties('PenaltiesV1')}
                disabled={animation.find(({ animation }) => animation === 'PenaltiesV1') !== undefined}>
                Basic
              </button>
              <p>
                Note: The outbound animation is disabled in this example so we can simulate penalty shootout data
                updates for the <button onClick={() => updateHomeTeamShootoutScore()}>home team</button>and the{' '}
                <button onClick={() => updateAwayTeamShootoutScore()}>away team</button>
              </p>
              <p> Note: The outbound animation is, by deafault, a reversal of the inbound animation.</p>
            </li>
          </ul>

          <h2>TeamStat Overlay</h2>
          <ul>
            <li>
              <button
                onClick={() => launchOverLay('TeamStatV1')}
                disabled={animation.find(({ animation }) => animation === 'TeamStatV1') !== undefined}>
                Basic
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-panel">
        <div
          className={
            animation.find(({ animation }) => animation === 'matchIdV1') !== undefined
              ? 'overlay-version1 '
              : 'overlay-version1 '
          }>
          <MatchIdV1
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
          />
        </div>

        <div
          className={
            animation.find(({ animation }) => animation === 'matchIdV2') !== undefined
              ? 'overlay-version2 '
              : 'overlay-version2 '
          }>
          <MatchIdV2
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
            previewMode={true}
          />
        </div>
        <div
          className={
            animation.find(({ animation }) => animation === 'matchIdV3') !== undefined
              ? 'overlay-version3 '
              : 'overlay-version3 '
          }>
          <MatchIdV3
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
            previewMode={true}
          />
        </div>
        <div
          className={
            animation.find(({ animation }) => animation === 'matchIdV4') !== undefined
              ? 'overlay-version4 '
              : 'overlay-version4 '
          }>
          <MatchIdV4
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
            previewMode={true}
          />
        </div>

        <div
          className={
            animation.find(({ animation }) => animation === 'IntroV1') !== undefined
              ? 'overlay-version5 '
              : 'overlay-version5 '
          }>
          <IntroV1
            messageText="Thanks for watching!"
            gameNameText="NPL Finals - New South Wales"
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
          />
        </div>

        <div
          className={
            animation.find(({ animation }) => animation === 'IntroV1') !== undefined
              ? 'overlay-version6 '
              : 'overlay-version6 '
          }>
          <IntroV2
            messageText="Thanks for watching!"
            gameNameText="NPL Finals - New South Wales"
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
          />
        </div>
        <div
          className={
            animation.find(({ animation }) => animation === 'IntroV3') !== undefined
              ? 'overlay-version7 '
              : 'overlay-version7 '
          }>
          <IntroV3
            messageText="Thanks for watching!"
            gameNameText="NPL Finals - New South Wales"
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
          />
        </div>
        <div
          className={
            animation.find(({ animation }) => animation === 'IntroV3') !== undefined
              ? 'overlay-version8 '
              : 'overlay-version8 '
          }>
          <IntroV4
            messageText="Thanks for watching!"
            gameNameText="NPL Finals - New South Wales"
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
          />
        </div>
        <div
          className={
            animation.find(({ animation }) => animation === 'IntroV3') !== undefined
              ? 'overlay-version9 '
              : 'overlay-version9 '
          }>
          <PenaltiesV1
            htShootoutScore={homeTeamPenaltyScore}
            atShootoutScore={awayTeamPenaltyScore}
            score="2-1"
            overlayTitle="Penalty Shootout"
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
          />
        </div>
        <div
          className={
            animation.find(({ animation }) => animation === 'TeamStat') !== undefined
              ? 'overlay-version10 '
              : 'overlay-version10 '
          }>
          <TeamStatV1
            score="2-1"
            htName="Mounties Wanderers"
            atName="ghfa spirit"
            overlayTitle="team stats"
            homeTeamColor={'#000000'}
            awayTeamColor={'#e8e64e'}
            animation={animation}
            homeTeamLogo={homeTeam}
            awayTeamLogo={awayTeam}
            ad_assets={[addSmall]}
          />
        </div>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
