import { CONTROL_AREA_HEIGHT } from "@/consts";
import { TurretState } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Text } from "react-konva";

interface TurretProps {
  turret: TurretState;
  setTurrets: Dispatch<SetStateAction<TurretState[]>>;
  addPlaceHolderTurret: () => void;
  isPlaceHolder: boolean;
}

export default function Turret({
  turret,
  setTurrets,
  addPlaceHolderTurret,
  isPlaceHolder,
}: TurretProps) {
  const { x, y, isDragging, id } = turret;

  return (
    <Text
      text={isPlaceHolder ? `New Turret` : `Turret ${id}`}
      x={x}
      y={y}
      draggable={isPlaceHolder ? true : false}
      fill={isDragging ? "green" : "black"}
      onDragStart={() => {
        setTurrets((prev) =>
          prev.map((turret) =>
            turret.id === id ? { ...turret, isDragging: true } : turret
          )
        );
      }}
      onDragEnd={(e) => {
        const isMoveValid = e.target.y() > CONTROL_AREA_HEIGHT;
        setTurrets((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  isDragging: false,
                  x: isMoveValid ? e.target.x() : x,
                  y: isMoveValid ? e.target.y() : y,
                }
              : item
          )
        );
        if (isMoveValid) {
          addPlaceHolderTurret();
        }
      }}
    />
  );
}
