"use client";
import Image from "next/image";
import { Box } from "@mui/material";
import { useWindowSize } from "react-use";

import styles from "./page.module.css";

export default function Home() {
  const { width, height } = useWindowSize();
  return (
    <main className={styles.main}>
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
    </main>
  );
}
