"use client";
import Image from "next/image";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

export default function Home() {
  const { width, height } = useWindowSize();
  const [desktopImageLoaded, setDesktopImageLoaded] = useState(false);
  const [currentWindowWidth, setCurrentWindowWidth] = useState(0);
  const [currentWindowHeight, setCurrentWindowHeight] = useState(0);
  const [currentDesktopImageWidth, setCurrentDesktopImageWidth] = useState(0);
  const [currentDesktopImageHeight, setCurrentDesktopImageHeight] = useState(0);

  useEffect(() => {
    setCurrentWindowWidth(width);
    setCurrentWindowHeight(height);
  }, [width, height]);

  useEffect(() => {
    const img = document.createElement("img");
    img.src = "/images/wwwlogisticsone.png";
    img.onload = () => {
      setDesktopImageLoaded(true);
      setCurrentDesktopImageWidth(img.width);
      setCurrentDesktopImageHeight(img.height);
    };
    img.onerror = () => {
      console.error("Failed to load image:", "/images/wwwlogisticsone.png");
      setDesktopImageLoaded(false);
    };
  }, []);

  return (
    <>
      <label>{"Window Width "}</label>
      <label>{currentWindowWidth}</label>
      <label>{" Window Height "}</label>
      <label>{currentWindowHeight}</label>
      <label>{" Image Width "}</label>
      <label>{currentDesktopImageWidth}</label>
      <label>{" Image Height "}</label>
      <label>{currentDesktopImageHeight}</label>
      {desktopImageLoaded && currentWindowWidth > 768 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Image
            alt="wwwlogisticsone"
            src="/images/wwwlogisticsone.png"
            objectFit="cover"
            width={currentWindowWidth}
            height={currentWindowHeight}
            priority
          />
        </Box>
      )}
    </>
  );
}
