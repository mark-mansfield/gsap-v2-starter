import React, { useState, useEffect, useRef, Fragment } from 'react';
import { TimelineMax } from 'gsap/all';

const TeamStatV1 = props => {
  const [rootTimeline] = useState(new TimelineMax({ paused: true }));

  const [adTimeLine] = useState(new TimelineMax({ paused: true }));
  const [overLayBBox, setOverlayBBox] = useState({});
  const {
    animation,
    homeTeamLogo,
    awayTeamLogo,
    homeTeamColor,
    awayTeamColor,
    overlayTitle,
    score,
    htName,
    atName
  } = props;

  // props
  let prevProps = useRef();

  // virtual dom refs

  // let mainGroup,
  //   titleRect,
  //   overlayScore,
  //   overlayTitleText,
  //   overlayGamePeriod,
  //   svgOverlay,
  //   svgOverlayShadow,
  //   overlayShadow,
  //   homeTeamGroup,
  //   homeTeamName,
  //   htLogo,
  //   awayTeamGroup,
  //   awayTeamName,
  //   atLogo,
  //   teamStats,
  //   dataDividers,
  //   adAsset = useRef();

  let mainGroup = useRef();
  let titleRect = useRef();
  let overlayScore = useRef();
  let overlayTitleText = useRef();
  let overlayGamePeriod = useRef();
  let svgOverlay = useRef();
  let svgOverlayShadow = useRef();
  let homeTeamGroup = useRef();
  let homeTeamName = useRef();
  let htLogo = useRef();
  let overlayShadow = useRef();
  let awayTeamGroup = useRef();
  let awayTeamName = useRef();
  let atLogo = useRef();
  let teamStats = useRef();
  let dataDividers = useRef();
  let adAsset = useRef();

  const blueColor = '#002B5B';
  const logoSize = 60;

  const panelTimeline = () => {
    let tl = new TimelineMax();
    tl.from(titleRect, 0.3, { scaleX: 0, transformOrigin: '50% 50%', autoAlpha: 0 })
      .staggerFrom([overlayTitleText, overlayScore, overlayGamePeriod], 0.3, { autoAlpha: 0 }, 0.1)
      .from(mainGroup, 0.3, {
        scaleY: 0
      });
    return tl;
  };

  const linesTimeline = () => {
    let tl = new TimelineMax();
    tl.from(dataDividers, 0.3, { scaleX: 0, transformOrigin: '50% 50%' });
    return tl;
  };

  const teamStatsDataTimeLine = () => {
    let tl = new TimelineMax();
    tl.from(teamStats, 0.5, { autoAlpha: 0 });
    return tl;
  };

  const graphicsTimeLine = () => {
    let tl = new TimelineMax();
    tl.staggerFrom([homeTeamGroup, htLogo, homeTeamName, awayTeamGroup, atLogo, awayTeamName], 0.3, { autoAlpha: 0 });
    return tl;
  };

  const overlayShadowTimeline = () => {
    let tl = new TimelineMax();
    tl.from(svgOverlayShadow, 0.3, { autoAlpha: 0 });
    return tl;
  };

  // initial render
  useEffect(() => {
    rootTimeline.add(panelTimeline());
    rootTimeline.add(linesTimeline(), '-=0.3');
    rootTimeline.add(teamStatsDataTimeLine());
    rootTimeline.add(graphicsTimeLine(), '-=0.3');
    rootTimeline.add(overlayShadowTimeline(), '-=0.3');
    prevProps.current = animation;

    // getoverlay dimensions
    setOverlayBBox({
      width: svgOverlay.current.width.baseVal.value,
      height: svgOverlay.current.height.baseVal.value - 80
    });
  }, []);

  // updates
  useEffect(() => {
    const defaultAnimation = animation.find(({ animation }) => animation === 'TeamStatV1');
    console.log(defaultAnimation);
    // const advertisingAnimation = animation.find(({ animation }) => animation === 'advertising');

    // play default
    if (prevProps.current.length === 0 && defaultAnimation !== undefined) {
      rootTimeline.delay(animation[0].delay);
      rootTimeline.play().timeScale(1);
    }

    // reverse all
    if (defaultAnimation === undefined) {
      /*  orig second condition logic animation.length === 1 */
      adTimeLine.reverse();
      rootTimeline.reverse();
    }

    prevProps.current = animation;
  }, [props]);

  const adAssets = adAsset => {
    let tl = new TimelineMax();
    return tl;
  };

  const renderTitleLayout = () => {
    return (
      <Fragment>
        <rect id="titleRectangle" x="0" y="0" width="1300" height="80" fill={blueColor} />
        <text ref={e => (overlayTitleText = e)} className="large-text bold upper-case" fill="#fff" x="6%" y="50">
          {overlayTitle}
        </text>
        <text ref={e => (overlayScore = e)} className="large-text bold upper-case" fill="#fff" x="48%" y="50">
          {score}
        </text>
        <text ref={e => (overlayGamePeriod = e)} className="large-text bold upper-case" fill="#fff" x="82%" y="50">
          full time
        </text>
      </Fragment>
    );
  };

  const renderHomeTeamGraphics = () => {
    return (
      <Fragment>
        <image
          ref={e => (htLogo = e)}
          href={homeTeamLogo}
          alt="homeTeam logo"
          x="11"
          y="495"
          width={logoSize}
          height={logoSize}
        />
        <text
          ref={e => (homeTeamName = e)}
          x="-27%"
          y="4.5%"
          transform="rotate(-90 45 25)"
          id="homeTeamNameBox"
          className="medium-text bold upper-case"
          fill={awayTeamColor}>
          {htName}
        </text>
        <rect id="blackLine" width="6.15%" height="1" fill={homeTeamColor} x="93.7%" y="170" />
      </Fragment>
    );
  };

  const renderAwayTeamGraphics = () => {
    return (
      <Fragment>
        <image
          ref={e => (atLogo = e)}
          href={awayTeamLogo}
          alt="awayTeam logo"
          x="1230"
          y="95"
          width={logoSize}
          height={logoSize}
        />
        <text
          ref={e => (awayTeamName = e)}
          transform="rotate(-90 45 25)"
          className="medium-text bold upper-case"
          x="-28%"
          y="1245"
          fill="#000000">
          {atName}
        </text>
        <rect id="yellowLine" width="6.15%" height="1" fill={awayTeamColor} x="0" y="480" />
      </Fragment>
    );
  };

  const renderLines = () => {
    return (
      <Fragment>
        <line x1="240" y1="150" x2="1060" y2="150" strokeWidth="1" stroke="black" />
        <line x1="240" y1="220" x2="1060" y2="220" strokeWidth="1" stroke="black" />
        <line x1="240" y1="290" x2="1060" y2="290" strokeWidth="1" stroke="black" />
        <line x1="240" y1="360" x2="1060" y2="360" strokeWidth="1" stroke="black" />
        <line x1="240" y1="430" x2="1060" y2="430" strokeWidth="1" stroke="black" />
        <line x1="240" y1="500" x2="1060" y2="500" strokeWidth="1" stroke="black" />
      </Fragment>
    );
  };

  const renderTeamData = () => {
    return (
      <Fragment>
        <text x="100" y="80" textAnchor="middle">
          <tspan className="medium-text upper-case " fontWeight="bold" x="12.3%" dy="45">
            10
          </tspan>
          <tspan className="medium-text upper-case " fontWeight="bold" x="12.3%" dy="70">
            5
          </tspan>
          <tspan className="medium-text upper-case " fontWeight="bold" x="12.3%" dy="70">
            2
          </tspan>
          <tspan className="medium-text upper-case " fontWeight="bold" x="12.3%" dy="70">
            6
          </tspan>
          <tspan className="medium-text upper-case " fontWeight="bold" x="12.3%" dy="70">
            1
          </tspan>
          <tspan className="medium-text upper-case " fontWeight="bold" x="12.3%" dy="65">
            0
          </tspan>
          <tspan className="medium-text upper-case " fontWeight="bold" x="12.3%" dy="70">
            1
          </tspan>
        </text>
        <text x="200" y="80" textAnchor="middle">
          <tspan className="medium-text upper-case bold" x="50%" dy="45">
            TOTAL SHOTS
          </tspan>
          <tspan className="medium-text upper-case bold" x="50%" dy="70">
            SHOTS ON TARGET
          </tspan>
          <tspan className="medium-text upper-case bold" x="50%" dy="70">
            corners
          </tspan>
          <tspan className="medium-text upper-case bold" x="50%" dy="70">
            fouls
          </tspan>
          <tspan className="medium-text upper-case bold" x="50%" dy="70">
            yellow cards
          </tspan>
          <tspan className="medium-text upper-case bold" x="50%" dy="70">
            red cards
          </tspan>
          <tspan className="medium-text upper-case bold" x="50%" dy="70">
            off sides
          </tspan>
        </text>
        <text x="300" y="80" textAnchor="middle">
          <tspan className="medium-text upper-case bold" x="87.45%" dy="45">
            4
          </tspan>
          <tspan className="medium-text upper-case bold" x="87.45%" dy="70">
            4
          </tspan>
          <tspan className="medium-text upper-case bold" x="87.45%" dy="70">
            6
          </tspan>
          <tspan className="medium-text upper-case bold" x="87.45%" dy="70">
            4
          </tspan>
          <tspan className="medium-text upper-case bold" x="87.45%" dy="70">
            1
          </tspan>
          <tspan className="medium-text upper-case bold" x="87.45%" dy="70">
            0
          </tspan>
          <tspan className="medium-text upper-case bold" x="87.45%" dy="70">
            8
          </tspan>
        </text>
      </Fragment>
    );
  };

  const renderTeamStatPanels = () => {
    return (
      <Fragment>
        <rect x="6.15%" y="80" width="12.3%" height="490" fill="white" opacity="0.95" />
        <rect x="18.3%" y="80" width="63.1%" height="490" fill="#ececec" opacity="0.95" />
        <rect x="81.4%" y="80" width="12.3%" height="490" fill="white" opacity="0.95" />
        <rect x="0" y="80" width="6.15%" height="400" fill={homeTeamColor} />
        <rect x="0" y="480" width="80" height="90" fill={homeTeamColor} />
        <rect x="93.7%" y="80" width="80" height="90" fill={awayTeamColor} />
        <rect x="93.7%" y="170" width="6.15%" height="400" fill={awayTeamColor} />
      </Fragment>
    );
  };

  return (
    <div>
      <div className="svg-container">
        <svg id="teamStat" ref={svgOverlay} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1300 650">
          <g ref={e => (titleRect = e)}>{renderTitleLayout()}</g>
          <g ref={e => (mainGroup = e)}>{renderTeamStatPanels()}</g>
          <g id="homeTeamgroup" ref={e => (homeTeamGroup = e)}>
            {renderHomeTeamGraphics()}
          </g>
          <g id="awayTeamGroup" ref={e => (awayTeamGroup = e)}>
            {renderAwayTeamGraphics()}
          </g>
          <g id="columnGroup" ref={e => (teamStats = e)}>
            {renderTeamData()}
          </g>
          <g ref={e => (dataDividers = e)}>{renderLines()}</g>
        </svg>
      </div>
      <div
        className="container-background"
        style={{ width: overLayBBox.width, height: overLayBBox.height }}
        ref={ref => (svgOverlayShadow = ref)}></div>
    </div>
  );
};

export default TeamStatV1;
