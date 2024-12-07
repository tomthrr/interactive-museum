import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnimatedWaveButton({intensity}) {
  const effectRun = useRef(false);
  const tl = useRef();

  useEffect(() => {
    if (effectRun.current) return;
    effectRun.current = true;

    gsap.set('svg', {
      visibility: 'visible'
    })

    let select = s => document.querySelector(s),
      mainSVG = select('#mainSVG'),
      poly = select('#poly'),
      numPoints = 80


    function createLine() {
      for(let i = 0; i < numPoints; i++) {
        let p = poly.points.appendItem(mainSVG.createSVGPoint());
        p.x = 200 + (i * 5);
        p.y = 300;
      }
    }

    createLine();

    let y = 0;
    let tl = gsap.timeline();

    tl.to(poly.points, {
      y: `+=${intensity}`,
      stagger: {
        each: 0.009,
        repeat: -1,
        yoyo: true
      },
      ease: 'sine.inOut'
    }).seek(100)
  }, []);

  return (
    <svg id="mainSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs>
        <marker id="arrow" width="35" height="50" viewBox="0 0 35 50" markerWidth="35" markerHeight="40" refX="5"
                refY="25" orient="auto" markerUnits="userSpaceOnUse">
          <polyline id="arrowHead" points="37.2,51.1 2.2,26.1 37.2,1.1 "/>
        </marker>
      </defs>

      <polyline id="poly"/>
    </svg>
  );
}
