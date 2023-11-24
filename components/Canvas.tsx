import Turrets from "@/components/Turrets";
import { CONTROL_AREA_HEIGHT } from "@/consts";

import { Stage, Layer, Rect } from "react-konva";
import { useStrictMode } from "react-konva";

export default function Canvas() {
  // make top 100px of canvas white background and the remaining part with a border
  useStrictMode(true);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={0}
          y={50}
          width={window.innerWidth}
          height={window.innerHeight - CONTROL_AREA_HEIGHT}
          fill='gray'
          stroke='black'
          strokeWidth={4}
        />
        <Turrets />
      </Layer>
    </Stage>
  );
}
