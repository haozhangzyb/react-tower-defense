import { useEffect, useRef } from "react";

export default function useMessage(message: string) {
  // when the message changes, if it is valid, save it to messageRef, and display it.
  // after 5 seconds, clear the messageRef, and the message will disappear.
  const messageRef = useRef<string>("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (message) {
      messageRef.current = message;
      timeoutId = setTimeout(() => {
        messageRef.current = "";
      }, 5000);
    }

    return () => clearTimeout(timeoutId);
  }, [JSON.stringify(message)]);

  return messageRef.current;
}
