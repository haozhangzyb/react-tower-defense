import { TurretState } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Text } from "react-konva";

interface TurretProps {
  turret: TurretState;
  setTurrets: Dispatch<SetStateAction<TurretState[]>>;
}

export default function Turret({ turret, setTurrets }: TurretProps) {
  const { x, y, isDragging, id } = turret;

  return (
    <Text
      text={`Turret ${id}`}
      x={x}
      y={y}
      draggable
      fill={isDragging ? "green" : "black"}
      onDragStart={() => {
        setTurrets((prev) =>
          prev.map((turret) =>
            turret.id === id ? { ...turret, isDragging: true } : turret
          )
        );
      }}
      onDragEnd={(e) => {
        setTurrets((prev) =>
          prev.map((turret) =>
            turret.id === id
              ? {
                  ...turret,
                  isDragging: false,
                  x: e.target.x(),
                  y: e.target.y(),
                }
              : turret
          )
        );
      }}
    />
  );
}
