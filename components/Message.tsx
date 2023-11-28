import useMessage from "@/hooks/useMessage";
import { ResponseData } from "@/types";
import { Text } from "react-konva";

interface MessageProps {
  responseData: ResponseData;
}

export default function Message({ responseData }: MessageProps) {
  const message = useMessage(JSON.stringify(responseData?.msg?.msg));

  return <Text x={100} y={15} text={message} fontSize={20} />;
}
