import { TurretState } from "@/types";
import { useState } from "react";
import Turret from "./Turret";

const initialTurrets: TurretState[] = [
  {
    id: "1",
    x: 50,
    y: 50,
    isDragging: false,
  },
  {
    id: "2",
    x: 100,
    y: 100,
    isDragging: false,
  },
];

export default function Turrets() {
  const [turrets, setTurrets] = useState<TurretState[]>(initialTurrets);

  return (
    <>
      {turrets?.map((turret) => (
        <Turret key={turret.id} turret={turret} setTurrets={setTurrets} />
      ))}
    </>
  );
}
