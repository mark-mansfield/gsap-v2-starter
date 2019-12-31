import React, { useEffect, useState, useRef } from 'react';
import { TimelineMax } from 'gsap/all';
import '../../assets/css/App.css'; /* dev only - remove before build */
const IntroV4 = props => {
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
  const [adTimeLine] = useState(new TimelineMax({ paused: true }));
  const { animation, homeTeamLogo, awayTeamLogo, ad_assets, gameNameText, messageText } = props;

  let prevProps = useRef();
  let venueLocation = useRef();
  let leftPanel = useRef();
  let rightPanel = useRef();
  let versusBadge = useRef();
  let adAsset = useRef();
  let htLogo = useRef();
  let atLogo = useRef();
  let homeTeamName = useRef();
  let awayTeamName = useRef();
  let gameId = useRef();
  let gameName = useRef();
  let messageBox = useRef();
  let introMessage = useRef();

  const panelTimeline = (left, right) => {
    let tl = new TimelineMax();
    tl.from(left, 0.4, {
      scale: 0,
      transformOrigin: '0% 100%',
      autoAlpha: 0
    })
      .from(right, 0.4, { scale: 0, transformOrigin: '100% 0%' }, '-=0.4')
      .staggerFrom([homeTeamName, awayTeamName], 0.5, { autoAlpha: 0 });

    return tl;
  };

  const graphicsTimeLine = (homeLogo, versusBadge, awayLogo, venueLocation) => {
    let tl = new TimelineMax();
    tl.from(homeLogo, 0.3, { autoAlpha: 0, transformOrigin: '50% 50%', scale: 0 })
      .from(versusBadge, 0.3, { autoAlpha: 0 })
      .from(awayLogo, 0.3, { autoAlpha: 0, transformOrigin: '50% 50%', scale: 0 })
      .from(venueLocation, 0.3, { autoAlpha: 0, y: 100 })
      .staggerFrom([gameId, gameName, messageBox, introMessage], 0.3, { autoAlpha: 0 });
    tl.duration(0.8);
    return tl;
  };

  const adAssets = adAsset => {
    let tl = new TimelineMax();
    tl.from(adAsset, 1, {
      autoAlpha: 0,
      y: -300
    });
    return tl;
  };

  // set up timelines on initial render
  useEffect(() => {
    rootTimeline.add(panelTimeline(leftPanel, rightPanel));
    rootTimeline.add(graphicsTimeLine(htLogo, versusBadge, atLogo, venueLocation));
    adTimeLine.add(adAssets(adAsset));
    prevProps.current = animation;
  }, []);

  // detect changes in props
  useEffect(() => {
    // sample - get the name property of each animation object - used in logic
    const defaultAnimation = animation.find(({ animation }) => animation === 'IntroV4');
    const advertisingAnimation = animation.find(({ animation }) => animation === 'advertising');

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

    // play default
    if (prevProps.current.length === 0 && defaultAnimation !== undefined) {
      rootTimeline.delay(animation[0].delay);
      rootTimeline.play();
    }

    // play advertising
    if (advertisingAnimation !== undefined) {
      adTimeLine.delay(animation[0].delay);
      adTimeLine.play();
    }

    // reverse all
    if (defaultAnimation === undefined) {
      adTimeLine.reverse();
      rootTimeline.reverse();
    }
    // reverse the advertising
    if (advertisingAnimation === undefined) {
      adTimeLine.reverse();
    }
    // update previous props now we have consumed them.
    prevProps.current = animation;
  }, [props]);

  return (
    <div>
      <svg width="1000" height="500" viewBox="0 0 1000 500" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g ref={e => (leftPanel = e)} id="left_panel" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect stroke="none" fill="black" x="0" y="60" width="500px" height="120px"></rect>
          <text ref={e => (homeTeamName = e)} className="large-text bold upper-case" fill="#e8e64e" x="100" y="134">
            Mounties Wanderers
          </text>
        </g>

        <g ref={e => (rightPanel = e)} id="right_panel" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect stroke="none" fill="#e8e64e" x="500" y="60" width="500px" height="120px"></rect>
          <text ref={e => (awayTeamName = e)} className="large-text bold upper-case" fill="#000" x="580" y="134">
            GHFA SPIRIT
          </text>
        </g>
        <g ref={e => (gameId = e)} id="game_id" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect stroke="none" fill="#070b1f" x="0" y="182" width="500px" height="80px"></rect>
          <text ref={e => (gameName = e)} className="large-text bold" fill="#ffffff" x="35" y="233">
            {gameNameText}
          </text>
        </g>
        <g ref={e => (messageBox = e)} id="game_id" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <rect stroke="none" fill="#070b1f" x="502" y="182" width="500px" height="80px"></rect>
          <text ref={e => (introMessage = e)} className="large-text bold" fill="#ffffff" x="600" y="233">
            {messageText}
          </text>
        </g>
        <svg id="venue_location" width="400px" height="60px" viewBox="0 0 400 60" x="300" y="0">
          <g ref={e => (venueLocation = e)} className="location-name" strokeWidth="1" fillRule="evenodd">
            <rect id="header" stroke="none" fill="#070b1f" x="0" y="0" height="60px" width="400px"></rect>
            <text className="large-text bold" fill="#fff" x="55" y="40">
              Lily Homes Stadium
            </text>
          </g>
        </svg>
        <svg ref={e => (versusBadge = e)} width="50" height="50" viewBox="0 0 50 50" x="475" y="95">
          <g id="circle" stroke="none" strokeWidth="2">
            <circle id="Oval" stroke="#fff" fill="#070b1f" cx="25" cy="25" r="23"></circle>
            <text className="medium-text bold uppercase" fill="#fff" width="50px" x="9" y="33">
              VS
            </text>
          </g>
        </svg>
        <svg width="300" height="70" viewBox="0 0 300 70" x="345" y="300">
          <image
            ref={e => (adAsset = e)}
            href={ad_assets[0]}
            alt="awayTeam logo"
            className="addSmall"
            width="300"
            height="70"
          />
        </svg>

        <svg width="80" height="80" viewBox="0 0 80 80" x="20" y="80">
          <image ref={e => (htLogo = e)} href={homeTeamLogo} alt="awayTeam logo" width="80" height="80" />
        </svg>

        <svg width="80" height="80" viewBox="0 0 80 80" x="900" y="80">
          <image ref={e => (atLogo = e)} href={awayTeamLogo} alt="awayTeam logo" width="80" height="80" />
        </svg>
      </svg>
    </div>
  );
};

export default IntroV4;
