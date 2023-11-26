import { Stage, Layer, Rect, Text, useStrictMode } from "react-konva";
import useWebSocket, { ReadyState } from "react-use-websocket";

import Turrets from "@/components/Turrets";
import { CONTROL_AREA_HEIGHT, WS_URL } from "@/consts";
import Loons from "./Loons";
import { LoonStateResponseData, ResponseData } from "@/types";

export default function Canvas() {
  useStrictMode(true);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onError: (e) => console.log(e),
      onOpen: () => {
        sendJsonMessage({
          subscribe: "msg",
        });
        sendJsonMessage({
          subscribe: "loonState",
        });
      },
    }
  );

  const responseData = lastJsonMessage as ResponseData;

  if (responseData?.error) {
    return <p>{responseData.error}</p>;
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          x={window.innerWidth - 200}
          y={15}
          text={responseData?.msg}
          fontSize={20}
        />
        {/* // make top 100px of canvas white background and the remaining part with a border */}
        <Rect
          x={0}
          y={50}
          width={window.innerWidth}
          height={window.innerHeight - CONTROL_AREA_HEIGHT}
          fill='gray'
          stroke='black'
          strokeWidth={4}
        />
        <Turrets
          sendJsonMessage={sendJsonMessage}
          readyState={readyState}
        />
        <Loons loonStateResponseData={responseData?.loonState} />
      </Layer>
    </Stage>
  );
}
