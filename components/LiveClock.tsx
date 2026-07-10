"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    
    let interval: NodeJS.Timeout;
    try {
      const updateTime = () => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        setTime(new Intl.DateTimeFormat("en-US", options).format(now));
      };

      updateTime();
      interval = setInterval(updateTime, 1000);
    } catch (e) {
      console.error("LiveClock error:", e);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  if (!mounted || !time) return <span>--:--:-- --</span>;

  return <span>{time}</span>;
}
