import React, { useEffect, useState, useRef } from 'react';
import { TimelineMax } from 'gsap/all';
import '../../assets/css/App.css'; /* dev only - remove before build */

const MatchIdV2 = props => {
  const [rootTimeline] = useState(new TimelineMax({ paused: true }));
  const [adTimeLine] = useState(new TimelineMax({ paused: true }));

  const { animation, homeTeamLogo, awayTeamLogo, ad_assets, homeTeamColor, awayTeamColor } = props;
  let targetsArray = useRef([]);
  let prevProps = useRef();
  let venueLocation = useRef();
  let versusBadge = useRef();
  let adAsset = useRef();
  let htLogo = useRef();
  let atLogo = useRef();
  let homeTeamName = useRef();
  let awayTeamName = useRef();

  const panelTimeline = targets => {
    var tl = new TimelineMax();
    tl.staggerFrom(targets, 0.3, { autoAlpha: 0, transformOrigin: '50% 50%', scale: 0 }, '-=0.5').staggerFrom(
      [homeTeamName, awayTeamName],
      0.5,
      { autoAlpha: 0 }
    );
    return tl;
  };

  const graphicsTimeLine = (homeLogo, versusBadge, awayLogo, venueLocation) => {
    let tl = new TimelineMax();

    tl.from(homeLogo, 0.3, { autoAlpha: 0, transformOrigin: '50% 50%', scale: 0 })
      .from(versusBadge, 0.3, { autoAlpha: 0 })
      .from(awayLogo, 0.3, { autoAlpha: 0, transformOrigin: '50% 50%', scale: 0 })
      .from(venueLocation, 0.3, { autoAlpha: 0, y: 100 });
    tl.duration(1.3);
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

  useEffect(() => {
    rootTimeline.add(panelTimeline(targetsArray.current));
    rootTimeline.add(graphicsTimeLine(htLogo, versusBadge, atLogo, venueLocation));
    adTimeLine.add(adAssets(adAsset));
    prevProps.current = animation;
  }, []);

  useEffect(() => {
    const defaultAnimation = animation.find(({ animation }) => animation === 'matchIdV2');
    const advertisingAnimation = animation.find(({ animation }) => animation === 'advertising');

    // play default
    if (prevProps.current.length === 0 && defaultAnimation !== undefined) {
      console.log(prevProps.current.length, defaultAnimation !== undefined);
      rootTimeline.play();
    }

    // reverse all
    if (defaultAnimation === undefined) {
      rootTimeline.reverse();
    }

    // play advertising
    if (advertisingAnimation !== undefined) {
      adTimeLine.play().delay(animation[1].delay);
    }

    // reverse the advertising
    if (advertisingAnimation === undefined) {
      adTimeLine.reverse();
    }

    prevProps.current = animation;
  }, [props]);

  return (
    <div>
      <svg width="1000" height="1000" viewBox="0 0 1000 900" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g strokeWidth="1">
          <rect
            id="0-0"
            ref={e => (targetsArray.current[0] = e)}
            stroke="none"
            opacity="1"
            fille={homeTeamColor}
            x="0"
            y="80"
            height="250"
            width="250"
          />
          <rect
            ref={e => (targetsArray.current[1] = e)}
            stroke="none"
            opacity="1"
            fille={homeTeamColor}
            x="250"
            y="80"
            height="250"
            width="250"
          />
          <rect
            ref={e => (targetsArray.current[2] = e)}
            stroke="none"
            opacity="1"
            fill={awayTeamColor}
            x="500"
            y="80"
            height="250"
            width="250"
          />
          <rect
            ref={e => (targetsArray.current[3] = e)}
            stroke="none"
            opacity="1"
            fill={awayTeamColor}
            x="750"
            y="80"
            height="250"
            width="250"
          />
          <rect
            ref={e => (targetsArray.current[4] = e)}
            stroke="none"
            opacity="1"
            fille={homeTeamColor}
            x="0"
            y="330"
            height="250"
            width="250"
          />
          <rect
            ref={e => (targetsArray.current[5] = e)}
            stroke="none"
            opacity="1"
            fille={homeTeamColor}
            x="250"
            y="330"
            height="250"
            width="250"
          />

          <rect
            ref={e => (targetsArray.current[6] = e)}
            id="0-7"
            stroke="none"
            opacity="1"
            fill={awayTeamColor}
            x="500"
            y="330"
            height="250"
            width="250"
          />
          <rect
            ref={e => (targetsArray.current[7] = e)}
            stroke="none"
            opacity="1"
            fill={awayTeamColor}
            x="750"
            y="330"
            height="250"
            width="250"
          />

          <rect
            ref={e => (targetsArray.current[8] = e)}
            stroke="none"
            opacity="1"
            fille={homeTeamColor}
            x="0"
            y="580"
            height="250"
            width="250"
          />
          <rect
            ref={e => (targetsArray.current[9] = e)}
            stroke="none"
            opacity="1"
            fille={homeTeamColor}
            x="250"
            y="580"
            height="250"
            width="250"
          />
          <rect
            ref={e => (targetsArray.current[10] = e)}
            stroke="none"
            opacity="1"
            fill={awayTeamColor}
            x="500"
            y="580"
            height="250"
            width="250"
          />

          <rect
            ref={e => (targetsArray.current[11] = e)}
            stroke="none"
            opacity="1"
            fill={awayTeamColor}
            x="750"
            y="580"
            height="250"
            width="250"
          />
        </g>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <text
            ref={e => (homeTeamName = e)}
            className="large-text bold upper-case"
            fill={awayTeamColor}
            x="7%"
            y="85%">
            Mounties Wanderers
          </text>
          <text
            ref={e => (awayTeamName = e)}
            className="large-text bold upper-case"
            fill={homeTeamColor}
            x="66%"
            y="85%">
            GHFA SPIRIT
          </text>
        </g>
        <svg id="venue-location" width="400px" height="60px" viewBox="0 0 400 60" x="300" y="20">
          <g ref={e => (venueLocation = e)} className="location-name" strokeWidth="1" fillRule="evenodd">
            <rect id="header" stroke="#070b1f" fill="#070b1f" x="0" y="0" height="60px" width="400px"></rect>
            <text className="large-text bold" fill="#fff" x="55" y="40">
              Lily Homes Stadium
            </text>
          </g>
        </svg>
        <svg ref={e => (versusBadge = e)} width="100" height="100" viewBox="0 0 50 50" x="450" y="400">
          <g id="circle" stroke="none" strokeWidth="2">
            <circle id="Oval" stroke="#fff" fill="#070b1f" cx="25" cy="25" r="23"></circle>
            <text className="medium-text bold uppercase" fill="#fff" width="50px" x="9" y="66%">
              VS
            </text>
          </g>
        </svg>
        <svg width="300" height="70" viewBox="0 0 300 70" x="345" y="826">
          <image
            ref={e => (adAsset = e)}
            href={ad_assets[0]}
            alt="awayTeam logo"
            className="addSmall"
            width="300"
            height="70"
          />
        </svg>

        <svg width="300" height="300" viewBox="0 0 300 300" x="8%" y="300">
          <image ref={e => (htLogo = e)} href={homeTeamLogo} alt="awayTeam logo" width="300" height="300" />
        </svg>

        <svg width="300" height="300" viewBox="0 0 300 300" x="60%" y="320">
          <image ref={e => (atLogo = e)} href={awayTeamLogo} alt="awayTeam logo" width="300" height="300" />
        </svg>
      </svg>
    </div>
  );
};

export default MatchIdV2;
