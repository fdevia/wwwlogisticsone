"use client";
// contexts/CartContext.tsx
import React, { PropsWithChildren, createContext, useState } from "react";

interface childrenProps {
  children?: React.ReactNode; //JSX.Element any React.ReactNode
}

export interface IProduct {
  sku: string;
  idCategorie: string;
  idBrand: string;
  productDescription: string;
}

interface IProductContext {
  showDesktopGlobo02: boolean;
  updateShowDesktopGlobo02: (show: boolean) => Promise<void>;
  currentCategorieId: string;
  updateCurrentCategorieId: (categorieId: string) => Promise<void>;
  categoriesEnable: boolean;
  updateCategoriesEnable: (enable: boolean) => Promise<void>;
  currentBrandId: string;
  updateCurrentBrandId: (brandId: string) => Promise<void>;
  brandsEnable: boolean;
  updateBrandsEnable: (enable: boolean) => Promise<void>;
  products: Array<IProduct>;
  updateProducts: () => Promise<void>;
  currentPage: number;
  updateCurrentPage: (currentPage: number) => Promise<void>;
}

const ProductContextDefaultValues: IProductContext = {
  showDesktopGlobo02: false,
  updateShowDesktopGlobo02: async () => {},
  currentCategorieId: "0005",
  updateCurrentCategorieId: async () => {},
  categoriesEnable: true,
  updateCategoriesEnable: async () => {},
  currentBrandId: "0001",
  updateCurrentBrandId: async () => {},
  brandsEnable: false,
  updateBrandsEnable: async () => {},
  products: [],
  updateProducts: async () => {},
  currentPage: 1,
  updateCurrentPage: async () => {},
};

export const ProductContext = createContext<IProductContext>(
  ProductContextDefaultValues
);

export const ProductContextProvider: React.FC<
  PropsWithChildren<childrenProps>
> = ({ children }) => {
  const [showDesktopGlobo02, setShowDesktopGlobo02] = useState<boolean>(
    ProductContextDefaultValues.showDesktopGlobo02
  );

  const [products, setProducts] = useState<IProduct[]>(
    ProductContextDefaultValues.products
  );

  /*
  const [products, setProducts] = useState(
    ProductContextDefaultValues.products
  );
*/
  const [currentCategorieId, setCurrentCategorieId] = useState<string>(
    ProductContextDefaultValues.currentCategorieId
  );

  const [currentBrandId, setCurrentBrandId] = useState<string>(
    ProductContextDefaultValues.currentBrandId
  );

  const [currentPage, setCurrentPage] = useState<number>(
    ProductContextDefaultValues.currentPage
  );

  const [categoriesEnable, setCategoriesEnable] = useState<boolean>(
    ProductContextDefaultValues.categoriesEnable
  );

  const [brandsEnable, setBrandsEnable] = useState<boolean>(
    ProductContextDefaultValues.brandsEnable
  );

  const updateShowDesktopGlobo02 = async (show: boolean) => {
    console.log("ProductContext updateShowDesktopGlobo02");
    setShowDesktopGlobo02(show);
  };

  const updateCurrentCategorieId = async (categorieId: string) => {
    console.log("ProductContext updateShowDesktopGlobo02");
    setCurrentCategorieId(categorieId);
  };

  const updateCurrentBrandId = async (brandId: string) => {
    console.log("ProductContext updateShowDesktopGlobo02");
    setCurrentBrandId(brandId);
  };

  const updateProducts = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/fdevia/8cfc8ef8afffe66e077a0ff4a0fbef48/raw/bf5d8c4f5051e7c6924204db7a305630a425bc5b/productsLogisticsOne.json"
        //"https://gist.githubusercontent.com/fdevia/8cfc8ef8afffe66e077a0ff4a0fbef48/raw/9650a41cfa86f272462b5b3a06fd1210af8f07f5/productsLogisticsOne.json"
        //"https://gist.githubusercontent.com/fdevia/8cfc8ef8afffe66e077a0ff4a0fbef48/raw/09be245f65f845dff114f15c650f262a61a85afa/productsLogisticsOne.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json(); // Aquí convertimos el Response a JSON
      const dataArray = Object.keys(data).map((key) => data[key]);
      setProducts(dataArray);
      console.log(dataArray[0].sku);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateCurrentPage = async (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const updateCategoriesEnable = async (enable: boolean) => {
    setCategoriesEnable(enable);
  };

  const updateBrandsEnable = async (enable: boolean) => {
    setBrandsEnable(enable);
  };

  return (
    <ProductContext.Provider
      value={{
        showDesktopGlobo02,
        updateShowDesktopGlobo02,
        currentCategorieId,
        updateCurrentCategorieId,
        products,
        updateProducts,
        currentPage,
        updateCurrentPage,
        currentBrandId,
        updateCurrentBrandId,
        categoriesEnable,
        updateCategoriesEnable,
        brandsEnable,
        updateBrandsEnable,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
