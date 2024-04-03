import React, { ReactNode } from "react";
import { FC } from "react";
import { useSelector } from "react-redux";
import {
  getOutOfStockCount,
  getProductCategoryCount,
  getTotalStoreValue,
} from "../../utils/productUtils";
import {
  MdShoppingCart,
  MdRemoveShoppingCart,
  MdCategory,
  MdOutlineCurrencyExchange,
} from "react-icons/md";

type WidgetItem = {
  id: number;
  name: string;
  icon: ReactNode;
  value: number;
};

export const ProductWidget: FC = () => {
  const { products } = useSelector((state: any) => state.productSlice);

  const widgetData: WidgetItem[] = [
    {
      id: 1,
      name: "Total products",
      icon: <MdShoppingCart size={30} />,
      value: products.length,
    },
    {
      id: 2,
      name: "Total store value",
      icon: <MdOutlineCurrencyExchange size={30} />,
      value: getTotalStoreValue(products),
    },
    {
      id: 3,
      name: "Out of stock",
      icon: <MdRemoveShoppingCart size={30} />,
      value: getOutOfStockCount(products),
    },
    {
      id: 4,
      name: "No of Category",
      icon: <MdCategory size={30} />,
      value: getProductCategoryCount(products),
    },
  ];

  return (
    <div className="flex w-full gap-8 my-6">
      {widgetData.map((widgetItem) => {
        return (
          <div
            className="p-6 bg-[#ddff5527] rounded-lg flex-grow flex items-start gap-4"
            key={widgetItem.id}
          >
            <span>{widgetItem.icon}</span>

            <div className="flex flex-col gap-2">
              <p className="text-lg">{widgetItem.name}</p>
              <p className="text-6xl">{widgetItem.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
