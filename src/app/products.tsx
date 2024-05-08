import {
  Autocomplete,
  Checkbox,
  createFilterOptions,
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useWindowSize } from "react-use";
import { Roboto } from "next/font/google";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

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

/*
interface Category {
  id: number;
  name: string;
  subcategories: {
    id: number;
    name: string;
    subsubcategories: { id: number; name: string }[];
  }[];
}
*/
type Category = {
  id: number;
  name: string;
  childCategories?: Category[];
};

// describes the format that we want
interface Option {
  id: number;
  name: string;
  depth: number;
  parentId: number | null;
  matchTerms: string[];
}

const dataCategorie = [
  {
    id: 1,
    name: "Limpieza",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 11,
        name: "Hogar",
        stockItems: [],
        childCategories: [
          {
            id: 111,
            name: "Detergente",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 112,
            name: "Limpiatodo",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 113,
            name: "Suavizante",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
      {
        id: 12,
        name: "Cuidado personal",
        stockItems: [],
        childCategories: [
          {
            id: 121,
            name: "Jabones liquidos",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Confiteria",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 21,
        name: "Golosinas",
        stockItems: [],
        childCategories: [
          {
            id: 211,
            name: "Chicle",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 212,
            name: "Chupetin led",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 213,
            name: "Mini gelatina",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 214,
            name: "Gelatina",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 215,
            name: "Marshmellows",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
      {
        id: 22,
        name: "Galleteria",
        stockItems: [],
        childCategories: [
          {
            id: 221,
            name: "Wafer",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Mascotas",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 31,
        name: "Arena para gatos",
        stockItems: [],
        childCategories: [
          {
            id: 311,
            name: "Arena aglutinante",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
];

const dataBrand = [
  {
    id: 10,
    name: "Blü",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 11,
        name: "Detergente",
        stockItems: [],
        childCategories: [
          {
            id: 111,
            name: "140GR",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 112,
            name: "500GR",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 113,
            name: "750GR",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 114,
            name: "1KG",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 115,
            name: "14KG",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
      {
        id: 12,
        name: "Jabón liquido",
        stockItems: [],
        childCategories: [
          {
            id: 121,
            name: "1L",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 122,
            name: "360ML",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
      {
        id: 13,
        name: "Limpiatodo",
        stockItems: [],
        childCategories: [
          {
            id: 131,
            name: "900ML",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
      {
        id: 14,
        name: "Suavizante",
        stockItems: [],
        childCategories: [
          {
            id: 141,
            name: "75ML",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 142,
            name: "800ML",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 20,
    name: "Chicle tatto",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 21,
        name: "Chicle",
        stockItems: [],
        childCategories: [
          {
            id: 211,
            name: "3G",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 212,
            name: "4.5G",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 30,
    name: "Chupetin led dino",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 31,
        name: "Chupetin led",
        stockItems: [],
        childCategories: [
          {
            id: 311,
            name: "Surtidos X 24UND",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 40,
    name: "Chupetin led dona",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 41,
        name: "Chupetin led",
        stockItems: [],
        childCategories: [
          {
            id: 411,
            name: "Surtidos X 24UND",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 50,
    name: "Chupetin led frutti",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 51,
        name: "Chupetin led",
        stockItems: [],
        childCategories: [
          {
            id: 511,
            name: "Surtidos X 24UND",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 60,
    name: "Chupetin led mix sabores surtidos",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 61,
        name: "Cupetin Led",
        stockItems: [],
        childCategories: [
          {
            id: 611,
            name: "Surtidos X 24UND",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 70,
    name: "Chupetin led quack",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 71,
        name: "Chupetin led",
        stockItems: [],
        childCategories: [
          {
            id: 711,
            name: "Surtidos X 24UND",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 80,
    name: "Chupetin led unicornio",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 81,
        name: "Chupetin led",
        stockItems: [],
        childCategories: [
          {
            id: 811,
            name: "Surtidos X 24UND",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 90,
    name: "Copatitas",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 91,
        name: "Arena para gatos",
        stockItems: [],
        childCategories: [
          {
            id: 911,
            name: "4KG X 4BLS",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 100,
    name: "Mabel´s",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 101,
        name: "Galleteria",
        stockItems: [],
        childCategories: [
          {
            id: 1001,
            name: "42GR",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 1002,
            name: "107GR",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 200,
    name: "Mallows mini mini",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 201,
        name: "Marshmellows",
        stockItems: [],
        childCategories: [
          {
            id: 2011,
            name: "300GR",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 2012,
            name: "500GR",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 300,
    name: "Mini Gelatina",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 301,
        name: "Mini gelatina",
        stockItems: [],
        childCategories: [
          {
            id: 3011,
            name: "15GX50U(12BLS)",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 3012,
            name: "15GX100U (6BLS)",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 3013,
            name: "15GX100U (6 VIT)",
            stockItems: [],
            childCategories: [],
          },
          {
            id: 3014,
            name: "15GX410U",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 400,
    name: "Nativo",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 401,
        name: "Gelatina",
        stockItems: [],
        childCategories: [
          {
            id: 4011,
            name: "250G",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
  {
    id: 500,
    name: "Solei",
    parent: null,
    stockItems: [],
    childCategories: [
      {
        id: 501,
        name: "Jabon liquido",
        stockItems: [],
        childCategories: [
          {
            id: 5011,
            name: "550ML",
            stockItems: [],
            childCategories: [],
          },
        ],
      },
    ],
  },
];

const toOptions = (
  category: Category,
  depth: number = 0,
  parentId: number | null = null
): Option[] => {
  const { id, name, childCategories = [] } = category;
  const children = childCategories.flatMap((child) =>
    toOptions(child, depth + 1, id)
  );
  const option = {
    id,
    name,
    depth,
    parentId,
    matchTerms: [name].concat(children.map((obj) => obj.name)),
  };
  return [option].concat(children);
};

const optionsListCategories: Option[] = dataCategorie.flatMap((category) =>
  toOptions(category)
);

const optionsListBrands: Option[] = dataBrand.flatMap((brand) =>
  toOptions(brand)
);

const robotoFont = Roboto({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

const Products: React.FC = () => {
  const productsContainerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [itemsPerPage] = useState(2);
  const [numOfPages, setNumOfPages] = useState(0);
  const {
    products,
    currentPage,
    updateCurrentPage,
    currentCategorieId,
    updateCurrentCategorieId,
    currentBrandId,
    updateCurrentBrandId,
    showDesktopGlobo02,
    updateShowDesktopGlobo02,
    categoriesEnable,
    updateCategoriesEnable,
    brandsEnable,
    updateBrandsEnable,
  } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(Array<IProduct>);
  const [productsView, setProductsView] = useState(Array<IProduct>);
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
  //var productsWork: any[] = [];
  //var productsFiltered;

  const miVariableMediaQuery1 = 0.38;
  const miVariableMediaQuery2 = 0.38;
  const miVariableMediaQuery3 = 0.36;
  const miVariableMediaQuery4 = 0.34;
  const miVariableMediaQuery5 = 0.32;
  const miVariableMediaQuery6 = 0.3;

  const handleCloseProductos = () => updateShowDesktopGlobo02(false);

  const handleOnChangeCategorie = (
    event: React.ChangeEvent<{}>,
    value: any
  ) => {
    if (value) {
      console.log("value.id " + value.id);
      console.log("typeof value.id " + typeof value.id);
      updateCurrentCategorieId(String(value.id));
      updateCurrentPage(1);
      updateCategoriesEnable(true);
      updateBrandsEnable(false);
    }
  };

  const handleOnChangeBrand = (event: React.ChangeEvent<{}>, value: any) => {
    if (value) {
      console.log("value.id " + value.id);
      console.log("typeof value.id " + typeof value.id);
      updateCurrentBrandId(String(value.id));
      updateCurrentPage(1);
      updateCategoriesEnable(false);
      updateBrandsEnable(true);
    }
  };

  useEffect(() => {
    if (productsContainerRef.current !== null) {
      setContainerWidth(productsContainerRef.current.offsetWidth);
      setContainerHeight(productsContainerRef.current.offsetHeight);
    }
  }, [productsContainerRef]);

  useEffect(() => {
    console.log("products ", products);
    var productsWork: any[] = [];
    let productsFiltered;
    if (categoriesEnable && currentCategorieId !== null) {
      productsFiltered = products.filter(
        (item) =>
          item.idCategorie.substring(0, currentCategorieId.length) ===
          currentCategorieId
      );
      /*
      productsFiltered = products.filter(
        (item) => item.idCategorie === currentCategorieId
      );*/
    } else if (brandsEnable && currentBrandId !== null) {
      productsFiltered = products.filter(
        (item) =>
          item.idBrand.substring(0, currentBrandId.length) === currentBrandId
      );
      /*
      productsFiltered = products.filter(
        (item) => item.idBrand === currentBrandId
      );*/
    } else {
      // Si no hay ninguna categoría o marca habilitada, no se aplica ningún filtro
      productsFiltered = products;
    }
    productsWork = productsFiltered;
    setNumOfPages(Math.ceil(productsWork.length / itemsPerPage));
    setProductsView(
      productsFiltered.slice(
        currentPage * itemsPerPage - itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [
    currentCategorieId,
    currentBrandId,
    currentPage,
    categoriesEnable,
    brandsEnable,
  ]);

  const handleChangePage = async (event: any, value: number) => {
    await updateCurrentPage(value);
    //await changeCurrentPage(value);
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
          borderRadius: 6,
          "@media (min-width : 1701px)": {
            marginLeft: "28%",
            width: 1000,
            height: 820,
          },
          "@media (min-width : 1501px) and (max-width : 1700px)": {
            marginLeft: "24%",
            width: 900,
            height: 810,
          },
          "@media (min-width : 1301px) and (max-width : 1500px)": {
            marginTop: "1%",
            marginLeft: "24%",
            width: 800,
            height: 760,
          },

          "@media (min-width : 1101px) and (max-width : 1300px)": {
            marginTop: "1%",
            marginLeft: "25%",
            width: 800,
            height: 760,
          },

          "@media (min-width : 901px) and (max-width : 1100px)": {
            marginTop: "1%",
            marginLeft: "25%",
            width: 700,
            height: 740,
          },

          "@media (min-width : 769px) and (max-width : 900px)": {
            marginLeft: "26%",
            width: 700,
            height: 740,
          },
          /*
          "@media (min-width : 768)": {
            marginLeft: "16%",
          },
          */
          //border: "solid blue 10px",
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
                src={"/images/x2.png"}
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
                options={optionsListCategories}
                onChange={handleOnChangeCategorie}
                getOptionLabel={(option) => option.name}
                style={{ width: 300, marginTop: "4%", marginRight: "14%" }}
                renderOption={(props, option, { selected, inputValue }) => {
                  const matches = match(option.name, inputValue);
                  console.log("matches ", matches);
                  const parts = parse(option.name, matches);
                  return (
                    <li {...props} key={option.id}>
                      <Checkbox
                        checked={selected}
                        sx={{ ml: 2 * option.depth }}
                      />
                      <div>
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{
                              fontWeight: part.highlight ? 700 : 400,
                            }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                }}
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
                        //fontFamily: "Pacifico",
                        fontWeight: 900,
                      },
                    }}
                  />
                )}
                filterOptions={createFilterOptions({
                  // join with some arbitrary separator to prevent matches across adjacent terms
                  stringify: (option) => option.matchTerms.join("//"),
                })}
              />
            </Box>
            <Box>
              <Autocomplete
                options={optionsListBrands}
                onChange={handleOnChangeBrand}
                getOptionLabel={(option) => option.name}
                style={{ width: 300, marginTop: "4%" }}
                renderOption={(props, option, { selected, inputValue }) => {
                  const matches = match(option.name, inputValue);
                  console.log("matches ", matches);
                  const parts = parse(option.name, matches);
                  return (
                    <li {...props} key={option.id}>
                      <Checkbox
                        checked={selected}
                        sx={{ ml: 2 * option.depth }}
                      />
                      <div>
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{
                              fontWeight: part.highlight ? 700 : 400,
                            }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                }}
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
          <Box
            ref={productsContainerRef}
            sx={{
              "@media (min-width : 1701px)": {
                marginTop: "4%",
                marginBottom: "2%",
                minHeight: "500px",
                //border: "10px solid red",
              },
              "@media (min-width : 1501px) and (max-width : 1700px)": {
                marginTop: "2%",
                marginBottom: "1%",
                minHeight: "450px",
                //border: "10px solid white",
              },
              "@media (min-width : 1301px) and (max-width : 1500px)": {
                marginTop: "2%",
                marginBottom: "1%",
                minHeight: "440px",
                //border: "10px solid red",
              },

              "@media (min-width : 1101px) and (max-width : 1300px)": {
                marginTop: "2%",
                minHeight: "330px",
                //border: "10px solid white",
              },

              "@media (min-width : 901px) and (max-width : 1100px)": {
                marginTop: "2%",
                marginBottom: "1%",
                minHeight: "400px",
                //border: "10px solid red",
              },

              "@media (min-width : 769px) and (max-width : 900px)": {
                marginTop: "2%",
                marginBottom: "1%",
                minHeight: "300px",
                //border: "10px solid white",
              },
            }}
          >
            {productsView.map((item, index) => (
              <Box
                key={index}
                sx={{
                  marginTop: "2%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  //border: "10px solid blue",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    "@media (min-width : 1501px) and (max-width : 1700px)": {
                      width: "20%",
                      height: "5%",
                      //border: "10px solid white",
                    },
                  }}
                >
                  <Image
                    alt="skupng"
                    width={
                      containerWidth *
                      (window.innerWidth > 1701
                        ? miVariableMediaQuery1
                        : window.innerWidth >= 1501 && window.innerWidth <= 1700
                        ? miVariableMediaQuery2
                        : window.innerWidth >= 1301 && window.innerWidth <= 1500
                        ? miVariableMediaQuery3
                        : window.innerWidth >= 1101 && window.innerWidth <= 1300
                        ? miVariableMediaQuery4
                        : window.innerWidth >= 901 && window.innerWidth <= 1100
                        ? miVariableMediaQuery5
                        : window.innerWidth >= 769 && window.innerWidth <= 900
                        ? miVariableMediaQuery6
                        : miVariableMediaQuery1)
                    } // Calcular el ancho relativo
                    height={
                      containerHeight *
                      (window.innerHeight > 1701
                        ? miVariableMediaQuery1
                        : window.innerHeight >= 1501 &&
                          window.innerHeight <= 1700
                        ? miVariableMediaQuery2
                        : window.innerHeight >= 1301 &&
                          window.innerHeight <= 1500
                        ? miVariableMediaQuery3
                        : window.innerHeight >= 1101 &&
                          window.innerHeight <= 1300
                        ? miVariableMediaQuery4
                        : window.innerHeight >= 901 &&
                          window.innerHeight <= 1100
                        ? miVariableMediaQuery5
                        : window.innerHeight >= 769 && window.innerHeight <= 900
                        ? miVariableMediaQuery6
                        : miVariableMediaQuery1)
                    } // Calcular la altura relativa
                    src={`/images/${item.sku}.png`}
                  />
                </Box>
                <Box
                  sx={{
                    //width: "300px",
                    textAlign: "center",
                    marginTop: "1%",
                    marginBottom: "1%",
                  }}
                >
                  <Typography variant="h5">
                    <label style={{ color: "white" }}>
                      {item.productDescription}
                    </label>
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "1%",
            }}
          >
            <Pagination
              sx={{ button: { color: "#ffffff" } }}
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
