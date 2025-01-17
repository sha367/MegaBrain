import { useState, useEffect } from "react";

export const useDeviceRAM = () => {
  const [totalRAM, setTotalRAM] = useState<number>(0);

  useEffect(() => {
    const fetchRAM = async () => {
      try {
        if (!window.ipcRenderer) {
          console.error("ipcRenderer not available");
          return;
        }

        const ram = await window.ipcRenderer.invoke("get:system-ram");
        if (typeof ram === "number") {
          setTotalRAM(ram);
        }
      } catch (error) {
        console.error("Error fetching system RAM:", error);
      }
    };

    fetchRAM();
  }, []);

  return totalRAM;
}; 