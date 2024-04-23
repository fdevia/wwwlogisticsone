import { createTheme } from "@mui/material";
import { Roboto, Pacifico } from "next/font/google";
//import localFont from "@next/font/local";
/*
const pacificoFont = Pacifico({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});
*/

const robotoFont = Roboto({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const ThemeLogisticsOne = createTheme({
  palette: {
    primary: {
      main: "#F0324C",
      dark: "#0069a7",
      contrastText: "#fff",
      light: "white",
    },
    secondary: {
      main: "#2F3042",
      dark: "#5a9400",
      contrastText: "#fff",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    body1: {
      fontFamily: robotoFont.style.fontFamily,
      fontWeight: "450",
      fontSize: "15px",
      color: "red",
      align: "center",
      lineHeight: 1,
      letterSpacing: "0.00000em",
    },

    body2: {
      fontFamily: robotoFont.style.fontFamily,
      fontWeight: "400",
      fontSize: "11px",
      color: "#757575",
      align: "Center",
    },

    subtitle1: {
      fontFamily: robotoFont.style.fontFamily,
      fontWeight: "450",
      fontSize: "18px",
      color: "#000000",
      align: "Center",
      /*lineHeight: "30px",*/
    },

    subtitle2: {
      fontFamily: robotoFont.style.fontFamily,
      fontWeight: "400",
      fontSize: "12px",
      color: "#757575",
      align: "Center",
      lineHeight: "30px",
    },

    h1: {
      fontFamily: robotoFont.style.fontFamily,
      fontWeight: 800,
      fontSize: "28px",
      verticalAlign: "center",
      align: "center",
      lineHeight: 0.8,
      letterSpacing: "0.02857em",
    },

    h2: {
      fontFamily: robotoFont.style.fontFamily,
      fontWeight: "600",
      fontSize: "22px",
      align: "Center",
    },

    h3: {
      fontFamily: robotoFont.style.fontFamily,
      fontWeight: "600",
      fontSize: "22px",
      align: "Center",
      color: "#7f8989",
    },

    h4: {
      fontFamily: robotoFont.style.fontFamily,
      fontWeight: "400",
      fontSize: "18px",
      align: "Center",
      color: "#000000",
    },

    h5: {
      fontFamily: robotoFont.style.fontFamily,
      fontWeight: "400",
      fontSize: "16px",
      align: "left",
      color: "#707070",
    },

    h6: {
      fontFamily: robotoFont.style.fontFamily,
      lineHeight: 1.2,
      fontWeight: "400",
      fontSize: "17px",
      align: "Center",
      color: "#707070",
    },

    button: {
      width: 190,
      fontfamily: robotoFont.style.fontFamily,
      fontWeight: 400,
      fontSize: "10px",
      verticalAlign: "center",
      align: "center",
      /*lineHeight: 0.8,
        letterSpacing: "0.02857em",
        textTransform: "uppercase",*/
    },
  },
});
export default ThemeLogisticsOne;
