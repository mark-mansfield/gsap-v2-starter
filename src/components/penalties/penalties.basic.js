import React, { useEffect, useState, useRef } from 'react';
import { TimelineMax } from 'gsap/all';
import '../../assets/css/App.css'; /* dev only - remove before build */

const PenaltiesV1 = props => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [rootTimeline] = useState(new TimelineMax({ paused: true }));
  const [adTimeLine] = useState(new TimelineMax({ paused: true }));
  const {
    animation,
    homeTeamLogo,
    awayTeamLogo,
    homeTeamColor,
    awayTeamColor,
    ad_assets,
    homeTeamPenalties,
    awayTeamPenalties,
    htShootoutScore,
    atShootoutScore,
    overlayTitle,
    score
  } = props;

  let homeTeamPenaltyCounter = 0;
  let awayTeamPenaltyCounter = 0;

  const penaltiesArray = [1, 2, 3, 4, 5];
  let prevProps = useRef();
  let adAsset = useRef();

  let titleText = useRef();
  let titleRect = useRef();

  let homeTeamRect = useRef();
  let homeTeamName = useRef();
  let homeTeamLogoRect = useRef();

  let awayTeamRect = useRef();
  let awayTeamName = useRef();
  let awayTeamLogoRect = useRef();

  let htLogo = useRef();
  let atLogo = useRef();

  let scoreRect = useRef();
  let scoreText = useRef();
  let penaltyCirclesRect = useRef();
  let homeTeamPenaltiesArr = useRef([]);
  let homeTeamPenaltyCount = useRef();
  let awayTeamPenaltiesArr = useRef([]);

  const cellWidth = 1300 / 10;
  const blueColor = '#002B5B';
  const logoSize = 50;

  const panelTimeline = () => {
    let tl = new TimelineMax();
    tl.staggerFrom([scoreRect, scoreText], 0.3, { autoAlpha: 0, scaleX: 0, transformOrigin: '50% 50%' }, 0.3)
      .from(homeTeamRect, 0.3, { autoAlpha: 0, scaleX: 0, transformOrigin: '100% 50%' }, 0.3)
      .from(awayTeamRect, 0.3, { autoAlpha: 0, scaleX: 0, transformOrigin: '0% 50%' }, 0.3)
      .from(homeTeamName, 0.3, { autoAlpha: 0, x: 50 })
      .from(awayTeamName, 0.3, { autoAlpha: 0, x: -50 })
      .staggerFrom([titleRect, titleText], 0.5, { autoAlpha: 0 })

      .add(penaltiesTimeLine(homeTeamPenaltiesArr.current, awayTeamPenaltiesArr.current))
      .from(homeTeamLogoRect, 0.4, { autoAlpha: 0, scaleX: 0, transformOrigin: '100% 50%' }, '-=0.2')
      .from(awayTeamLogoRect, 0.4, { autoAlpha: 0, scaleX: 0, transformOrigin: '0% 50%' }, '-=0.2');
    return tl;
  };

  const graphicsTimeLine = () => {
    let tl = new TimelineMax();
    tl.staggerFrom([htLogo, atLogo], 0.3, { autoAlpha: 0 });
    return tl;
  };

  const penaltiesTimeLine = (homeTeamPenalties, awayTeamPenalties) => {
    let tl = new TimelineMax();
    tl.from(penaltyCirclesRect, 0.2, { autoAlpha: 0, scaleX: 0, transformOrigin: '50% 50%' });
    tl.staggerFrom(homeTeamPenalties, 0.1, { autoAlpha: 0, x: 400, scale: 0, transformOrigin: '50% 50%' }, 0.2);
    tl.staggerFrom(awayTeamPenalties, 0.1, { autoAlpha: 0, x: -400, scale: 0, transformOrigin: '50% 50%' }, 0.2);
    return tl;
  };

  const updatePenaltyGraphic = (timeline, elementRef) => {
    timeline.to(elementRef, 0.1, { fill: '#ff0000' });
  };

  const adAssets = adAsset => {
    let tl = new TimelineMax();

    return tl;
  };

  // set up timelines on initial render
  useEffect(() => {
    // wait for refs in the dom to be painted before adding timeline
    setTimeout(() => {
      rootTimeline.add(panelTimeline(), 'panelTimeline');
      rootTimeline.add(graphicsTimeLine(), 'graphicsTimeline');
    });

    adTimeLine.add(adAssets(adAsset));

    prevProps.current = animation;
    prevProps.current.htShootoutScore = htShootoutScore;
    prevProps.current.atShootoutScore = atShootoutScore;

    // remove empty first element
    // this element is added during initial when we add refs in the dom programatically
    homeTeamPenaltiesArr.current = homeTeamPenaltiesArr.current.slice(1);
    awayTeamPenaltiesArr.current = awayTeamPenaltiesArr.current.slice(1);
  }, []);

  // detect changes in props
  useEffect(() => {
    // get the name property of each animation object - used in logic
    const defaultAnimation = animation.find(({ animation }) => animation === 'PenaltiesV1');
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
      rootTimeline.play('panelTimeline').timeScale(1);
    }

    // update home team shootout score
    if (prevProps.current.htShootoutScore < htShootoutScore && htShootoutScore <= 5) {
      console.log(`home team shoot out score updated to: ${htShootoutScore}`);
      updatePenaltyGraphic(rootTimeline, homeTeamPenaltiesArr.current[htShootoutScore]);
    }

    // update home team shootout score
    if (prevProps.current.atShootoutScore < atShootoutScore && atShootoutScore <= 5) {
      console.log(`away team shoot out score updated to: ${atShootoutScore}`);
      updatePenaltyGraphic(rootTimeline, awayTeamPenaltiesArr.current[atShootoutScore]);
    }

    // play advertising
    if (advertisingAnimation !== undefined) {
      adTimeLine.delay(animation[0].delay);
      adTimeLine.play();
    }

    // reverse all faster
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
    prevProps.current.htShootoutScore = htShootoutScore;
    prevProps.current.atShootoutScore = atShootoutScore;
  }, [props]);

  return (
    <div>
      <svg
        width="1230"
        height="500"
        viewBox={'0 0 ' + 1230 + ' ' + '500'}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <rect ref={e => (titleRect = e)} width="390" height="80" x="425" y="0" fill={blueColor} />
        <text ref={e => (titleText = e)} className="large-text bold upper-case" fill="#fff" x="470" y="50">
          {overlayTitle}
        </text>
        <g ref={e => (homeTeamLogoRect = e)}>
          <rect width="130" height="80" x="0" y="80" fill="black" />
          <rect width="1" height="80" x="129" y="80" fill="white" />
        </g>

        <rect ref={e => (homeTeamRect = e)} width="420" height="80" x="130" y="80" fill={homeTeamColor} />
        <text ref={e => (homeTeamName = e)} className="large-text bold upper-case" fill="#e8e64e" x="160" y="134">
          Mounties Wanderers
        </text>
        <rect ref={e => (scoreRect = e)} width="130" height="80" x="550" y="80" fill="blue" />
        <text ref={e => (scoreText = e)} className="large-text bold upper-case" fill="#fff" x="585" y="134">
          {score}
        </text>
        <rect ref={e => (awayTeamRect = e)} width="420" height="80" x="680" y="80" fill={awayTeamColor} />
        <text ref={e => (awayTeamName = e)} className="large-text bold upper-case" fill="#000" x="800" y="134">
          GHFA SPIRIT
        </text>
        <g ref={e => (awayTeamLogoRect = e)}>
          <rect width="130" height="80" x="1100" y="80" fill={awayTeamColor}></rect>
          <rect width="1" height="80" x="1100" y="80" fill="black" />
        </g>
        <image
          ref={e => (atLogo = e)}
          href={awayTeamLogo}
          alt="awayTeam logo"
          x="1145"
          y="95"
          width={logoSize}
          height={logoSize}
        />

        <image
          ref={e => (htLogo = e)}
          href={homeTeamLogo}
          alt="homeTeam logo"
          x="35"
          y="95"
          width={logoSize}
          height={logoSize}
        />
        <rect ref={e => (penaltyCirclesRect = e)} width="810" height="70" x="210" y="162" fill={blueColor}></rect>
        {penaltiesArray.map(idx => {
          if (idx <= homeTeamPenaltyCount && idx > 0) {
            return (
              <circle
                key={'htPenalty' + idx}
                ref={e => (homeTeamPenaltiesArr.current[idx] = e)}
                cx={idx * 45 + 210}
                cy="198"
                r="12"
                stroke="#ecebeb"
                fill="red"
              />
            );
          } else {
            return (
              <circle
                key={'htPenalty' + idx}
                ref={e => (homeTeamPenaltiesArr.current[idx] = e)}
                cx={idx * 45 + 210}
                cy="198"
                r="12"
                stroke="#ecebeb"
              />
            );
          }
        })}

        {penaltiesArray.map(idx => {
          if (idx <= awayTeamPenalties && idx > 0) {
            return (
              <circle
                key={'atPenalty' + idx}
                ref={e => (awayTeamPenaltiesArr.current[idx] = e)}
                cx={idx * 45 + 750}
                cy="198"
                r="12"
                stroke="#ecebeb"
                fill="red"
              />
            );
          } else {
            return (
              <circle
                key={'atPenalty' + idx}
                ref={e => (awayTeamPenaltiesArr.current[idx] = e)}
                cx={idx * 45 + 750}
                cy="198"
                r="12"
                stroke="#ecebeb"
              />
            );
          }
        })}
      </svg>
    </div>
  );
};

export default PenaltiesV1;
