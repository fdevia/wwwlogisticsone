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
  cardId: string;
  updateCardId: (cardId: string) => Promise<void>;
  showDesktopGlobo02: boolean;
  updateShowDesktopGlobo02: (show: boolean) => Promise<void>;
  currentCategorieId: string;
  updateCurrentCategorieId: (categorieId: string) => Promise<void>;
  products: Array<IProduct>;
  updateProducts: () => Promise<void>;
  currentPage: number;
  updateCurrentPage: (currentPage: number) => Promise<void>;
}

const ProductContextDefaultValues: IProductContext = {
  cardId: "19431215",
  updateCardId: async () => {},
  showDesktopGlobo02: false,
  updateShowDesktopGlobo02: async () => {},
  currentCategorieId: "0005",
  updateCurrentCategorieId: async () => {},
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
  const [cardId, setCardId] = useState<string>(
    ProductContextDefaultValues.cardId
  );
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

  const [currentPage, setCurrentPage] = useState<number>(
    ProductContextDefaultValues.currentPage
  );

  const updateCardId = async (cardId: string) => {
    console.log("updateCardId");
    setCardId(cardId);
  };

  const updateShowDesktopGlobo02 = async (show: boolean) => {
    console.log("ProductContext updateShowDesktopGlobo02");
    setShowDesktopGlobo02(show);
  };

  const updateCurrentCategorieId = async (categorieId: string) => {
    console.log("ProductContext updateShowDesktopGlobo02");
    setCurrentCategorieId(categorieId);
  };

  const updateProducts = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/fdevia/8cfc8ef8afffe66e077a0ff4a0fbef48/raw/09be245f65f845dff114f15c650f262a61a85afa/productsLogisticsOne.json"
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

  return (
    <ProductContext.Provider
      value={{
        cardId,
        updateCardId,
        showDesktopGlobo02,
        updateShowDesktopGlobo02,
        currentCategorieId,
        updateCurrentCategorieId,
        products,
        updateProducts,
        currentPage,
        updateCurrentPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};