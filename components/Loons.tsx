import { LoonState, LoonStateResponseData, ResponseData } from "@/types";
import Loon from "./Loon";
import { CONTROL_AREA_HEIGHT } from "@/consts";

interface LoonProps {
  loonStateResponseData: ResponseData["loonState"];
}

export default function Loons({ loonStateResponseData }: LoonProps) {
  if (loonStateResponseData === undefined) return;
  const formattedLoonStates = convertData(loonStateResponseData);

  console.log("formattedLoonStates", formattedLoonStates);

  return (
    <>
      {formattedLoonStates.map((loon) => (
        <Loon key={loon.id} loon={loon} />
      ))}
    </>
  );
}

const convertData = (
  loonStateResponseData: LoonStateResponseData
): LoonState[] =>
  Object.keys(loonStateResponseData).map((id) => ({
    ...loonStateResponseData[id],
    id,
    // translate the position to the center of the canvas
    position_x:
      loonStateResponseData[id].position_x + window.innerWidth / 2,
    position_y:
      loonStateResponseData[id].position_y +
      CONTROL_AREA_HEIGHT +
      window.innerHeight / 2,
  }));
