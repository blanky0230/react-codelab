import * as React from "react";
import {useSpring, animated, config} from 'react-spring';

export type position = [number, number];

export interface CellType {
  pos: position;
  alive: boolean;
}

export default function Cell({
  handler,
  alive,
}: {
  alive: boolean;
  handler: () => void;
}): React.ReactElement {
  const anim = useSpring({
    backgroundColor: alive ? 'hotpink' : 'black',
    config: config.stiff,

  });
  return (
      <animated.div style={anim} onClick={handler}></animated.div>
  );
}
