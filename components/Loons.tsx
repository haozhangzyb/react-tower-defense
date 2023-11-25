import { LoonState } from "@/types";
import Loon from "./Loon";
import { CONTROL_AREA_HEIGHT } from "@/consts";

interface ResponseData {
  loonState: Record<
    string,
    {
      position_x: number;
      position_y: number;
    }
  >;
}
interface LoonProps {
  responseData: ResponseData;
}

export default function Loons({ responseData }: LoonProps) {
  const data2 = convertData(responseData);

  return (
    <>
      {data2.map((loon) => (
        <Loon key={loon.id} loon={loon} />
      ))}
    </>
  );
}

const convertData = (loonStateResponseData: ResponseData): LoonState[] =>
  Object.keys(loonStateResponseData.loonState).map((id) => ({
    ...loonStateResponseData.loonState[id],
    id,
    // translate the position to the center of the canvas
    position_x:
      loonStateResponseData.loonState[id].position_x +
      window.innerWidth / 2,
    position_y:
      loonStateResponseData.loonState[id].position_y +
      CONTROL_AREA_HEIGHT +
      window.innerHeight / 2,
  }));
