import { ResponseData } from "@/types";
import { useEffect, useRef } from "react";
import { Text } from "react-konva";

interface MessageProps {
  responseData: ResponseData;
}

export default function Message({ responseData }: MessageProps) {
  //when the responseData.message changes, if it is valid, save it to messageRef, and display it.
  // after 5 seconds, clear the messageRef, and the message will disappear.

  const messageRef = useRef<string>("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (responseData?.msg?.msg) {
      messageRef.current = responseData?.msg?.msg;
      timeoutId = setTimeout(() => {
        messageRef.current = "";
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [JSON.stringify(responseData?.msg?.msg)]);

  return <Text x={100} y={15} text={messageRef.current} fontSize={20} />;
}
