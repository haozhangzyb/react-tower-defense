import { TurretState } from "@/types";
import { useState } from "react";
import Turret from "./Turret";

const initialTurret: TurretState = {
  id: "1",
  x: 5,
  y: 5,
  isDragging: false,
};
export default function Turrets() {
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
        />
      ))}
    </>
  );
}
