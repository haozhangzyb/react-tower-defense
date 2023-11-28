import { LoonState } from "@/types";
import Loon from "./Loon";

interface LoonProps {
  loonState: LoonState[] | null;
}

export default function Loons({ loonState }: LoonProps) {
  return (
    <>
      {loonState?.map((loon) => (
        <Loon key={loon.id} loon={loon} />
      ))}
    </>
  );
}
