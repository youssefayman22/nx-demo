"use client";

import { useEffect } from "react";

export default function ClientLogger() {
  console.log("🔵 ClientLogger render (CLIENT)");

  useEffect(() => {
    console.log("🟣 ClientLogger useEffect (CLIENT - after hydration)");
  }, []);

  return <div>Client Logger Mounted</div>;
}
