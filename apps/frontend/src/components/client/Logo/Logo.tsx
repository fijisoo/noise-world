"use client";

import { useInvalidate, Shape, Anchor } from "react-zdog";
import { useEffect, useRef, useState } from "react";

const topPath = [
  { move: { x: 0, y: 14.5 } },
  { line: { x: -5.3, y: 9.2 } },
  { line: { x: 0, y: 0 } },
  { line: { x: 5.3, y: 9.2 } },
  { line: { x: 0, y: 14.5 } },
];
const leftPath = [
  { move: { x: 1, y: 14.3 } },
  { line: { x: 8.8, y: 1 } },
  { line: { x: 14.1, y: 6.3 } },
  { line: { x: 14.1, y: 14.3 } },
  { line: { x: 1, y: 14.3 } },
];
const rightPath = [
  { move: { x: 6.3, y: 1 } },
  { line: { x: 1, y: 6.3 } },
  { line: { x: 1, y: 14.3 } },
  { line: { x: 14.1, y: 14.3 } },
  { line: { x: 6.3, y: 1 } },
];

export const Logo = () => {
  const topRef = useRef<any>(undefined);
  const leftRef = useRef<any>(undefined);
  const rightRef = useRef<any>(undefined);
  const boxRef = useRef<any>(undefined);

  const invalidate = useInvalidate();

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (
        topRef.current &&
        boxRef.current &&
        leftRef.current &&
        rightRef.current &&
        isHovered
      ) {
        leftRef.current.translate.x = -16.3; //-14.3
        rightRef.current.translate.x = 2;
        invalidate(); // Manually trigger a render
      }
    };

    const intervalId = setInterval(animate, 10); // only renders the scene graph one a second instead of 60 times per second

    return () => intervalId && clearInterval(intervalId);
  }, [invalidate, isHovered]);

  return (
    <Anchor
      ref={boxRef}
      width={55}
      height={55}
      stroke={false}
      color="transparent"
      onPointerEnter={() => {
        setIsHovered(true);
      }}
    >
      <Shape
        path={topPath}
        ref={topRef}
        closed
        translate={{ y: -13.5 }}
        stroke={2}
        fill={isHovered}
        color="#000"
      />
      <Shape
        path={leftPath}
        ref={leftRef}
        translate={{ x: -14.3 }}
        closed
        stroke={2}
        fill
        color="#000"
      />
      <Shape
        path={rightPath}
        ref={rightRef}
        fill
        closed
        stroke={2}
        color="#000"
      />
    </Anchor>
  );
};
