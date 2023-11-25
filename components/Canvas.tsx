import { Stage, Layer, Rect, Text, useStrictMode } from "react-konva";

import Turrets from "@/components/Turrets";
import Loons from "./Loons";
import { CONTROL_AREA_HEIGHT, fakeData } from "@/consts";

export default function Canvas() {
  useStrictMode(true);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          x={window.innerWidth - 200}
          y={15}
          text='place a turret to start'
          fontSize={20}
        />
        {/* // make top 100px of canvas white background and the remaining part with a border */}
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
        <Loons responseData={fakeData} />
      </Layer>
    </Stage>
  );
}
