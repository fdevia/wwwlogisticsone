"use client";
import Image from "next/image";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

export default function Home() {
  const { width, height } = useWindowSize();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [imageWidthDesktop, setImageWidthDesktop] = useState(0);
  const [imageHeightDesktop, setImageHeightDesktop] = useState(0);

  useEffect(() => {
    setCurrentWidth(width);
    setCurrentHeight(height);
  }, [width, height]);

  useEffect(() => {
    const handleImageLoad = () => {
      setImageLoaded(true);
      setImageWidthDesktop(img.width);
      setImageHeightDesktop(img.height);
    };
    const img = document.createElement("img");
    img.src = "/images/wwwlogisticsone.png";
    img.onload = handleImageLoad;
    img.onerror = () => {
      console.error("Failed to load image:", "/images/wwwlogisticsone.png");
      setImageLoaded(true);
    };
  }, []);

  return (
    <>
      {imageLoaded && currentWidth > 768 && (
        <Box>
          <Image
            alt="wwwlogisticsone"
            src="/images/wwwlogisticsone.png"
            style={{ width: "100%", height: "100%" }}
            width={width}
            height={height}
            priority
          />
        </Box>
      )}
    </>
  );
}
