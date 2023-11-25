import { LoonState } from "@/types";
import { Circle } from "react-konva";

export default function Loon({ loon }: { loon: LoonState }) {
  const { position_x, position_y } = loon;

  return (
    <Circle
      x={position_x}
      y={position_y}
      radius={10}
      fill='green'
      stroke='black'
      strokeWidth={4}
    />
  );
}
