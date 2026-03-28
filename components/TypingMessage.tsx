import { useEffect, useState } from "react";

export default function TypingMessage({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        return;
      }
      setDisplayed(text.slice(0, i + 1));
      i++;
    }, 18);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}
