"use client";
import { useEffect, useState, useContext } from "react";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import { useWindowSize } from "react-use";

import { ProductContext } from "./ProductContext";
import { Products } from "./products";
import "./page.css";
import { log } from "console";
//import { AppProps } from "next/app";

const Home: React.FC = () => {
  const { updateProducts, showDesktopGlobo02, updateShowDesktopGlobo02 } =
    useContext(ProductContext);
  const { width, height } = useWindowSize();
  const [desktopImageLoaded] = useState(true);
  const [mobileImageLoaded] = useState(true);
  const [currentWindowWidth, setCurrentWindowWidth] = useState(0);
  const [currentWindowHeight, setCurrentWindowHeight] = useState(0);
  const [showDesktopGlobo01, setShowDesktopGlobo01] = useState(false);
  //const [showDesktopGlobo02, setShowDesktopGlobo02] = useState(false);
  const [showDesktopGlobo03, setShowDesktopGlobo03] = useState(false);
  const [x1] = useState(700);
  const [y1] = useState(300);
  const [x2] = useState(600);
  const [y2] = useState(550);
  const [x3] = useState(2100);
  const [y3] = useState(250);

  const areas = [
    {
      id: "area1",
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
      onMouseOver: async () => {
        console.log("mouseOver area2 " + showDesktopGlobo02);
        if (!showDesktopGlobo02) {
          console.log("ingreso onOver");
          updateShowDesktopGlobo02(true);
          //setShowDesktopGlobo02(true);
        }
      },
      className: "area-border",
    },

    {
      id: "area3",
      coords: "2000,480,2240,810",
      onMouseLeave: () => {
        console.log("mouseLeave area3");
        setShowDesktopGlobo03(false);
      },
      onMouseOver: () => {
        console.log("mouseOver area3");
        setShowDesktopGlobo03(true);
      },
      onClick: () => {
        console.log("onClick area3");
        window.location.href = "https://wa.me/message/JUCLGSNQQNWND1";
      },
      className: "area-border",
    },
  ];
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamar a updateCardId para actualizar el cardId
      } catch (error) {
        console.error("Error al actualizar el cardId:", error);
      }
    };

    fetchData(); // Call fetchData on component mount
  }, []);
*/

  useEffect(() => {
    setCurrentWindowWidth(width);
    setCurrentWindowHeight(height);
  }, [width, height]);

  useEffect(() => {
    (async () => {
      await updateProducts();
    })();
  }, []);

  const convertWithPixels = (value: number, total: number) =>
    (total * value) / 2400;
  const convertHeightPixels = (value: number, total: number) =>
    (total * value) / 1148;

  const convertXPixels = (value: number, x: number) => (value * x) / 2400;
  const convertYPixels = (value: number, y: number) => (value * y) / 1148;

  //const handleCloseProductos = () => setShowDesktopGlobo02(false);

  const onTagsChangeCategorie = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { id: string; categorie: string } | null
  ) => {
    if (newValue) {
      alert(newValue.id + " " + newValue.categorie);
      console.log(newValue.categorie);
    }
  };

  const onTagsChangeBrand = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: { id: string; brand: string } | null
  ) => {
    if (newValue) {
      alert(newValue.id + " " + newValue.brand);
      console.log(newValue.brand);
    }
  };

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
            //objectFit="cover"
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
      {desktopImageLoaded && showDesktopGlobo02 && <Products />}
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
      {mobileImageLoaded && currentWindowWidth <= 768 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            //height: "100vh",
            overflow: "hidden",
          }}
        >
          <Image
            alt="wwwlogisticsone"
            src="/images/wwwlogisticsonemobile.png"
            //objectFit="cover"
            width={currentWindowWidth}
            height={currentWindowHeight}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </Box>
      )}
    </>
  );
};
export default Home;
