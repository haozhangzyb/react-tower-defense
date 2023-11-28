import { CONTROL_AREA_HEIGHT } from "@/consts";
import { LoonState, TurretState } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Text } from "react-konva";

interface TurretProps {
  turret: TurretState;
  setTurrets: Dispatch<SetStateAction<TurretState[]>>;
  addPlaceHolderTurret: () => void;
  isPlaceHolder: boolean;
  nearestLoonId: LoonState["id"] | null;
  sendJsonMessage: (message: any) => void;
}

export default function Turret({
  turret,
  setTurrets,
  addPlaceHolderTurret,
  isPlaceHolder,
  nearestLoonId,
  sendJsonMessage,
}: TurretProps) {
  const { x, y, isDragging, id } = turret;

  // pop the nearest loon at 1Hz
  useEffect(() => {
    if (!nearestLoonId) return;
    const interval = setInterval(() => {
      sendJsonMessage({
        publish: {
          popLoon: {
            loonId: nearestLoonId,
          },
        },
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [nearestLoonId]);

  return (
    <Text
      text={isPlaceHolder ? `New Turret` : `Turret ${id}`}
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
