export type TurretState = {
  id: string;
  x: number;
  y: number;
  isDragging: boolean;
};

export type LoonState = {
  id: string;
  position_x: number;
  position_y: number;
};

export type LoonStateResponseData = Record<
  string,
  {
    position_x: number;
    position_y: number;
  }
>;

interface ResponseData {
  msg?: string;
  error?: string;
  loonState?: LoonStateResponseData;
}
