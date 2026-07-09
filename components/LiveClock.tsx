"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Function to format time in IST
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      
      // Formatting time and replacing default parts to match typical IST representation
      const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Avoid hydration mismatch by rendering nothing or a placeholder on the server
  if (!time) return <span>--:--:-- --</span>;

  return <span>{time}</span>;
}
