"use client";
import Image from "next/image";
import { Box } from "@mui/material";
import { useWindowSize } from "react-use";

export default function Home() {
  const { width, height } = useWindowSize();
  return (
    <>
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
    </>
  );
}
