import {
  Autocomplete,
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useWindowSize } from "react-use";
import { Roboto } from "next/font/google";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import { ProductContext } from "./ProductContext";
import ThemeLogisticsOne from "./theme";

/*
interface Props {
  open: boolean;
}
*/

export interface IProduct {
  sku: string;
  idCategorie: string;
  idBrand: string;
  productDescription: string;
}

const optionsBrands = [
  { id: "0001", brand: "Blü" },
  { id: "0002", brand: "Chicle Tattoo" },
  { id: "0003", brand: "Chuppetin led dino" },
  { id: "0004", brand: "Chuppetin led dona" },
  { id: "0005", brand: "Chuppetin led frutti" },
  { id: "0006", brand: "Chuppetin led mix sabores surtidos" },
  { id: "0007", brand: "Chuppetin led quack" },
  { id: "0008", brand: "Chuppetin led unicornio" },
  { id: "0009", brand: "Copatitas" },
  { id: "0010", brand: "Mabel´s" },
  { id: "0011", brand: "Mini gelatina" },
  { id: "0012", brand: "Gelatina" },
  { id: "0013", brand: "Jabón líquido" },
];

const optionsCategories = [
  { id: "0001", categorie: "Arena aglutinante" },
  { id: "0002", categorie: "Chicle" },
  { id: "0003", categorie: "Chupetin led" },
  { id: "0004", categorie: "Detergente" },
  { id: "0005", categorie: "Galleteria" },
  { id: "0006", categorie: "Gelatina" },
  { id: "0007", categorie: "Jabón líquido" },
  { id: "0008", categorie: "Limpiatodo" },
  { id: "0009", categorie: "Mini gelatina" },
  { id: "0010", categorie: "Suavizante" },
];

const robotoFont = Roboto({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const Products: React.FC = () => {
  const [itemsPerPage] = useState(4);
  const [numOfPages, setNumOfPages] = useState(0);
  const {
    cardId,
    updateCardId,
    products,
    currentPage,
    updateCurrentPage,
    currentCategorieId,
    showDesktopGlobo02,
    updateShowDesktopGlobo02,
  } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(Array<IProduct>);
  //const [products, setProducts] = useState([]);
  const convertWithPixels = (value: number, total: number) =>
    (total * value) / 2400;
  const convertHeightPixels = (value: number, total: number) =>
    (total * value) / 1148;
  const convertXPixels = (value: number, x: number) => (value * x) / 2400;
  const convertYPixels = (value: number, y: number) => (value * y) / 1148;
  const { width, height } = useWindowSize();
  //const [showDesktopGlobo02, setShowDesktopGlobo02] = useState(true);
  const [x1] = useState(700);
  const [y1] = useState(300);
  const [x2] = useState(600);
  const [y2] = useState(550);
  const [x3] = useState(2100);
  const [y3] = useState(250);

  const handleCloseProductos = () => updateShowDesktopGlobo02(false);
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

  useEffect(() => {
    console.log("products.length " + products.length);
    setFilteredProducts(
      products
        .filter((item) => item.idCategorie === currentCategorieId)
        .slice(
          currentPage * itemsPerPage - itemsPerPage,
          currentPage * itemsPerPage
        )
    );
    console.log("   filteredProducts.length  " + filteredProducts.length);
    setNumOfPages(Math.ceil(filteredProducts.length / itemsPerPage));
    /*
    setProducts(
      productsFiltered.slice(
        cartCtx.currentPage * itemsPerPage - itemsPerPage,
        cartCtx.currentPage * itemsPerPage
      )*/
    /*
    const productsFiltered = products.filter((ar) =>
      currentCategorieId.find((rm) => rm.currentCategorieId  === ar.genero)
    );
    //console.log(products[0].sku);
    //const found = products.filter((item) => item.idCategorie === currentCategorieId));
    //let temp = data.find((ar) => ar.sku === values.itemId);
   
    const found = products.find((ctxitem) => ctxitem.currentCategorieId === item.currentCategorieId);
    let temp = products.find(
      (ar) => ar.categorieId === values.currentCategorieId
    );
    updateCardId("1018505033");
    */
  }, []);

  const handleChangePage = async (event: any, value: number) => {
    await updateCurrentPage(value);
    //cartCtx.setCurrentPage(value);
    //cartCtx.changeCurrentPage(value);
  };

  const handleButtonOnClick = async () => {
    updateShowDesktopGlobo02(false);
    //console.log("ingreso");
    //await updateCardId("1018505033 " + x++);
  };

  return (
    showDesktopGlobo02 && (
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
              <Image
                width={50}
                height={50}
                className="imgX"
                src={"/images/x.png"}
                alt="x"
              />
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Autocomplete
                onChange={onTagsChangeCategorie}
                options={optionsCategories}
                getOptionLabel={(option) => option.categorie}
                style={{ width: 300, marginRight: "16%", marginTop: "4%" }}
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
            </Box>
            <Box>
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
          </Box>
          <Box sx={{ marginLeft: "12%", marginTop: "2%", minHeight: "550px" }}>
            {filteredProducts.map((item, index) => (
              <div key={index}>
                <div>
                  <img
                    width="200px"
                    height="auto"
                    src={`/images/${item.sku}.png`}
                  />
                  <label>{item.productDescription}</label>
                </div>
              </div>
            ))}

            <label>Items</label>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "2%",
            }}
          >
            <Pagination
              count={numOfPages}
              page={currentPage}
              onChange={handleChangePage}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        </ThemeProvider>
      </Box>
    )
  );
};
export { Products };
