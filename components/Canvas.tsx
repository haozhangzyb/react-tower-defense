import { Stage, Layer, Rect, Text, useStrictMode } from "react-konva";
import useWebSocket, { ReadyState } from "react-use-websocket";

import Turrets from "@/components/Turrets";
import { CONTROL_AREA_HEIGHT, WS_URL } from "@/consts";
import Loons from "./Loons";
import { LoonStateResponseData, ResponseData } from "@/types";
import { formatLoonStateResponseData } from "@/util";
import Message from "./Message";

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
  const loonState = formatLoonStateResponseData(responseData?.loonState);

  if (responseData?.error) {
    return <p>{responseData.error}</p>;
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Message responseData={responseData} />
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
          loonState={loonState}
        />
        {<Loons loonState={loonState} />}
      </Layer>
    </Stage>
  );
}
