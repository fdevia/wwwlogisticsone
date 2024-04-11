"use client";
import Image from "next/image";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Label from "@mui/material";
import Modal from "@mui/material/Modal";

import "./page.css";

export default function Home() {
  const { width, height } = useWindowSize();
  const [desktopImageLoaded, setDesktopImageLoaded] = useState(false);
  const [currentWindowWidth, setCurrentWindowWidth] = useState(0);
  const [currentWindowHeight, setCurrentWindowHeight] = useState(0);
  const [currentDesktopImageWidth, setCurrentDesktopImageWidth] = useState(0);
  const [currentDesktopImageHeight, setCurrentDesktopImageHeight] = useState(0);
  const [showDesktopGlobo01, setShowDesktopGlobo01] = useState(false);
  const [showDesktopGlobo02, setShowDesktopGlobo02] = useState(false);
  const [showDesktopGlobo03, setShowDesktopGlobo03] = useState(false);
  const [x1] = useState(700);
  const [y1] = useState(300);
  const [x2] = useState(500);
  const [y2] = useState(450);
  const [x3] = useState(2100);
  const [y3] = useState(250);
  const areas = [
    {
      id: "area1",
      //coords: "370,250,550,350",
      coords: "220,500,850,900",
      onMouseLeave: () => {
        console.log("onMouseLeave área1");
        setShowDesktopGlobo01(false);
      },
      onMouseOver: () => {
        console.log("onMouseOver area1");
        setShowDesktopGlobo01(true);
      },
      className: "area-border",
    },
    {
      id: "area2",
      coords: "1000,400,1700,700",
      onMouseLeave: () => {
        console.log("mouseLeave area2");
        setShowDesktopGlobo02(false);
      },
      onMouseOver: () => {
        console.log("mouseOver area2");
        setShowDesktopGlobo02(true);
      },
      className: "area-border",
    },

    {
      id: "area3",
      coords: "2000,480,2240,810",
      onMouseLeave: () => {
        console.log("mouseLeave area2");
        setShowDesktopGlobo03(false);
      },
      onMouseOver: () => {
        console.log("mouseOver area2");
        setShowDesktopGlobo03(true);
      },
      onClick: () => {
        console.log("onClick area7");
        window.location.href = "https://wa.me/message/JUCLGSNQQNWND1";
      },
      className: "area-border",
    },
  ];

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

  const convertWithPixels = (value: number, total: number) =>
    (total * value) / 2400;
  const convertHeightPixels = (value: number, total: number) =>
    (total * value) / 1148;

  const convertXPixels = (value: number, x: number) => (value * x) / 2400;
  const convertYPixels = (value: number, y: number) => (value * y) / 1148;

  return (
    <>
      {/*
      <label>{"Window Width "}</label>
      <label>{currentWindowWidth}</label>
      <label>{" Window Height "}</label>
      <label>{currentWindowHeight}</label>
      <label>{" Image Width "}</label>
      <label>{currentDesktopImageWidth}</label>
      <label>{" Image Height "}</label>
      <label>{currentDesktopImageHeight}</label>
      */}
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
            useMap="#areas"
          />
          <map id="areas">
            {areas.map((area) => (
              <area
                alt="bots"
                key={area.id}
                shape="rect"
                coords={area.coords
                  .split(",")
                  .map((coord, index) =>
                    index % 2 === 0
                      ? convertWithPixels(parseInt(coord), width)
                      : convertHeightPixels(parseInt(coord), height)
                  )
                  .join(",")}
                onMouseLeave={area.onMouseLeave}
                onMouseOver={area.onMouseOver}
                onClick={area.onClick}
                className={area.className}
              />
            ))}
          </map>
        </Box>
      )}
      {desktopImageLoaded && showDesktopGlobo01 && (
        <Box
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: convertXPixels(width, x1),
            top: convertYPixels(height, y1),
            zIndex: 2,
          }}
        >
          <Box>
            <Image
              src="/images/desktopGlobo01.png"
              alt="desktopGlobo01"
              width={width / 5}
              height={height / 3}
              //style={{ width: "auto", height: "auto" }}
            />
          </Box>
        </Box>
      )}
      {desktopImageLoaded && showDesktopGlobo02 && (
        <Box
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: convertXPixels(width, x2),
            top: convertYPixels(height, y2),
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              border: "2px solid red",
              width: 800,
              height: 600,
              backgroundColor: "#E72F49",
            }}
          >
            <label className="white-label">
              Products information goes heare
            </label>
            {/*
            <Image
              src="/images/desktopGlobo02.png"
              alt="desktopGlobo02"
              width={width / 5}
              height={height / 3}
              //style={{ width: "auto", height: "auto" }}
            />
        */}
          </Box>
        </Box>
      )}
      {desktopImageLoaded && showDesktopGlobo03 && (
        <Box
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: convertXPixels(width, x3),
            top: convertYPixels(height, y3),
            zIndex: 2,
          }}
        >
          <Box>
            <Image
              src="/images/desktopGlobo03.png"
              alt="desktopGlobo03"
              width={width / 5}
              height={height / 3}
              //style={{ width: "auto", height: "auto" }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
