import { LoonState, TurretState } from "@/types";
import { useState } from "react";
import Turret from "./Turret";
import { ReadyState } from "react-use-websocket";
import { get } from "http";
import { getNearestLoonId } from "@/util";

interface TurretsProps {
  sendJsonMessage: (message: any) => void;
  readyState: ReadyState;
  loonState: LoonState[] | null;
}

const initialTurret: TurretState = {
  id: "1",
  x: 5,
  y: 5,
  isDragging: false,
};

export default function Turrets({
  sendJsonMessage,
  readyState,
  loonState,
}: TurretsProps) {
  const [turrets, setTurrets] = useState<TurretState[]>([initialTurret]);

  function addPlaceHolderTurret() {
    setTurrets((prev) => [
      ...prev,
      { ...initialTurret, id: (prev.length + 1).toString() },
    ]);
  }

  return (
    <>
      {turrets?.map((turret) => (
        <Turret
          key={turret.id}
          turret={turret}
          setTurrets={setTurrets}
          addPlaceHolderTurret={addPlaceHolderTurret}
          isPlaceHolder={turret.id === turrets.length.toString()}
          nearestLoonId={getNearestLoonId(loonState, turret)}
          sendJsonMessage={sendJsonMessage}
        />
      ))}
    </>
  );
}
