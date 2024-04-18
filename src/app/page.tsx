"use client";
import { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import Image from "next/image";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useWindowSize } from "react-use";
import ThemeLogisticsOne from "./theme";
import "./page.css";

const robotoFont = Roboto({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const robotoFont1 = Roboto({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const optionsBrands = [
  { brand: "Mabel'S" },
  { brand: "Fiesta MINI MINI" },
  { brand: "ANILLO mix" },
  { brand: "Gelatina MINI MINI" },
  { brand: "CHICLE TATTOO" },
  { brand: "MINI SUPER KIDS" },
  { brand: "MINI Princesa" },
  { brand: "MINI DINO" },
  { brand: "MINI ZOO" },
  { brand: "MINI AVIONCITO" },
  { brand: "MINI CAR" },
  { brand: "NATIVO" },
  { brand: "BLÜ" },
  { brand: "El Secreto De La Abueilita" },
  { brand: "Suite" },
  { brand: "Olimpo" },
  { brand: "BelleKiss" },
  { brand: "Co Patitas" },
  { brand: "Gelatina MINI MINI" },
];

const optionsCategories = [
  { categorie: "WAFER" },
  { categorie: "MARSHMALLOWS" },
  { categorie: "CHUPETIN LED" },
  { categorie: "MINI GELATINA" },
  { categorie: "CHICLE" },
  { categorie: "HUEVOS SORPRESA" },
  { categorie: "GELATINA" },
  { categorie: "DETERGENTE" },
  { categorie: "SUAVIZANTE" },
  { categorie: "LIMPIATODO" },
  { categorie: "CUCARACHICIDA" },
  { categorie: "JABON LIQUIDO" },
  { categorie: "ARENA SANITARIA" },
];

export default function Home() {
  const { width, height } = useWindowSize();
  const [desktopImageLoaded, setDesktopImageLoaded] = useState(false);
  const [currentWindowWidth, setCurrentWindowWidth] = useState(0);
  const [currentWindowHeight, setCurrentWindowHeight] = useState(0);
  const [showDesktopGlobo01, setShowDesktopGlobo01] = useState(false);
  const [showDesktopGlobo02, setShowDesktopGlobo02] = useState(false);
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
      onMouseOver: () => {
        console.log("mouseOver area2");
        if (!showDesktopGlobo02) {
          setShowDesktopGlobo02(true);
        }
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

  const handleCloseProductos = () => setShowDesktopGlobo02(false);

  const onTagsChangeCategorie = (event: any, values: any) => {
    console.log(values.length);
    /*
    if (values.length > 0) {
      cartCtx.changeFilterGenero(values);
    } else {
      cartCtx.changeFilterGenero([]);
      console.log("No filter onTagsChangeGenero");
    }*/
  };

  function onTagsChangeBrand(e: any, newItem: any) {
    alert("wwwww");
    console.log(newItem);
  }

  const onTagsChangeBrand2 = (event: any, value: any) => {
    console.log(value.length);
    /*
    if (values.length > 0) {
      cartCtx.changeFilterGenero(values);
    } else {
      cartCtx.changeFilterGenero([]);
      console.log("No filter onTagsChangeGenero");
    }
    */
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
      {desktopImageLoaded && showDesktopGlobo02 && (
        <Box
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: convertXPixels(width, x2),
            top: convertYPixels(height, y2),
            width: 800,
            height: 800,
            borderRadius: 6,
            //border: "solid white 10px",
            //backgroundColor: "#F0324C",
            backgroundColor: "#2F3042",
            //backgroundColor: "gray",
            //zIndex: 2,
          }}
        >
          <ThemeProvider theme={ThemeLogisticsOne}>
            <Box
              sx={{
                //border: "1px solid white",
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "flex-end",
                //marginTop: "2%",
              }}
            >
              <Button
                sx={{
                  width: "50px",
                  marginTop: "1%",
                  //marginRight: "2%",
                  //border: "1px solid blue",
                }}
                onClick={handleCloseProductos}
              >
                <img className="imgX" src={"/images/x.png"} alt="x" />
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography variant="h1">
                <div className="whiteColorText">Productos</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginTop: "2%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Autocomplete
                onChange={onTagsChangeCategorie}
                options={optionsCategories}
                getOptionLabel={(option) => option.categorie}
                style={{ width: 300, marginRight: "14%", marginTop: "4%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        fontSize: 20,
                        color: ThemeLogisticsOne.palette.primary.main,
                        backgroundColor: "white",
                        fontFamily: robotoFont,
                      },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                      },
                    }}
                    label="Categoria"
                    placeholder="Categorias"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                    }}
                    InputLabelProps={{
                      style: {
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        //overflow: "hidden",
                        width: "100%",
                        color: ThemeLogisticsOne.palette.primary.main,
                        fontSize: 20,
                        //fontFamily: "Roboto",
                        fontWeight: 900,
                      },
                    }}
                  />
                )}
              />
              <Autocomplete
                onChange={onTagsChangeBrand}
                options={optionsBrands}
                getOptionLabel={(option) => option.brand}
                style={{ width: 300, marginTop: "4%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        fontSize: 20,
                        color: ThemeLogisticsOne.palette.primary.main,
                        backgroundColor: "white",
                        fontFamily: robotoFont,
                      },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                      },
                    }}
                    label="Marca"
                    placeholder="Marcas"
                    size="small"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                    }}
                    InputLabelProps={{
                      style: {
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        //overflow: "hidden",
                        width: "100%",
                        color: ThemeLogisticsOne.palette.primary.main,
                        fontSize: 20,
                        //fontFamily: "Pacifico",
                        fontWeight: 900,
                      },
                    }}
                  />
                )}
              />
            </Box>
          </ThemeProvider>
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
