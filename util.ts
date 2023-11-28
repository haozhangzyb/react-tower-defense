import {
  LoonState,
  LoonStateResponseData,
  ResponseData,
  TurretState,
} from "@/types";
import { CONTROL_AREA_HEIGHT } from "@/consts";

export function formatLoonStateResponseData(
  loonStateResponseData: ResponseData["loonState"]
) {
  if (!loonStateResponseData) {
    return null;
  }

  return Object.keys(loonStateResponseData).map((id) => ({
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
}

export function getNearestLoonId(
  loonState: LoonState[] | null,
  turret: TurretState
): LoonState["id"] | null {
  if (!loonState) {
    return null;
  }

  if (!loonState?.length) {
    return null;
  }

  // use reduce to find the nearest loon
  const nearestLoon = loonState.reduce(
    (nearestLoon, loon) => {
      const distance = Math.sqrt(
        Math.pow(loon.position_x - turret.x, 2) +
          Math.pow(loon.position_y - turret.y, 2)
      );

      if (distance < nearestLoon.distance) {
        return {
          id: loon.id,
          distance,
        };
      }

      return nearestLoon;
    },
    { id: loonState[0].id, distance: Infinity }
  );

  return nearestLoon.id;
}
