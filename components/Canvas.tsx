import Turrets from "@/components/Turrets";

import { Stage, Layer } from "react-konva";

export default function Canvas() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Turrets />
      </Layer>
    </Stage>
  );
}
